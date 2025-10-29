import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UiButton } from "@/components/ui/ui-button";
import { 
  Clock, 
  MapPin, 
  Star, 
  Eye, 
  Heart,
  Calendar,
  Package,
  Megaphone,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motionVariants } from "@/lib/animations";

interface QuickAddItem {
  id: string;
  title: string;
  description: string;
  category: string;
  productType: "promotion" | "request";
  priceRange?: string;
  images: string[];
  designPreference: string;
  createdAt: string;
  expiresAt: string;
  userId: string;
  userName: string;
  userLocation: string;
  views: number;
  likes: number;
  isLiked?: boolean;
  status: "active" | "expired" | "pending";
}

interface QuickAddZoneProps {
  title?: string;
  showAll?: boolean;
  limit?: number;
  className?: string;
}

const QuickAddZone = ({ 
  title = "Quick Add Zone", 
  showAll = false, 
  limit = 6,
  className = ""
}: QuickAddZoneProps) => {
  const [quickAdds, setQuickAdds] = useState<QuickAddItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "promotion" | "request">("all");

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockData: QuickAddItem[] = [
      {
        id: "1",
        title: "Mango Juice - Summer Special",
        description: "Fresh mango juice with no preservatives. Perfect for hot summer days!",
        category: "Food & Beverages",
        productType: "promotion",
        priceRange: "₹30-50",
        images: ["/placeholder.svg"],
        designPreference: "Modern",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        userId: "user1",
        userName: "Rajesh Kumar",
        userLocation: "Bangalore",
        views: 45,
        likes: 12,
        isLiked: false,
        status: "active"
      },
      {
        id: "2",
        title: "Coconut Water Request",
        description: "Looking for fresh coconut water suppliers in my area. Need daily delivery.",
        category: "Food & Beverages",
        productType: "request",
        priceRange: "₹20-30 per piece",
        images: ["/placeholder.svg"],
        designPreference: "Minimal",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        userId: "user2",
        userName: "Anita Sharma",
        userLocation: "Mumbai",
        views: 28,
        likes: 8,
        isLiked: true,
        status: "active"
      },
      {
        id: "3",
        title: "Diwali Sweets Promotion",
        description: "Special Diwali sweets collection with 20% discount. Order now!",
        category: "Food & Beverages",
        productType: "promotion",
        priceRange: "₹200-500",
        images: ["/placeholder.svg"],
        designPreference: "Poster",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        userId: "user3",
        userName: "Mukesh Patel",
        userLocation: "Delhi",
        views: 67,
        likes: 23,
        isLiked: false,
        status: "active"
      },
      {
        id: "4",
        title: "Organic Vegetables Request",
        description: "Need organic vegetable suppliers for my store. Quality is priority.",
        category: "Groceries",
        productType: "request",
        priceRange: "₹50-150 per kg",
        images: ["/placeholder.svg"],
        designPreference: "Modern",
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        userId: "user4",
        userName: "Priya Singh",
        userLocation: "Pune",
        views: 34,
        likes: 15,
        isLiked: false,
        status: "active"
      }
    ];

    setTimeout(() => {
      setQuickAdds(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredQuickAdds = quickAdds.filter(item => 
    filter === "all" || item.productType === filter
  ).slice(0, showAll ? undefined : limit);

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return "Expires soon";
  };

  const handleLike = (id: string) => {
    setQuickAdds(prev => prev.map(item => 
      item.id === id 
        ? { 
            ...item, 
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1
          }
        : item
    ));
  };

  const handleView = (id: string) => {
    setQuickAdds(prev => prev.map(item => 
      item.id === id 
        ? { ...item, views: item.views + 1 }
        : item
    ));
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="glass rounded-2xl border-border/50 animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        
        {!showAll && (
          <UiButton variant="outline" size="small">
            View All
            <ArrowRight className="h-4 w-4 ml-2" />
          </UiButton>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 p-1 bg-muted/30 rounded-lg w-fit">
        {[
          { key: "all", label: "All", icon: Package },
          { key: "promotion", label: "Promotions", icon: Megaphone },
          { key: "request", label: "Requests", icon: Package }
        ].map(({ key, label, icon: Icon }) => (
          <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <UiButton
              variant={filter === key ? "primary" : "ghost"}
              size="small"
              onClick={() => setFilter(key as any)}
              className={filter === key ? "shadow-glow-primary" : ""}
              icon={<Icon className="h-4 w-4" />}
            >
              {label}
            </UiButton>
          </motion.div>
        ))}
      </div>

      {/* Quick Add Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredQuickAdds.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="hover-lift"
            >
              <Card className="glass rounded-2xl border-border/50 overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Image */}
                <div className="relative h-48 bg-muted/30 overflow-hidden">
                  <img
                    src={item.images[0] || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge 
                      variant={item.productType === "promotion" ? "default" : "secondary"}
                      className="backdrop-blur-sm"
                    >
                      {item.productType === "promotion" ? (
                        <Megaphone className="h-3 w-3 mr-1" />
                      ) : (
                        <Package className="h-3 w-3 mr-1" />
                      )}
                      {item.productType === "promotion" ? "Promotion" : "Request"}
                    </Badge>
                    <Badge variant="outline" className="backdrop-blur-sm">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge 
                      variant={getTimeRemaining(item.expiresAt).includes("Expired") ? "destructive" : "secondary"}
                      className="backdrop-blur-sm"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {getTimeRemaining(item.expiresAt)}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 relative z-10">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {item.priceRange && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Price:</span>
                        <span className="text-primary">{item.priceRange}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{item.userLocation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{item.views}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleLike(item.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            item.isLiked 
                              ? "text-red-500 bg-red-50" 
                              : "text-muted-foreground hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${item.isLiked ? "fill-current" : ""}`} />
                        </motion.button>
                        <span className="text-sm text-muted-foreground">{item.likes}</span>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <UiButton
                          variant="outline"
                          size="small"
                          onClick={() => handleView(item.id)}
                        >
                          View Details
                        </UiButton>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredQuickAdds.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Quick Adds Found</h3>
          <p className="text-muted-foreground">
            {filter === "all" 
              ? "No active quick adds at the moment. Check back later!"
              : `No ${filter}s found. Try a different filter.`
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default QuickAddZone;
