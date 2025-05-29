import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { 
  Bookmark, 
  ExternalLink, 
  Star, 
  Trash2,
  Heart,
  Code,
  BookOpen,
  Palette,
  Database,
  Brain,
  Globe,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";

export const Route = createFileRoute("/bookmarks")({
  component: BookmarksPage,
});

// Sample bookmarked resources - in a real app this would come from user's saved items
const bookmarkedResources = [
  {
    id: 2,
    title: "TypeScript Handbook",
    description: "Complete guide to TypeScript with examples and best practices.",
    url: "https://www.typescriptlang.org/docs/",
    category: "Language",
    type: "Documentation",
    tags: ["TypeScript", "JavaScript", "Types"],
    stars: 980,
    dateBookmarked: "2024-05-15",
    notes: "Great resource for learning TypeScript fundamentals",
  },
  {
    id: 4,
    title: "CSS Grid Garden",
    description: "Interactive game to learn CSS Grid layout in a fun way.",
    url: "https://cssgridgarden.com/",
    category: "Frontend",
    type: "Interactive",
    tags: ["CSS", "Grid", "Learning"],
    stars: 750,
    dateBookmarked: "2024-05-10",
    notes: "Fun way to practice CSS Grid",
  },
  {
    id: 6,
    title: "Design Systems Database",
    description: "Collection of design systems from top companies worldwide.",
    url: "https://designsystems.surf/",
    category: "Design",
    type: "Collection",
    tags: ["Design", "UI", "Systems"],
    stars: 890,
    dateBookmarked: "2024-05-08",
    notes: "Excellent reference for design system patterns",
  },
];

const categories = ["All", "Frontend", "Backend", "Design", "Data Science", "Language"];

function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bookmarks, setBookmarks] = useState(bookmarkedResources);
  const [editingNotes, setEditingNotes] = useState<number | null>(null);
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (bookmark.notes?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || bookmark.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const removeBookmark = (id: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };

  const updateNotes = (id: number, notes: string) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.id === id 
          ? { ...bookmark, notes }
          : bookmark
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend": return <Code className="w-4 h-4" />;
      case "Backend": return <Database className="w-4 h-4" />;
      case "Design": return <Palette className="w-4 h-4" />;
      case "Data Science": return <Brain className="w-4 h-4" />;
      case "Language": return <BookOpen className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-gradient-to-br from-orange-200/80 via-yellow-100/90 to-pink-100/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-700 pt-20">{/* Added pt-20 for navigation space */}
      {/* Floating Background Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Bookmark className="absolute top-20 left-10 w-12 h-12 text-red-400/20 dark:text-red-300/10 animate-float" style={{ animationDelay: '0s' }} />
        <Heart className="absolute top-32 right-20 w-8 h-8 text-orange-400/20 dark:text-orange-300/10 animate-float" style={{ animationDelay: '2s' }} />
        <Star className="absolute bottom-40 left-16 w-10 h-10 text-blue-400/20 dark:text-blue-300/10 animate-float" style={{ animationDelay: '4s' }} />
        <BookOpen className="absolute bottom-20 right-12 w-14 h-14 text-purple-400/20 dark:text-purple-300/10 animate-float" style={{ animationDelay: '1s' }} />
        <Code className="absolute top-1/2 left-8 w-6 h-6 text-green-400/20 dark:text-green-300/10 animate-float" style={{ animationDelay: '3s' }} />
        <Palette className="absolute top-1/3 right-8 w-9 h-9 text-pink-400/20 dark:text-pink-300/10 animate-float" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bookmark className="w-12 h-12 text-red-500 fill-current" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
              My Bookmarks
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your curated collection of development resources and learning materials
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search your bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="w-4 h-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">Category:</span>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-to-r from-red-500 to-orange-500" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600 dark:text-gray-300">
            {filteredBookmarks.length} bookmark{filteredBookmarks.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {/* Bookmarks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {filteredBookmarks.map((bookmark, index) => (
            <motion.div
              key={bookmark.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80 hover:shadow-xl transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Main Content */}
                  <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getCategoryIcon(bookmark.category)}
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-red-500 transition-colors">
                            {bookmark.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {bookmark.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {bookmark.type}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Saved on {formatDate(bookmark.dateBookmarked)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBookmark(bookmark.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {bookmark.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {bookmark.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {bookmark.stars} stars
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="lg:w-80">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                        Personal Notes
                      </h4>
                      {editingNotes === bookmark.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={bookmark.notes || ""}
                            onChange={(e) => updateNotes(bookmark.id, e.target.value)}
                            className="w-full h-20 px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="Add your notes..."
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => setEditingNotes(null)}
                              className="bg-gradient-to-r from-red-500 to-orange-500"
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingNotes(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {bookmark.notes || "No notes yet"}
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingNotes(bookmark.id)}
                          >
                            Edit Notes
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredBookmarks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              {searchQuery || selectedCategory !== "All" ? "No bookmarks found" : "No bookmarks yet"}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchQuery || selectedCategory !== "All" 
                ? "Try adjusting your search or filters."
                : "Start exploring resources and bookmark your favorites!"
              }
            </p>
            {(!searchQuery && selectedCategory === "All") && (
              <Button asChild className="bg-gradient-to-r from-red-500 to-orange-500">
                <a href="/resources">Browse Resources</a>
              </Button>
            )}        </motion.div>
        )}
      </div>
    </div>
    </>
  );
}
