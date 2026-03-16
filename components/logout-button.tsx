"use client";

import { DropdownMenuItem } from "./ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant={"ghost"} onClick={logout} className="text-red-600 p-0 pl-2 w-full justify-start focus:text-red-600 cursor-pointer">
      Log out
    </Button>
  );
}