import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  FileText,
  Download,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GSTRegistrationWizard from "@/components/GSTRegistrationWizard";

const GST = () => {
  const [openMonth, setOpenMonth] = useState<string | null>(null);
  const [registrationWizardOpen, setRegistrationWizardOpen] = useState(false);
  const { toast } = useToast();

  const handleAutoFile = () => {
    toast({
      title: "Auto-file GST",
      description: "GST auto-filing wizard will start",
    });
  };

  const handleRegister = () => {
    setRegistrationWizardOpen(true);
  };

  const filingHistory = [
    {
      period: "December 2024",
      status: "Filed",
      date: "2025-01-10",
      arn: "ARN24AA123456789",
    },
    {
      period: "November 2024",
      status: "Filed",
      date: "2024-12-10",
      arn: "ARN24AA123456788",
    },
    {
      period: "October 2024",
      status: "Filed",
      date: "2024-11-10",
      arn: "ARN24AA123456787",
    },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">GST Management</h1>
            <p className="text-muted-foreground">
              Manage your GST registration and filing
            </p>
          </div>
        </div>

        {/* AI Assistant Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl border border-primary/20 glass"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0"
            >
              <Sparkles className="h-5 w-5 text-white" />
            </motion.div>
            <div className="flex-1">
              <p className="font-medium">Need help filing GST?</p>
              <p className="text-sm text-muted-foreground">Ask SmartBiz AI for step-by-step guidance</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <UiButton variant="primary" size="small" className="gradient-primary">
                Ask SmartBot
              </UiButton>
            </motion.div>
          </div>
        </motion.div>

        {/* GST Card */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
            className="lg:col-span-2"
          >
            <Card className="glass rounded-2xl border-border/50 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      Your GST Registration
                    </CardTitle>
                    <Badge className="mb-4 bg-success/20 text-success border-success/30 rounded-full">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="mr-1"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                      </motion.div>
                      Active
                    </Badge>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <FileText className="h-8 w-8 text-primary" />
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">GST Number</p>
                    <p className="font-mono text-lg font-medium">27AABCU9603R1ZX</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Legal Name</p>
                    <p className="font-medium">Sample Business Pvt Ltd</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Last Filed ARN
                    </p>
                    <p className="font-mono text-sm">ARN24AA123456789</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Next Due Date
                    </p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <p className="font-medium">20th Feb 2025</p>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <Clock className="h-3 w-3 mr-1" />7 days left
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 relative z-10">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton
                      variant="primary"
                      size="large"
                      onClick={handleAutoFile}
                      aria-label="Auto-file GST"
                      className="gradient-primary hover:shadow-glow-primary transition-all"
                    >
                      Auto-file my GST
                    </UiButton>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton
                      variant="outline"
                      size="large"
                      icon={<Download className="h-4 w-4" />}
                      aria-label="Download report"
                      className="hover:border-primary transition-all"
                    >
                      Download Report
                    </UiButton>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <UiButton
                    variant="outline"
                    size="large"
                    className="w-full justify-start"
                    icon={<FileText className="h-5 w-5" />}
                    onClick={() => toast({ title: "Monthly Report", description: "Opening GST monthly report..." })}
                  >
                    View Monthly Report
                  </UiButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <UiButton
                    variant="outline"
                    size="large"
                    className="w-full justify-start"
                    icon={<Download className="h-5 w-5" />}
                    onClick={() => toast({ title: "Download Started", description: "Downloading GST certificates..." })}
                  >
                    Download Certificates
                  </UiButton>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <UiButton
                    variant="outline"
                    size="large"
                    className="w-full justify-start"
                    icon={<AlertCircle className="h-5 w-5" />}
                    onClick={() => toast({ title: "Support", description: "Contacting GST support team..." })}
                  >
                    Contact Support
                  </UiButton>
                </motion.div>
                <div className="pt-2 border-t border-border">
                  <UiButton
                    variant="ghost"
                    size="large"
                    className="w-full justify-start text-primary"
                    icon={<Plus className="h-5 w-5" />}
                    onClick={handleRegister}
                  >
                    Register New GST
                  </UiButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filing History with Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, delay: 0.18 }}
        >
          <Card className="glass rounded-2xl border-border/50">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success pulse-glow" />
                Filing History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full" value={openMonth || undefined} onValueChange={setOpenMonth}>
                {filingHistory.map((filing, index) => (
                  <AccordionItem key={filing.arn} value={filing.period}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.42, delay: 0.24 + index * 0.06 }}
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4 flex-1">
                          <motion.div 
                            className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <CheckCircle2 className="h-6 w-6 text-success" />
                          </motion.div>
                          <div className="flex-1 text-left">
                            <p className="font-medium mb-1">{filing.period}</p>
                            <p className="text-sm text-muted-foreground">
                              ARN: {filing.arn}
                            </p>
                          </div>
                          <Badge className="bg-success/20 text-success border-success/30 rounded-full">
                            {filing.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground">{filing.date}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 pb-2 pl-16 space-y-3"
                        >
                          <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">ARN Number</p>
                                <p className="font-mono text-sm font-medium">{filing.arn}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground mb-1">Filing Date</p>
                                <p className="font-medium">{filing.date}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <UiButton variant="outline" size="small" icon={<Download className="h-4 w-4" />}>
                                Download Receipt
                              </UiButton>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <UiButton variant="ghost" size="small" icon={<FileText className="h-4 w-4" />}>
                                View Details
                              </UiButton>
                            </motion.div>
                          </div>
                        </motion.div>
                      </AccordionContent>
                    </motion.div>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
        <GSTRegistrationWizard open={registrationWizardOpen} onOpenChange={setRegistrationWizardOpen} />
      </motion.div>
    </DashboardLayout>
  );
};

export default GST;
