import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Users, MapPin, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfettiBurst from "@/components/ConfettiBurst";
import SuccessAnimation from "@/components/SuccessAnimation";
import MagneticButton from "@/components/MagneticButton";

const opportunities = [
  {
    category: "Electronics",
    demand: 85,
    growth: 12.5,
    gap: "High",
    avgMargin: 18,
  },
  {
    category: "Fashion",
    demand: 78,
    growth: 8.3,
    gap: "Medium",
    avgMargin: 25,
  },
  {
    category: "Home Decor",
    demand: 72,
    growth: 15.2,
    gap: "High",
    avgMargin: 22,
  },
];

const Building = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleViewDetails = (category: string) => {
    toast({
      title: "Opportunity Details",
      description: `Viewing details for ${category} business opportunity`,
    });
  };

  const handleFindSuppliers = () => {
    navigate("/suppliers");
  };

  const handleNewBusiness = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1500);
    toast({
      title: "Business Plan Ready!",
      description: "Your personalized business plan has been created",
    });
  };

  const handleExpansion = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1500);
    toast({
      title: "Expansion Plan Created!",
      description: "Your expansion strategy is ready",
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Building</h1>
          <p className="text-muted-foreground">
            Plan your new business or expand existing operations
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.06 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="hover-lift"
          >
            <Card className="glass rounded-2xl border-border/50 bg-gradient-to-br from-primary/10 to-secondary/10 overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="h-8 w-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Start New Business</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore opportunities in your area
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Get AI-powered insights on best business types, demand forecasts,
                  and startup cost estimates for your location.
                </p>
                <MagneticButton
                  variant="primary"
                  size="large"
                  className="w-full gradient-primary hover:shadow-glow-primary transition-all"
                  onClick={handleNewBusiness}
                >
                  Get Started
                </MagneticButton>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.42, delay: 0.12 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="hover-lift"
          >
            <Card className="glass rounded-2xl border-border/50 bg-gradient-to-br from-accent/10 to-success/10 overflow-hidden relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-accent/20 to-success/20 rounded-2xl flex items-center justify-center"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Building2 className="h-8 w-8 text-accent" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Expand Business</h3>
                    <p className="text-sm text-muted-foreground">
                      Scale to new locations
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Analyze expansion opportunities, competitor density, and financial
                  projections for new branches or locations.
                </p>
                <MagneticButton
                  variant="accent"
                  size="large"
                  className="w-full gradient-accent hover:shadow-glow-accent transition-all"
                  onClick={handleExpansion}
                >
                  Plan Expansion
                </MagneticButton>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.18 }}
        >
          <Card className="glass rounded-2xl border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                  High-Demand Categories in Your Area
                </CardTitle>
                <Badge variant="secondary" className="rounded-full">
                  <MapPin className="h-3 w-3 mr-1" />
                  Within 5km
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.42, delay: 0.24 + index * 0.06 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 hover:shadow-glow transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold mb-2">
                          {opportunity.category}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              opportunity.gap === "High" ? "default" : "secondary"
                            }
                            className={
                              opportunity.gap === "High"
                                ? "bg-destructive/10 text-destructive"
                                : ""
                            }
                          >
                            {opportunity.gap} Gap
                          </Badge>
                          <Badge variant="outline">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {opportunity.growth}% growth
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">
                          Avg. Margin
                        </p>
                        <p className="text-2xl font-bold text-success">
                          {opportunity.avgMargin}%
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Demand Score</span>
                        <span className="font-medium">{opportunity.demand}/100</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: `${opportunity.demand}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <UiButton 
                          variant="outline" 
                          size="small"
                          onClick={() => handleViewDetails(opportunity.category)}
                        >
                          View Details
                        </UiButton>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <UiButton 
                          variant="ghost" 
                          size="small" 
                          icon={<Users className="h-4 w-4" />}
                          onClick={handleFindSuppliers}
                        >
                          Find Suppliers
                        </UiButton>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <ConfettiBurst show={showConfetti} />
        <SuccessAnimation show={showSuccess} message="Business Plan Created Successfully!" />
      </motion.div>
    </DashboardLayout>
  );
};

export default Building;
