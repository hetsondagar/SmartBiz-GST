import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { UiButton } from "./ui/ui-button";
import QuickAdd from "./QuickAdd";
import {
  Package,
  ShoppingCart,
  FileText,
  TrendingUp,
  Users,
  Megaphone,
  Building2,
  Settings,
  LayoutDashboard,
  Bell,
  Search,
  Plus,
} from "lucide-react";
import { Input } from "./ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/store", label: "My Store", icon: Package },
    { path: "/sales", label: "My Sales", icon: ShoppingCart },
    { path: "/gst", label: "GST", icon: FileText },
    { path: "/insights", label: "Market Insights", icon: TrendingUp },
    { path: "/network", label: "Network", icon: Users },
    { path: "/marketing", label: "Marketing", icon: Megaphone },
    { path: "/building", label: "Building", icon: Building2 },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3 text-2xl font-bold group">
            <motion.img 
              src="/logo.png" 
              alt="SmartBiz GST Logo" 
              className="h-8 w-8 object-contain"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SmartBiz GST
            </span>
          </Link>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, sales..."
                className="pl-10"
                aria-label="Search"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <UiButton
                variant="primary"
                size="medium"
                icon={<Plus className="h-4 w-4" />}
                aria-label="Quick add"
                className="gradient-primary hover:shadow-glow-primary transition-all"
                onClick={() => setIsQuickAddOpen(true)}
              >
                <span className="hidden sm:inline">Quick Add</span>
              </UiButton>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <UiButton
                variant="ghost"
                size="medium"
                className="relative ripple"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <motion.span 
                  className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full pulse-glow"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </UiButton>
            </motion.div>
            <Link to="/settings">
              <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                <UiButton variant="ghost" size="medium" aria-label="Settings">
                  <Settings className="h-5 w-5" />
                </UiButton>
              </motion.div>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link key={item.path} to={item.path} className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative group ${
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <motion.div
                      animate={active ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Icon className={`h-4 w-4 ${active ? 'glow-border-primary' : ''}`} />
                    </motion.div>
                    <span>{item.label}</span>
                    {active && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary glow-border-primary"
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    {!active && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Quick Add Modal */}
      <QuickAdd
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSubmit={(data) => {
          console.log("Quick Add submitted:", data);
          // Handle submission logic here
        }}
      />
    </div>
  );
};

export default DashboardLayout;
