import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface SearchBoxValue {
  isOpen: boolean;
  toggle: () => void;
}

const SearchBoxContext = createContext<SearchBoxValue | undefined>(undefined);

const SearchBoxProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SearchBoxContext.Provider value={{ isOpen, toggle }}>
      <CommandDialog open={isOpen} onOpenChange={toggle}>
        <CommandInput placeholder="Type anything to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Recent search"></CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings"></CommandGroup>
        </CommandList>
      </CommandDialog>
      {children}
    </SearchBoxContext.Provider>
  );
};

export const useSearchBox = () => {
  const context = useContext(SearchBoxContext);

  if (context === undefined) {
    throw new Error("useSearchBox must be used within a SearchBoxProvider");
  }

  return context;
};

export default SearchBoxProvider;
