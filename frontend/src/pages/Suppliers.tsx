import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, MessageCircle, Star, Filter, Plus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const suppliers = [
  {
    id: "1",
    name: "Rajesh Wholesale Distributors",
    owner: "Rajesh Kumar",
    type: "Wholesale Supplier",
    category: "Grocery & FMCG",
    location: "Koramangala, Bangalore",
    phone: "+91 98765 43210",
    rating: 4.8,
    verified: true,
    products: 450,
    deliveryTime: "2-3 days",
    minOrder: "₹10,000",
  },
  {
    id: "2",
    name: "Anita Fresh Produce",
    owner: "Anita Sharma",
    type: "Fresh Produce Supplier",
    category: "Fruits & Vegetables",
    location: "Vashi Market, Mumbai",
    phone: "+91 98765 43211",
    rating: 4.9,
    verified: true,
    products: 180,
    deliveryTime: "Same day",
    minOrder: "₹5,000",
  },
  {
    id: "3",
    name: "Patel General Stores Wholesale",
    owner: "Mukesh Patel",
    type: "Wholesale Supplier",
    category: "General Merchandise",
    location: "Chandni Chowk, Delhi",
    phone: "+91 98765 43212",
    rating: 4.6,
    verified: true,
    products: 320,
    deliveryTime: "1-2 days",
    minOrder: "₹15,000",
  },
  {
    id: "4",
    name: "Mehta Textile Suppliers",
    owner: "Priya Mehta",
    type: "Textile Supplier",
    category: "Textiles & Fabrics",
    location: "Gandhi Nagar, Ahmedabad",
    phone: "+91 98765 43213",
    rating: 4.7,
    verified: true,
    products: 280,
    deliveryTime: "3-5 days",
    minOrder: "₹20,000",
  },
];

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = ["all", "Grocery & FMCG", "Fruits & Vegetables", "General Merchandise", "Textiles & Fabrics"];

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      (searchQuery === "" || supplier.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedCategory === "all" || supplier.category === selectedCategory)
  );

  const handleConnect = (supplierId: string) => {
    toast({
      title: "Connection Request Sent!",
      description: "The supplier will review your request soon.",
    });
  };

  const handleContact = (phone: string) => {
    toast({
      title: "Contact Information",
      description: `Call ${phone} to connect with this supplier.`,
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Suppliers & Wholesalers</h1>
            <p className="text-muted-foreground">Connect with verified suppliers for your business needs</p>
          </div>
          <UiButton
            variant="primary"
            size="medium"
            icon={<Plus className="h-4 w-4" />}
            onClick={() => navigate("/network")}
            className="gradient-primary hover:shadow-glow-primary transition-all"
          >
            Find More Suppliers
          </UiButton>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers by name, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search suppliers"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <UiButton
                key={category}
                variant={selectedCategory === category ? "primary" : "outline"}
                size="small"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "shadow-glow-primary" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </UiButton>
            ))}
          </div>
        </div>

        {/* Supplier Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
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
                        <h3 className="font-semibold text-lg">{supplier.name}</h3>
                        {supplier.verified && (
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
                      <p className="text-sm text-muted-foreground mb-1">Owner: {supplier.owner}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {supplier.location}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{supplier.rating}</span>
                        <span className="text-sm text-muted-foreground">({supplier.products} products)</span>
                      </div>
                      <Badge variant="secondary" className="mb-2 rounded-full">
                        {supplier.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Delivery Time</p>
                      <p className="font-semibold text-sm">{supplier.deliveryTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Min Order</p>
                      <p className="font-semibold text-sm">{supplier.minOrder}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                      <UiButton
                        variant="primary"
                        size="medium"
                        className="w-full gradient-primary hover:shadow-glow-primary transition-all"
                        onClick={() => handleConnect(supplier.id)}
                        icon={<MessageCircle className="h-4 w-4" />}
                      >
                        Connect
                      </UiButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton
                        variant="outline"
                        size="medium"
                        onClick={() => handleContact(supplier.phone)}
                        icon={<Phone className="h-4 w-4" />}
                      >
                        Call
                      </UiButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton
                        variant="ghost"
                        size="medium"
                        onClick={() => navigate(`/suppliers/${supplier.id}`)}
                        icon={<ShoppingBag className="h-4 w-4" />}
                      >
                        View Products
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

export default Suppliers;

