"use client";
import { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleClose: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const contextValue: SidebarContextType = {
    isOpen,
    setIsOpen,
    handleClose,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
