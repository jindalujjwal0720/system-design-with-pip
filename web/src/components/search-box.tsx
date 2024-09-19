import { Search } from "lucide-react";
import { useEffect } from "react";
import { useSearchBox } from "@/providers/search-box";

const SearchBox = () => {
  const { toggle: toggleSearchBox } = useSearchBox();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSearchBox();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenSearchBox = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSearchBox();
  };

  return (
    <div>
      <div className="hidden md:block relative" onClick={handleOpenSearchBox}>
        <Search
          size={16}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
        />
        <div className="h-8 w-64 bg-muted pl-9 flex items-center rounded-md text-sm text-muted-foreground">
          Search
        </div>
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground/50 font-medium text-xs">
          Ctrl + K
        </span>
      </div>
      <Search size={20} className="md:hidden" onClick={handleOpenSearchBox} />
    </div>
  );
};

export default SearchBox;
