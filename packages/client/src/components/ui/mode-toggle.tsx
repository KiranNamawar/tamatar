import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme()

    // Show the icon for the theme that will be activated next
    const getNextTheme = () => {
        if (theme === "light") return "dark"
        if (theme === "dark") return "system"
        return "light"
    }

    const getNextIcon = () => {
        const next = getNextTheme()
        if (next === "light") {
            return <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        }
        if (next === "dark") {
            return <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        }
        return <Monitor className="h-[1.2rem] w-[1.2rem] transition-all" />
    }

    return (
        <Button size="icon" className={className} onClick={() => setTheme(getNextTheme())}>
            {getNextIcon()}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
