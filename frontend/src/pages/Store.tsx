import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ShoppingCart,
  Grid3x3,
  List,
  Upload,
  Package,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emptyStore from "@/assets/empty-store.png";
import CSVImportWizard from "@/components/CSVImportWizard";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  qty: number;
  gst: number;
}

const Store = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [csvImportOpen, setCsvImportOpen] = useState(false);
  const { toast } = useToast();

  // Mock products
  const products: Product[] = [
    {
      id: "1",
      name: "Basmati Rice (25kg)",
      sku: "RICE001",
      category: "Grocery",
      buyingPrice: 1200,
      sellingPrice: 1500,
      qty: 45,
      gst: 5,
    },
    {
      id: "2",
      name: "Sunflower Oil (1L)",
      sku: "OIL001",
      category: "Grocery",
      buyingPrice: 120,
      sellingPrice: 150,
      qty: 80,
      gst: 5,
    },
    {
      id: "3",
      name: "Sugar (1kg)",
      sku: "SUGAR001",
      category: "Grocery",
      buyingPrice: 40,
      sellingPrice: 50,
      qty: 120,
      gst: 5,
    },
  ];

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "Product form will open here",
    });
  };

  const handleImportCSV = () => {
    setCsvImportOpen(true);
  };

  const handleEditProduct = (productId: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product ${productId}`,
    });
  };

  const handleQuickSale = (productId: string) => {
    toast({
      title: "Quick Sale",
      description: `Adding product ${productId} to sale`,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    toast({
      title: "Delete Product",
      description: `Are you sure you want to delete product ${productId}?`,
      variant: "destructive",
    });
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42 }}
      className="flex flex-col items-center justify-center py-16"
    >
      <img src={emptyStore} alt="Empty store" className="w-48 h-48 mb-6" />
      <h3 className="text-2xl font-bold mb-2">Your store is looking empty</h3>
      <p className="text-muted-foreground mb-6">Add your first product to get started</p>
      <UiButton
        variant="primary"
        size="large"
        icon={<Plus className="h-5 w-5" />}
        onClick={handleAddProduct}
      >
        Add your first product
      </UiButton>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Store</h1>
            <p className="text-muted-foreground">
              Manage your products and inventory
            </p>
          </div>

          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UiButton
              variant="outline"
              size="medium"
              icon={<Upload className="h-4 w-4" />}
              onClick={handleImportCSV}
              aria-label="Import CSV"
                className="hover:border-primary transition-all"
            >
              Import CSV
            </UiButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UiButton
              variant="primary"
              size="medium"
              icon={<Plus className="h-4 w-4" />}
              onClick={handleAddProduct}
              aria-label="Add product"
                className="gradient-primary hover:shadow-glow-primary transition-all"
            >
              Add Product
            </UiButton>
            </motion.div>
          </div>
        </div>

        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search products"
            />
          </div>

          <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
            {[
              { mode: "grid" as const, icon: Grid3x3 },
              { mode: "table" as const, icon: List },
            ].map(({ mode, icon: Icon }) => (
              <motion.div key={mode} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <UiButton
                  variant={viewMode === mode ? "primary" : "ghost"}
              size="medium"
                  onClick={() => setViewMode(mode)}
                  aria-label={`${mode} view`}
                  className={viewMode === mode ? "shadow-glow-primary" : ""}
            >
                  <Icon className="h-4 w-4" />
            </UiButton>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Products Table */}
        {products.length > 0 ? (
          <Card className="glass rounded-2xl border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Product</th>
                      <th className="text-left p-4 font-medium text-sm">Category</th>
                      <th className="text-right p-4 font-medium text-sm">Buying Price</th>
                      <th className="text-right p-4 font-medium text-sm">Selling Price</th>
                      <th className="text-right p-4 font-medium text-sm">Qty</th>
                      <th className="text-center p-4 font-medium text-sm">GST%</th>
                      <th className="text-right p-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      const stockStatus = product.qty > 50 ? "good" : product.qty > 20 ? "low" : "critical";
                      return (
                      <motion.tr
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.42, delay: index * 0.06 }}
                          whileHover={{ scale: 1.01, x: 4 }}
                          className="border-t border-border/50 hover:bg-muted/30 transition-all group"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                              <motion.div 
                                className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                                whileHover={{ rotate: 5 }}
                              >
                              <Package className="h-5 w-5 text-primary" />
                              </motion.div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                SKU: {product.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                            <Badge variant="secondary" className="rounded-full">{product.category}</Badge>
                        </td>
                        <td className="p-4 text-right">₹{product.buyingPrice}</td>
                        <td className="p-4 text-right font-medium">
                          ₹{product.sellingPrice}
                        </td>
                        <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <motion.span
                                className={`font-medium ${
                                  stockStatus === "critical" ? "text-destructive" :
                                  stockStatus === "low" ? "text-yellow-500" : "text-success"
                                }`}
                                animate={stockStatus === "critical" ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                          >
                            {product.qty}
                              </motion.span>
                              <div className={`w-2 h-2 rounded-full ${
                                stockStatus === "critical" ? "bg-destructive pulse-glow" :
                                stockStatus === "low" ? "bg-yellow-500" : "bg-success"
                              }`} />
                            </div>
                        </td>
                        <td className="p-4 text-center">{product.gst}%</td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <UiButton
                              variant="ghost"
                              size="small"
                              aria-label="Edit product"
                                  className="hover:text-primary"
                              onClick={() => handleEditProduct(product.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </UiButton>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <UiButton
                              variant="ghost"
                              size="small"
                              aria-label="Quick sale"
                                  className="hover:text-secondary"
                              onClick={() => handleQuickSale(product.id)}
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </UiButton>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <UiButton
                              variant="ghost"
                              size="small"
                              aria-label="Delete product"
                                  className="hover:text-destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </UiButton>
                              </motion.div>
                          </div>
                        </td>
                      </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <EmptyState />
        )}
        <CSVImportWizard open={csvImportOpen} onOpenChange={setCsvImportOpen} />
      </motion.div>
    </DashboardLayout>
  );
};

export default Store;
