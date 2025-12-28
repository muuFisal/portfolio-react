import React from "react";
import { AppContext } from "../../app/providers";
import Button from "./Button";

export default function ThemeToggle() {
  const ctx = React.useContext(AppContext);
  if (!ctx) return null;

  return (
    <Button variant="secondary" onClick={ctx.toggleTheme} aria-label="Toggle theme">
      {ctx.theme === "dark" ? "☀️" : "🌙"}
      <span className="hidden sm:inline">{ctx.theme === "dark" ? "Light" : "Dark"}</span>
    </Button>
  );
}
