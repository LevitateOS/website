import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "@phosphor-icons/react";
import { useTernaryDarkMode } from "usehooks-ts";

export function ThemeToggle() {
  const { isDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <Button variant="ghost" size="icon" onClick={toggleTernaryDarkMode}>
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
