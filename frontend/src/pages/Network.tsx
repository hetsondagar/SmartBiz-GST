import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, MessageCircle, Star, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const connections = [
  {
    id: "1",
    name: "Rajesh Wholesale Distributors",
    owner: "Rajesh Kumar",
    type: "Supplier",
    category: "Grocery & FMCG",
    rating: 4.8,
    distance: "1.2 km",
    location: "Koramangala, Bangalore",
    verified: true,
    products: 450,
  },
  {
    id: "2",
    name: "Anita Fresh Produce",
    owner: "Anita Sharma",
    type: "Retailer",
    category: "Fruits & Vegetables",
    rating: 4.6,
    distance: "2.5 km",
    location: "Vashi Market, Mumbai",
    verified: true,
    products: 280,
  },
  {
    id: "3",
    name: "Patel General Stores",
    owner: "Mukesh Patel",
    type: "Wholesaler",
    category: "General Merchandise",
    rating: 4.9,
    distance: "3.8 km",
    location: "Chandni Chowk, Delhi",
    verified: true,
    products: 120,
  },
];

const Network = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConnect = (connectionId: string) => {
    toast({
      title: "Connection Request Sent!",
      description: "The business will review your request soon.",
    });
  };

  const handleViewSupplier = () => {
    navigate("/suppliers");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Connector Network</h1>
          <p className="text-muted-foreground">
            Connect with suppliers, wholesalers, and retailers nearby
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search network"
            />
          </div>
          <UiButton
            variant="outline"
            size="medium"
            icon={<Filter className="h-4 w-4" />}
            aria-label="Filter results"
          >
            Filters
          </UiButton>
        </div>

        {/* Connection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {connections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="hover-lift"
            >
              <Card className="glass rounded-2xl border-border/50 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{connection.name}</h3>
                        {connection.verified && (
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Badge className="bg-success/20 text-success border-success/30 rounded-full">
                              ✓ Verified
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Owner: {connection.owner}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{connection.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Badge variant="outline" className="rounded-full">{connection.type}</Badge>
                        <span>•</span>
                        <span>{connection.category}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <motion.div 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-medium">{connection.rating}</span>
                        </motion.div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{connection.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div 
                    className="mb-4 p-3 bg-muted/30 rounded-xl border border-border/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <p className="text-sm text-muted-foreground">
                      {connection.products} products available
                    </p>
                  </motion.div>

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <UiButton
                        variant="primary"
                        size="medium"
                        className="w-full gradient-primary hover:shadow-glow-primary transition-all"
                        icon={<MessageCircle className="h-4 w-4" />}
                        onClick={() => handleConnect(connection.id)}
                      >
                        Connect
                      </UiButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton
                        variant="outline"
                        size="medium"
                        onClick={() => navigate("/suppliers")}
                      >
                        View Suppliers
                      </UiButton>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Network;
