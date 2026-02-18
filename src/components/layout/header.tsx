"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BookmarkPlusIcon, Loader2, LogOutIcon } from "lucide-react";
import { User } from "@supabase/supabase-js";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useBookmarkDialog } from "@/context/bookmarkDialogContext";


interface HeaderProps {
  user: User;
}

const Header = ({ user }: HeaderProps) => {
  const [isLoggingout, setIsLoggingOut] = useState(false);
const { openCreate } = useBookmarkDialog()
  console.log("User::", user);
  const avatarUrl =
    user?.user_metadata?.avatar_url || "https://github.com/shadcn.png";
  const fullName = user?.user_metadata?.full_name;
  const userEmail = user?.email;

  async function handleLogout() {
    setIsLoggingOut(true)
    const supabase =  createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      toast.error(error.message)
    } else {
      toast.success("Logged out successfully")
      redirect("/");
    }

    setIsLoggingOut(false)
  }

 

  return (
   <> <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0   shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Smart Bookmark</h1>

        <div className="flex items-center gap-x-4">
          <Button
            className="cursor-pointer border border-gray-300"
            variant="outline"
            onClick={openCreate}
          >
            <BookmarkPlusIcon className="h-4 w-4" />
            <span className="hidden lg:block"> Create Bookmark</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full cursor-pointer"
              >
                <Avatar>
                  <AvatarImage src={avatarUrl} alt="shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full max-w-64" align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  {fullName && fullName.split(" ")[0]}
                </DropdownMenuItem>
                <DropdownMenuItem className="truncate">
                  {userEmail}
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
               <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={handleLogout} disabled={isLoggingout}>
              {
                isLoggingout ? (
                  <>
                         <Loader2 className="animate-spin"/>
                         Logging you out...
                  </>
                ) :(
                  <>
                   <LogOutIcon />
          Log out
                  </>
                )
              }
        </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
   </>
  );
};

export default Header;
