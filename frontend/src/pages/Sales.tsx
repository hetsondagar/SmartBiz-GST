import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Filter, TrendingUp, TrendingDown, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import OCRBillUpload from "@/components/OCRBillUpload";
import RecordSaleModal from "@/components/RecordSaleModal";

const salesByProduct = [
  { product: "Basmati Rice", sales: 24500 },
  { product: "Sunflower Oil", sales: 18200 },
  { product: "Sugar", sales: 12800 },
  { product: "Wheat Flour", sales: 15600 },
  { product: "Toor Dal", sales: 9800 },
];

const recentTransactions = [
  {
    id: "T001",
    date: "2025-01-15",
    customer: "Kiran General Store",
    amount: 1250,
    payment: "Cash",
    items: 5,
  },
  {
    id: "T002",
    date: "2025-01-15",
    customer: "Rajesh Kumar",
    amount: 5600,
    payment: "UPI",
    items: 12,
  },
  {
    id: "T003",
    date: "2025-01-14",
    customer: "Walk-in Customer",
    amount: 890,
    payment: "Card",
    items: 3,
  },
];

const Sales = () => {
  const [ocrModalOpen, setOcrModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRecordSale = () => {
    setSaleModalOpen(true);
  };

  const handleUploadBill = () => {
    setOcrModalOpen(true);
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
            <h1 className="text-3xl font-bold mb-2">My Sales</h1>
            <p className="text-muted-foreground">Track and manage all your sales</p>
          </div>

          <div className="flex gap-3">
            <UiButton
              variant="outline"
              size="medium"
              icon={<Upload className="h-4 w-4" />}
              onClick={handleUploadBill}
              aria-label="Upload purchase bill"
            >
              Upload Bill
            </UiButton>
            <UiButton
              variant="primary"
              size="medium"
              icon={<Plus className="h-4 w-4" />}
              onClick={handleRecordSale}
              aria-label="Record sale"
            >
              Record Sale
            </UiButton>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {[
            { label: "Today's Sales", value: "₹12,450", change: 12.5, positive: true },
            { label: "This Week", value: "₹78,340", change: 8.2, positive: true },
            { label: "This Month", value: "₹3,24,890", change: -2.4, positive: false },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="hover-lift"
            >
              <Card className="glass rounded-2xl border-border/50 overflow-hidden relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.positive ? 'from-primary/5 to-secondary/5' : 'from-destructive/5 to-orange-500/5'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardContent className="p-6 relative z-10">
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <motion.p 
                    className="text-3xl font-bold mb-2 count-up"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                  <motion.div 
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {stat.positive ? (
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <TrendingUp className="h-4 w-4 text-success" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      </motion.div>
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        stat.positive ? "text-success" : "text-destructive"
                      }`}
                    >
                      {Math.abs(stat.change)}%
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales by Product Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.18 }}
            className="lg:col-span-2"
            whileHover={{ scale: 1.01 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Product-wise Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByProduct}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="product" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
                      />
                      <Bar 
                        dataKey="sales" 
                        radius={[12, 12, 0, 0]}
                      >
                        {salesByProduct.map((entry, index) => (
                          <defs key={index}>
                            <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="hsl(var(--primary))" />
                              <stop offset="100%" stopColor="hsl(var(--secondary))" />
                            </linearGradient>
                          </defs>
                        ))}
                        <Bar 
                          dataKey="sales"
                          fill="url(#gradient-0)"
                          radius={[12, 12, 0, 0]}
                          animationDuration={1000}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.24 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                    Recent Transactions
                  </CardTitle>
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton 
                        variant="outline" 
                        size="small" 
                        icon={<FileText className="h-4 w-4" />} 
                        className="hover:text-primary"
                        onClick={() => navigate("/invoices")}
                      >
                        View All Invoices
                      </UiButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton variant="ghost" size="small" icon={<Filter className="h-4 w-4" />} className="hover:text-primary">
                        Filter
                      </UiButton>
                    </motion.div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.3 + index * 0.06 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-primary/20 hover:shadow-glow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{transaction.customer}</span>
                      <Badge variant="secondary" className="rounded-full">{transaction.payment}</Badge>
                    </div>
                    <motion.p 
                      className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      ₹{transaction.amount.toLocaleString()}
                    </motion.p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{transaction.items} items</span>
                      <span>{transaction.date}</span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <OCRBillUpload open={ocrModalOpen} onOpenChange={setOcrModalOpen} />
        <RecordSaleModal open={saleModalOpen} onOpenChange={setSaleModalOpen} />
      </motion.div>
    </DashboardLayout>
  );
};

export default Sales;
