import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/api/auth";
import { useUserProfileStore } from "@/stores/userProfileStore";

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

export default function UserDropDown() {
  const { logout } = useAuth();
  const { profile } = useUserProfileStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ChevronUpDownIcon className="text-gray-400 hover:text-gray-500 size-6 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70" align="end" alignOffset={5}>
        <DropdownMenuLabel className="text-l">
          {profile?.email ? profile.email : profile?.username}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="w-full cursor-pointer text-muted-foreground"
          onClick={logout}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
