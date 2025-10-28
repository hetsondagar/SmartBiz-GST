import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

const trendingProducts = [
  {
    name: "Organic Rice",
    trend: 45.2,
    confidence: 92,
    category: "Grocery",
    demand: "High",
  },
  {
    name: "Cold-Pressed Oil",
    trend: 38.7,
    confidence: 88,
    category: "Grocery",
    demand: "Growing",
  },
  {
    name: "Millets",
    trend: 52.1,
    confidence: 95,
    category: "Grocery",
    demand: "Very High",
  },
];

const priceChanges = [
  {
    product: "Sugar (1kg)",
    oldPrice: 45,
    newPrice: 50,
    change: 11.1,
    area: "Within 2km",
  },
  {
    product: "Wheat Flour",
    oldPrice: 35,
    newPrice: 32,
    change: -8.6,
    area: "Within 5km",
  },
];

const categories = ["All", "Electronics", "Groceries", "Fashion"];

const Insights = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToStore = (productName: string) => {
    toast({
      title: "Product Added",
      description: `Added ${productName} to your store`,
    });
  };

  const handleFindSuppliers = () => {
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
          <h1 className="text-3xl font-bold mb-2">Market Insights</h1>
          <p className="text-muted-foreground">
            AI-powered insights about your local market
          </p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 flex gap-2 p-1 bg-muted/30 rounded-lg w-fit"
        >
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UiButton
                variant={selectedCategory === category ? "primary" : "ghost"}
                size="small"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "shadow-glow-primary" : ""}
              >
                {category}
              </UiButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Trending Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.06 }}
          className="mb-6"
        >
          <Card className="glass rounded-2xl border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success pulse-glow" />
                  Trending Products in Your Area
                </CardTitle>
                <Badge variant="secondary" className="rounded-full">Updated 2 hours ago</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {trendingProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.42, delay: 0.12 + index * 0.06 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-border/50 hover:shadow-glow transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <motion.div 
                        className="flex items-center gap-2"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <TrendingUp className="h-5 w-5 text-success" />
                        <span className="text-2xl font-bold text-success">
                          +{product.trend}%
                        </span>
                      </motion.div>
                      <Badge variant="outline" className="rounded-full">{product.category}</Badge>
                    </div>
                    <h4 className="font-semibold mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-muted-foreground">Demand:</span>
                      <Badge className="bg-success/20 text-success border-success/30 rounded-full">
                        {product.demand}
                      </Badge>
                    </div>
                    <div className="mb-4 pt-3 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Confidence:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: `${product.confidence}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                            />
                          </div>
                          <span className="font-medium">{product.confidence}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <UiButton 
                          variant="outline" 
                          size="small" 
                          className="w-full hover:border-primary transition-all"
                          onClick={() => handleAddToStore(product.name)}
                        >
                        Add to Store
                      </UiButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                        <UiButton 
                          variant="ghost" 
                          size="small" 
                          className="hover:text-primary"
                          onClick={handleFindSuppliers}
                        >
                        <Users className="h-4 w-4" />
                      </UiButton>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Price Changes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.18 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Activity className="h-5 w-5 text-primary" />
                  </motion.div>
                  Price Changes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {priceChanges.map((item, index) => (
                  <motion.div
                    key={item.product}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.24 + index * 0.06 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium mb-1">{item.product}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {item.area}
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          item.change > 0 ? "text-destructive" : "text-success"
                        }`}
                      >
                        {item.change > 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-semibold">
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-muted-foreground line-through">
                        ₹{item.oldPrice}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold text-lg">₹{item.newPrice}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Demand Spike */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.24 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <TrendingUp className="h-5 w-5 text-success" />
                  </motion.div>
                  Demand Spike Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="p-6 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/30 hover:shadow-glow transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center shrink-0"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Activity className="h-6 w-6 text-success" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Festival Season Approaching
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Demand for traditional items expected to increase by 60% in
                        the next 2 weeks
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Recommended products:</p>
                        <div className="flex flex-wrap gap-2">
                          {["Rice", "Sweets", "Dry Fruits", "Oil", "Spices"].map(
                            (item, idx) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-success/20 text-success border-success/30 rounded-full"
                                >
                                  {item}
                                </Badge>
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton variant="success" size="medium" className="w-full gradient-primary hover:shadow-glow-primary transition-all">
                      View Suppliers
                    </UiButton>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Insights;
