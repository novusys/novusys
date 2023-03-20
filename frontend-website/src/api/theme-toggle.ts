import { useState } from "react";


export const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState("light");
  const inactiveTheme = activeTheme === "light" ? "dark" : "light";

  
  
  return {
    activeTheme,
    inactiveTheme,
    setActiveTheme,
  }
}

// export default Theme