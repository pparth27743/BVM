"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed top-5 right-5 z-50 w-10 h-10" />;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed top-5 right-5 z-50 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 cursor-pointer group"
      style={{
        backgroundColor: "var(--surface-2)",
        border: "1px solid var(--border-mid)",
        color: "var(--text-secondary)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className="transition-colors duration-200 group-hover:text-[var(--brand-gold)]"
        style={{ color: "inherit" }}
      >
        {isDark ? (
          <Sun size={16} strokeWidth={1.75} />
        ) : (
          <Moon size={16} strokeWidth={1.75} />
        )}
      </span>
    </button>
  );
}
