import { createContext, PropsWithChildren, useContext, useState } from "react";

interface SidebarNavValue {
  isOpen: boolean;
  toggle: () => void;
}

const SidebarNavContext = createContext<SidebarNavValue | undefined>(undefined);

const SidebarNavProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <SidebarNavContext.Provider value={{ isOpen, toggle }}>
      {children}
    </SidebarNavContext.Provider>
  );
};

export const useSidebarNav = () => {
  const context = useContext(SidebarNavContext);

  if (context === undefined) {
    throw new Error("useSidebarNav must be used within a SidebarNavProvider");
  }

  return context;
};

export default SidebarNavProvider;
