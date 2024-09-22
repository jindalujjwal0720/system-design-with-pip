import { createContext, PropsWithChildren, useContext, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import useFetchResource from "@/hooks/useFetchResource";
import { Config } from "@/types/config";
import { useNavigate } from "react-router-dom";

interface SearchBoxValue {
  isOpen: boolean;
  toggle: () => void;
}

const SearchBoxContext = createContext<SearchBoxValue | undefined>(undefined);

const SearchBoxProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useFetchResource<Config>("resources/config.json", "json");
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SearchBoxContext.Provider value={{ isOpen, toggle }}>
      <CommandDialog open={isOpen} onOpenChange={toggle}>
        <CommandInput placeholder="Type anything to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data?.navigation?.map((navItem, index) => {
            return (
              <>
                <CommandSeparator className="mb-2" />
                <CommandGroup
                  key={`${navItem.title}-${index}`}
                  heading={navItem.title}
                >
                  {navItem.children
                    ?.map((child) => {
                      if (!child.path) return null;
                      return (
                        <CommandItem
                          key={child.path}
                          onSelect={() => {
                            if (!isOpen) return;
                            toggle();
                            if (child.path) navigate(child.path);
                          }}
                        >
                          <span>{child.title}</span>
                        </CommandItem>
                      );
                    })
                    .filter(Boolean)}
                </CommandGroup>
              </>
            );
          })}
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
