import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useFetchResource from "@/hooks/useFetchResource";
import { Config } from "@/types/config";
import { useLocation } from "react-router-dom";

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

  return (
    <div className={cn("flex gap-4 flex-col md:flex-row", className)}>
      {currentIndex > 0 && navitems?.[currentIndex - 1]?.title && (
        <Button
          variant="outline"
          className="flex-1 justify-between h-auto group py-4"
        >
          <ChevronLeft
            size={16}
            className="text-muted-foreground group-hover:text-primary"
          />
          <div className="flex flex-col items-end">
            <span className="text-xs font-normal">Previous</span>
            <span className="group-hover:text-primary">
              {navitems?.[currentIndex - 1]?.title}
            </span>
          </div>
        </Button>
      )}
      {currentIndex < navitems.length - 1 &&
        navitems?.[currentIndex + 1]?.title && (
          <Button
            variant="outline"
            className="flex-1 justify-between h-auto group py-4"
          >
            <div className="flex flex-col items-start">
              <span className="text-xs font-normal">Next</span>
              <span className="group-hover:text-primary">
                {navitems?.[currentIndex + 1]?.title}
              </span>
            </div>
            <ChevronRight
              size={16}
              className="text-muted-foreground group-hover:text-primary"
            />
          </Button>
        )}
    </div>
  );
};

export default NextPreviousButtons;
