import { Icons } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ProfileDropdown } from "@/components/user/profile-dropdown";

export function AppHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 p-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sm:px-6 lg:px-8">
      <div className="flex w-full items-center gap-1 lg:gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h4 className="font-medium text-base">Home</h4>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Icons.bell aria-hidden="true" />
        </Button>
        <ProfileDropdown />
      </div>
    </header>
  );
}
