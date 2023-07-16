import { createContext, useState, useContext } from "react";

export const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <NavigationContext.Provider
      value={{ open, setOpen, handleOpen, handleClose }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => {
  return useContext(NavigationContext);
};
