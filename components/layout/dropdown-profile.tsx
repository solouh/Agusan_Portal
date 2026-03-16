import { createClient } from "@/lib/supabase/server";


import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import Link from "next/link";
import { AuthButtonWrapper } from "../auth-button-wrapper";
import { LogoutButton } from "../logout-button";


export async function DropDownProfile() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto w-full justify-start p-0 bg-burntpeach py-2 px-2">
          <AuthButtonWrapper />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      
    </div>
  )

}