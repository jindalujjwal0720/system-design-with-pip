import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFetchResource from "@/hooks/useFetchResource";
import { Config } from "@/types/config";
import { Link, useLocation } from "react-router-dom";

interface NextPreviousButtonsProps {
  className?: string;
}

const NextPreviousButtons = ({ className }: NextPreviousButtonsProps) => {
  const { data } = useFetchResource<Config>("resources/config.json", "json");
  const location = useLocation();
  const navitems = data?.navigation?.map((navItem) => navItem.children).flat();

  if (!navitems) return null;

  const currentIndex = navitems?.findIndex((navItem) =>
    navItem?.path ? location.pathname.includes(navItem.path) : false
  );

  if (currentIndex === -1) return null;

  const previous = navitems?.[currentIndex - 1];
  const next = navitems?.[currentIndex + 1];

  return (
    <div className={cn("flex gap-4 flex-col md:flex-row", className)}>
      {previous && (
        <Link
          to={previous.path || "#"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex-1 justify-between h-auto group py-4"
          )}
        >
          <ChevronLeft
            size={16}
            className="text-muted-foreground group-hover:text-primary"
          />
          <div className="flex flex-col items-end">
            <span className="text-xs font-normal">Previous</span>
            <span className="group-hover:text-primary">{previous.title}</span>
          </div>
        </Link>
      )}
      {next && (
        <Link
          to={next.path || "#"}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex-1 justify-between h-auto group py-4"
          )}
        >
          <div className="flex flex-col items-start">
            <span className="text-xs font-normal">Next</span>
            <span className="group-hover:text-primary">{next.title}</span>
          </div>
          <ChevronRight
            size={16}
            className="text-muted-foreground group-hover:text-primary"
          />
        </Link>
      )}
    </div>
  );
};

export default NextPreviousButtons;
