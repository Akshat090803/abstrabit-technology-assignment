import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BookmarkPlusIcon } from "lucide-react";
const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50  shadow-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Smart Bookmark</h1>

          <div className="flex items-center gap-x-4">
            <Button className="cursor-pointer border border-gray-300" variant="outline">
              <BookmarkPlusIcon className="h-4 w-4"/>
              <span className="hidden lg:block"> Create Bookmark</span>
            </Button>
             <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32" align="end">
          <DropdownMenuItem variant="destructive" className="cursor-pointer">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
          </div>
      </div>
    </header>
  );
};

export default Header;
