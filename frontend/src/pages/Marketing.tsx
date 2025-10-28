import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, TrendingUp, Eye, MousePointerClick, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ConfettiBurst from "@/components/ConfettiBurst";
import SuccessAnimation from "@/components/SuccessAnimation";
import MagneticButton from "@/components/MagneticButton";

const campaigns = [
  {
    id: "1",
    name: "Festival Sale Campaign",
    status: "Active",
    platforms: ["Facebook", "Instagram"],
    spend: 2500,
    impressions: 45200,
    clicks: 1850,
    budget: 5000,
  },
  {
    id: "2",
    name: "New Product Launch",
    status: "Scheduled",
    platforms: ["YouTube", "In-app"],
    spend: 0,
    impressions: 0,
    clicks: 0,
    budget: 3000,
  },
];

const Marketing = () => {
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleCreateCampaign = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1500);
    toast({
      title: "Campaign Created!",
      description: "Your campaign is now live",
    });
  };

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
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
            <h1 className="text-3xl font-bold mb-2">Marketing</h1>
            <p className="text-muted-foreground">
              Create and manage your advertising campaigns
            </p>
          </div>
          <MagneticButton
            variant="primary"
            size="large"
            icon={<Plus className="h-4 w-4" />}
            onClick={handleCreateCampaign}
            aria-label="Create campaign"
            className="gradient-primary hover:shadow-glow-primary transition-all"
          >
            Create Campaign
          </MagneticButton>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {[
            { label: "Total Spend", value: "₹2,500", icon: TrendingUp },
            { label: "Total Impressions", value: "45,200", icon: Eye },
            { label: "Total Clicks", value: "1,850", icon: MousePointerClick },
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      <stat.icon className="h-5 w-5 text-primary" />
                    </motion.div>
                  </div>
                  <motion.p 
                    className="text-3xl font-bold count-up"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {stat.value}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Active Campaigns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.18 }}
        >
          <Card className="glass rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary pulse-glow" />
                Your Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: 0.24 + index * 0.06 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 hover:shadow-glow transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{campaign.name}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          className={
                            campaign.status === "Active" 
                              ? "bg-success/20 text-success border-success/30 rounded-full"
                              : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 rounded-full"
                          }
                        >
                          {campaign.status}
                        </Badge>
                        {campaign.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className="rounded-full">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <Megaphone className="h-6 w-6 text-primary" />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Spend</p>
                      <p className="font-semibold">
                        ₹{campaign.spend.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Budget</p>
                      <p className="font-semibold">
                        ₹{campaign.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Impressions
                      </p>
                      <p className="font-semibold">
                        {campaign.impressions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Clicks</p>
                      <p className="font-semibold">
                        {campaign.clicks.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {campaign.status === "Active" && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Budget Used</span>
                        <span className="font-medium">
                          {Math.round((campaign.spend / campaign.budget) * 100)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: 0 }}
                          animate={{ width: `${(campaign.spend / campaign.budget) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton 
                        variant="outline" 
                        size="small"
                        onClick={() => toast({ title: "Analytics", description: `Opening analytics for ${campaign.name}` })}
                      >
                        View Analytics
                      </UiButton>
                    </motion.div>
                    {campaign.status === "Active" && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <UiButton 
                          variant="ghost" 
                          size="small"
                          onClick={() => toast({ title: "Campaign Paused", description: `${campaign.name} has been paused` })}
                        >
                          Pause
                        </UiButton>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pricing Plans with Confetti */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="glass rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {["Basic", "Pro", "Enterprise"].map((plan, index) => (
                  <motion.div
                    key={plan}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => handlePlanSelect(plan)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlan === plan
                        ? "border-primary shadow-glow-primary bg-gradient-to-br from-primary/10 to-secondary/10"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2">{plan}</h3>
                    <p className="text-3xl font-bold mb-4">
                      {plan === "Basic" ? "₹999" : plan === "Pro" ? "₹2,999" : "₹9,999"}
                      <span className="text-sm text-muted-foreground">/month</span>
                    </p>
                    <UiButton
                      variant={selectedPlan === plan ? "primary" : "outline"}
                      className="w-full"
                      onClick={() => handlePlanSelect(plan)}
                    >
                      {selectedPlan === plan ? "Selected" : "Select Plan"}
                    </UiButton>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <ConfettiBurst show={showConfetti} />
        <SuccessAnimation show={showSuccess} message="Campaign Created Successfully!" />
      </motion.div>
    </DashboardLayout>
  );
};

export default Marketing;
