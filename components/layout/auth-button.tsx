
import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fallback chain: display_name -> full_name -> email
  const firstName = user?.user_metadata?.first_name
  const lastName = user?.user_metadata?.last_name

  const displayName = firstName && lastName
    ? `${firstName} ${lastName}`  // "Michael Aranding"
    : firstName
      ? firstName                    // "Michael"
      : user?.email

  return user ? (
    <div className="flex w-full flex-row items-center gap-4 ">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-xs justify-start md:text-sm">
        Hey, {displayName}!
        <p className=" text-black/50 pending_approval">{user.email}</p>
      </div>
      
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      
    </div>
  )
}