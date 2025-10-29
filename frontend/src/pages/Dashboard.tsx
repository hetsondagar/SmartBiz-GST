import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SmartSuggestion from "@/components/SmartSuggestion";
import QuickAddZone from "@/components/QuickAddZone";
import {
  Plus,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
  Users,
  Megaphone,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motionVariants } from "@/lib/animations";

// Mock data
const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 4890 },
  { name: "Sat", sales: 6390 },
  { name: "Sun", sales: 5490 },
];

const lowStockItems = [
  { name: "Basmati Rice (25kg)", stock: 5, sold: 85, sku: "RICE001" },
  { name: "Sunflower Oil (1L)", stock: 8, sold: 80, sku: "OIL001" },
  { name: "Sugar (1kg)", stock: 12, sold: 70, sku: "SUGAR001" },
];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("week");
  const [showSuggestion, setShowSuggestion] = useState(true);

  const kpiData = [
    {
      title: "Sales Today",
      value: "₹12,450",
      change: 12.5,
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Sales This Week",
      value: "₹78,340",
      change: 8.2,
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Sales This Month",
      value: "₹3,24,890",
      change: -2.4,
      positive: false,
      icon: TrendingDown,
    },
  ];

  return (
    <DashboardLayout>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back, Rajesh!</h2>
          <p className="text-muted-foreground">Here's what's happening with Rajesh General Store today</p>
        </motion.div>

        {/* Smart Suggestions */}
        <AnimatePresence>
          {showSuggestion && (
            <SmartSuggestion
              type="suggestion"
              message="Your sales are 15% higher this week — nice work! 🎉"
              onDismiss={() => setShowSuggestion(false)}
            />
          )}
        </AnimatePresence>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="hover-lift"
            >
              <Card className="glass rounded-2xl border-border/50 overflow-hidden relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${kpi.positive ? 'from-primary/5 to-secondary/5' : 'from-destructive/5 to-orange-500/5'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                  <motion.div
                    animate={kpi.positive ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <kpi.icon className={`h-5 w-5 ${kpi.positive ? 'text-primary' : 'text-destructive'}`} />
                  </motion.div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <motion.div 
                    className="text-3xl font-bold mb-2 count-up"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {kpi.value}
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-1 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    {kpi.positive ? (
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <ArrowUpRight className="h-4 w-4 text-success" />
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <ArrowDownRight className="h-4 w-4 text-destructive" />
                      </motion.div>
                    )}
                    <span className={`font-semibold ${kpi.positive ? "text-success" : "text-destructive"}`}>
                      {Math.abs(kpi.change)}%
                    </span>
                    <span className="text-muted-foreground">vs last period</span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.18 }}
            className="lg:col-span-2"
            whileHover={{ scale: 1.01 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Sales Summary</CardTitle>
                  <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
                    {["today", "week", "month"].map((range) => (
                      <motion.div key={range} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <UiButton
                          variant={timeRange === range ? "primary" : "ghost"}
                          size="small"
                          onClick={() => setTimeRange(range as any)}
                          className={timeRange === range ? "shadow-glow-primary" : ""}
                        >
                          {range.charAt(0).toUpperCase() + range.slice(1)}
                        </UiButton>
                      </motion.div>
                    ))}
                  </div>
                </div>
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
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                        cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 1 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="url(#colorGradient)"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", r: 5 }}
                        activeDot={{ r: 7, fill: "hsl(var(--secondary))" }}
                      />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="hsl(var(--secondary))" />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.24 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}>
                  <UiButton 
                    variant="primary" 
                    size="large" 
                    className="w-full justify-start gradient-primary hover:shadow-glow-primary transition-all" 
                    icon={<Plus className="h-5 w-5" />}
                    onClick={() => navigate("/store")}
                  >
                    Add Product
                  </UiButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}>
                  <UiButton 
                    variant="secondary" 
                    size="large" 
                    className="w-full justify-start hover:shadow-glow transition-all" 
                    icon={<ShoppingCart className="h-5 w-5" />}
                    onClick={() => navigate("/sales")}
                  >
                    Record Sale
                  </UiButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}>
                  <UiButton 
                    variant="ghost" 
                    size="large" 
                    className="w-full justify-start hover:bg-accent/10 transition-all" 
                    icon={<Users className="h-5 w-5" />}
                    onClick={() => navigate("/suppliers")}
                  >
                    Connect Supplier
                  </UiButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02, x: 4 }} whileTap={{ scale: 0.98 }}>
                  <UiButton 
                    variant="outline" 
                    size="large" 
                    className="w-full justify-start hover:border-accent hover:text-accent transition-all" 
                    icon={<Megaphone className="h-5 w-5" />}
                    onClick={() => navigate("/marketing")}
                  >
                    Promote Product
                  </UiButton>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Low Stock Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-destructive"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map((item, index) => (
                    <motion.div
                      key={item.sku}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.42, delay: 0.3 + index * 0.06 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group border border-transparent hover:border-destructive/20"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${item.sold > 80 ? "bg-destructive" : "bg-yellow-500"}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.sold}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{item.sold}% sold</span>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <motion.p 
                          className="text-2xl font-bold text-destructive count-up"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.6 }}
                        >
                          {item.stock}
                        </motion.p>
                        <p className="text-xs text-muted-foreground">units left</p>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <UiButton variant="ghost" size="small" className="mt-2" icon={<Plus className="h-3 w-3" />}>
                            Add Stock
                          </UiButton>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Add Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.36 }}
          className="mt-12"
        >
          <QuickAddZone 
            title="Quick Add Zone" 
            limit={6}
            className="mb-8"
          />
        </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;
