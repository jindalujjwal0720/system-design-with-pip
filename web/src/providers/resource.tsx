import useFetchResource from "@/hooks/useFetchResource";
import { createContext, PropsWithChildren, useContext } from "react";
import { useLocation } from "react-router-dom";

interface ResourceProviderValue {
  data: unknown;
  isLoading: boolean;
}

const ResourceContext = createContext<ResourceProviderValue | undefined>(
  undefined
);

const ResourceProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const pathname = location.pathname === "/" ? "/README.md" : location.pathname;
  const { data, isLoading } = useFetchResource(pathname, "text");

  const value = {
    data,
    isLoading,
  };

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => {
  const context = useContext(ResourceContext);

  if (context === undefined) {
    throw new Error("useResource must be used within a ResourceProvider");
  }

  return context;
};

export default ResourceProvider;
