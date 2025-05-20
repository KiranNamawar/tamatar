import { Moon, Sun, Monitor } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  // Cycle through: system -> light -> dark -> system ...
  const handleToggle = () => {
    if (theme === "system") setTheme("light")
    else if (theme === "light") setTheme("dark")
    else setTheme("system")
  }

  let Icon
  if (theme === "system") Icon = Monitor
  else if (theme === "light") Icon = Moon
  else Icon = Sun

  return (
    <Button
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <Icon className="h-[1.2rem] w-[1.2rem] transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
