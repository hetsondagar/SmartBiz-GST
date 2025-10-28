import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Lock, Download, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import TwoFactorAuthModal from "@/components/TwoFactorAuthModal";

const Settings = () => {
  const [twoFactorOpen, setTwoFactorOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    navigate("/");
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="max-w-2xl space-y-6">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Owner Name</Label>
                  <Input id="name" defaultValue="Sample Owner" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="business">Business Name</Label>
                  <Input id="business" defaultValue="Sample Business" className="mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="owner@business.com"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Mobile</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+91 98765 43210"
                      className="mt-2"
                    />
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UiButton 
                    variant="primary" 
                    size="medium" 
                    className="gradient-primary hover:shadow-glow-primary transition-all"
                    onClick={() => toast({ title: "Profile Updated", description: "Your profile has been updated successfully" })}
                  >
                    Save Changes
                  </UiButton>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Email notifications", id: "email-notif" },
                  { label: "SMS notifications", id: "sms-notif" },
                  { label: "Low stock alerts", id: "stock-alerts" },
                  { label: "GST filing reminders", id: "gst-reminders" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <Label htmlFor={item.id} className="cursor-pointer">
                      {item.label}
                    </Label>
                    <Switch id={item.id} defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.18 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton variant="outline" size="small" onClick={() => setTwoFactorOpen(true)} className="hover:border-primary transition-all">
                      Enable
                    </UiButton>
                  </motion.div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">
                      Update your password regularly
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton 
                      variant="outline" 
                      size="small" 
                      className="hover:border-primary transition-all"
                      onClick={() => toast({ title: "Change Password", description: "Password change form will open here" })}
                    >
                      Change
                    </UiButton>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Export */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.24 }}
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-primary" />
                  Data Export
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Export your sales, inventory, and GST data
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UiButton 
                    variant="outline" 
                    size="medium" 
                    icon={<Download className="h-4 w-4" />} 
                    className="hover:border-primary transition-all"
                    onClick={() => toast({ title: "Export Started", description: "Your data export has been started. You will receive it via email." })}
                  >
                    Export All Data
                  </UiButton>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Logout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.3 }}
          >
            <Card className="glass rounded-2xl border-border/50 border-destructive/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-destructive">Logout</p>
                    <p className="text-sm text-muted-foreground">
                      Sign out from your account
                    </p>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton
                      variant="danger"
                      size="medium"
                      icon={<LogOut className="h-4 w-4" />}
                      onClick={handleLogout}
                    >
                      Logout
                    </UiButton>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <TwoFactorAuthModal open={twoFactorOpen} onOpenChange={setTwoFactorOpen} />
      </motion.div>
    </DashboardLayout>
  );
};

export default Settings;
