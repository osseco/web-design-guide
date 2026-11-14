import { Moon, Sun } from "lucide-react";
import { setTheme, useTheme } from "../lib/theme";
import { Button } from "./ui/button";

/** Switches between light and dark. Lives at the right end of the header. */
export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
