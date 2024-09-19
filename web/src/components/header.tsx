import { cn } from "@/lib/utils";
import { useSidebarNav } from "@/providers/sidebar-nav";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import SearchBox from "./search-box";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const { toggle: toggleSidebar } = useSidebarNav();

  return (
    <div
      className={cn(
        className,
        "flex justify-between items-center py-2 px-4 md:px-8"
      )}
    >
      <div className="flex items-center gap-4">
        <Button onClick={toggleSidebar} variant="ghost" className="p-0">
          <Menu size={20} />
        </Button>
      </div>
      <div>
        <SearchBox />
      </div>
    </div>
  );
};

export default Header;
