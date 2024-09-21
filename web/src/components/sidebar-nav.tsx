import useFetchResource from "@/hooks/useFetchResource";
import { cn } from "@/lib/utils";
import { useSidebarNav } from "@/providers/sidebar-nav";
import { Config } from "@/types/config";
import { Link, useLocation } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

interface SidebarNavProps {
  className?: string;
}

const SidebarNav = ({ className }: SidebarNavProps) => {
  const { data } = useFetchResource<Config>("resources/config.json", "json");
  const location = useLocation();
  const { isOpen, toggle } = useSidebarNav();

  return (
    <div
      className={cn(
        "h-full md:h-[calc(100dvh-56px)] md:w-1/4 md:min-w-72 md:max-w-80 absolute md:relative inset-0 transition-all",
        className,
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <ScrollArea className="h-full w-full">
        <div className="flex flex-col p-4 md:px-4 h-full transition-all overflow-hidden w-full">
          <nav className="flex flex-col space-y-4 text-sm">
            {data?.navigation?.map((navItem, index) => {
              return (
                <div key={`${navItem.title}-${index}`}>
                  <p className="font-semibold uppercase text-xs tracking-normal px-4 py-2">
                    {navItem.title}
                  </p>
                  {navItem.children
                    ?.map((child) => {
                      if (!child.path) return null;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={cn(
                            "flex items-center hover:bg-muted px-4 py-1.5 rounded-md",
                            location.pathname.includes(child.path)
                              ? "text-primary font-semibold"
                              : "text-muted-foreground"
                          )}
                          onClick={() => {
                            if (!isOpen) return;
                            toggle();
                          }}
                        >
                          <p>{child.title}</p>
                        </Link>
                      );
                    })
                    .filter(Boolean)}
                </div>
              );
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
};

export default SidebarNav;
