import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, 
  Bookmark, 
  ExternalLink, 
  Star, 
  Code,
  BookOpen,
  Video,
  Wrench,
  Palette,
  Database,
  Globe,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
});

// Sample resource data - in a real app this would come from a database
const resources = [
  {
    id: 1,
    title: "React Documentation",
    description: "Official React documentation with comprehensive guides and API reference.",
    url: "https://react.dev",
    category: "Frontend",
    type: "Documentation",
    tags: ["React", "JavaScript", "Frontend"],
    stars: 1250,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "TypeScript Handbook",
    description: "Complete guide to TypeScript with examples and best practices.",
    url: "https://www.typescriptlang.org/docs/",
    category: "Language",
    type: "Documentation",
    tags: ["TypeScript", "JavaScript", "Types"],
    stars: 980,
    isBookmarked: true,
  },
  {
    id: 3,
    title: "Node.js Best Practices",
    description: "Comprehensive collection of Node.js best practices and patterns.",
    url: "https://github.com/goldbergyoni/nodebestpractices",
    category: "Backend",
    type: "Guide",
    tags: ["Node.js", "Backend", "Best Practices"],
    stars: 2100,
    isBookmarked: false,
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
    isBookmarked: true,
  },
  {
    id: 5,
    title: "Python Data Science Handbook",
    description: "Essential tools for working with data in Python.",
    url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
    category: "Data Science",
    type: "Book",
    tags: ["Python", "Data Science", "ML"],
    stars: 1500,
    isBookmarked: false,
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
    isBookmarked: true,
  },
];

const categories = ["All", "Frontend", "Backend", "Design", "Data Science", "Language"];
const types = ["All", "Documentation", "Guide", "Interactive", "Book", "Collection"];

function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [resourceList, setResourceList] = useState(resources);

  const filteredResources = resourceList.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    const matchesType = selectedType === "All" || resource.type === selectedType;
    const matchesBookmark = !showBookmarked || resource.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesType && matchesBookmark;
  });

  const toggleBookmark = (id: number) => {
    setResourceList(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource
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
  return (
    <>
      <Navigation />
      <div className="relative min-h-screen bg-gradient-to-br from-orange-200/80 via-yellow-100/90 to-pink-100/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-700 pt-20">{/* Added pt-20 for navigation space */}
      {/* Floating Background Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BookOpen className="absolute top-20 left-10 w-12 h-12 text-red-400/20 dark:text-red-300/10 animate-float" style={{ animationDelay: '0s' }} />
        <Code className="absolute top-32 right-20 w-8 h-8 text-orange-400/20 dark:text-orange-300/10 animate-float" style={{ animationDelay: '2s' }} />
        <Star className="absolute bottom-40 left-16 w-10 h-10 text-blue-400/20 dark:text-blue-300/10 animate-float" style={{ animationDelay: '4s' }} />
        <Bookmark className="absolute bottom-20 right-12 w-14 h-14 text-purple-400/20 dark:text-purple-300/10 animate-float" style={{ animationDelay: '1s' }} />
        <Wrench className="absolute top-1/2 left-8 w-6 h-6 text-green-400/20 dark:text-green-300/10 animate-float" style={{ animationDelay: '3s' }} />
        <Video className="absolute top-1/3 right-8 w-9 h-9 text-pink-400/20 dark:text-pink-300/10 animate-float" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
            Developer Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover and bookmark the best resources for your development journey
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
                placeholder="Search resources, technologies, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
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

              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mr-2">Type:</span>
                {types.map(type => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType === type ? "bg-gradient-to-r from-red-500 to-orange-500" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              {/* Bookmark Filter */}
              <Button
                variant={showBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setShowBookmarked(!showBookmarked)}
                className={showBookmarked ? "bg-gradient-to-r from-red-500 to-orange-500" : ""}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                Bookmarked
              </Button>
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
            Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="h-full p-6 backdrop-blur-lg bg-white/80 dark:bg-gray-900/90 border border-white/60 dark:border-gray-800/80 hover:shadow-xl transition-all duration-300 group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(resource.category)}
                    <Badge variant="secondary" className="text-xs">
                      {resource.category}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleBookmark(resource.id)}
                    className={`${
                      resource.isBookmarked 
                        ? "text-red-500 hover:text-red-600" 
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Bookmark 
                      className={`w-4 h-4 ${resource.isBookmarked ? "fill-current" : ""}`} 
                    />
                  </Button>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-red-500 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {resource.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {resource.stars}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No resources found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </motion.div>        )}
      </div>
    </div>
    </>
  );
}
