import { Link } from "@tanstack/react-router";
import { Home, Bookmark, BookOpen, User } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import BrandLogo from "./BrandLogo";
import { motion } from "motion/react";

export function Navigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <BrandLogo size={32} />
            <span className="font-bold text-xl bg-gradient-to-r from-red-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              Tamatar
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/resources">
                <BookOpen className="w-4 h-4 mr-2" />
                Resources
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/bookmarks">
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarks
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button 
              className="hidden sm:flex bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-600 hover:to-red-500" 
              size="sm" 
              asChild
            >
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-center gap-1 mt-3 pb-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/resources">
              <BookOpen className="w-4 h-4 mr-1" />
              Resources
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/bookmarks">
              <Bookmark className="w-4 h-4 mr-1" />
              Bookmarks
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/dashboard">
              <User className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
