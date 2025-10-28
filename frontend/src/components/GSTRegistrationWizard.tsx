import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/ui-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GSTRegistrationWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 1, title: "PAN & Business Info" },
  { id: 2, title: "Address & Contact" },
  { id: 3, title: "Documents Upload" },
  { id: 4, title: "OTP Verification" },
  { id: 5, title: "Confirmation" },
];

const GSTRegistrationWizard = ({ open, onOpenChange }: GSTRegistrationWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pan: "",
    businessName: "",
    businessType: "",
    address: "",
    mobile: "",
    email: "",
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "GST Registration Submitted",
        description: "Your application is being processed. TRN will be sent to your registered mobile.",
      });
      onOpenChange(false);
      setCurrentStep(1);
    }, 2000);
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass rounded-2xl border-border/50 max-w-3xl">
        <DialogHeader>
          <DialogTitle>Register for GST</DialogTitle>
        </DialogHeader>

        {/* Progress Stepper */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep > step.id
                        ? "bg-success border-success text-white"
                        : currentStep === step.id
                        ? "bg-primary border-primary text-white"
                        : "bg-muted border-muted-foreground text-muted-foreground"
                    }`}
                    animate={{
                      scale: currentStep === step.id ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </motion.div>
                  <p className="text-xs mt-2 text-center text-muted-foreground">
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.id ? "bg-success" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="pan">PAN Number *</Label>
                <Input
                  id="pan"
                  placeholder="ABCDE1234F"
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                  className="mt-2"
                  maxLength={10}
                />
              </div>
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Enter legal business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="businessType">Type of Business *</Label>
                <Input
                  id="businessType"
                  placeholder="e.g., Retail, Wholesale"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="mt-2"
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="address">Business Address *</Label>
                <Input
                  id="address"
                  placeholder="Full address with state and PIN"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="10-digit mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="mt-2"
                    maxLength={10}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Upload required documents (PDF/Image)
              </p>
              {["PAN Card", "Owner Photo", "Business Proof", "Address Proof"].map((doc, index) => (
                <div key={index} className="p-4 border border-border/50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{doc}</p>
                      <p className="text-xs text-muted-foreground">Max 2MB</p>
                    </div>
                    <UiButton variant="outline" size="small">
                      Upload
                    </UiButton>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 text-center"
            >
              <p className="text-sm text-muted-foreground">
                OTP sent to {formData.mobile.slice(0, 3)}***{formData.mobile.slice(-2)} and {formData.email.slice(0, 3)}***@{formData.email.split("@")[1]}
              </p>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3, 4].map((digit) => (
                  <Input
                    key={digit}
                    type="text"
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg"
                    value={formData.otp[digit - 1] || ""}
                    onChange={(e) => {
                      const newOtp = formData.otp.split("");
                      newOtp[digit - 1] = e.target.value;
                      setFormData({ ...formData, otp: newOtp.join("") });
                    }}
                  />
                ))}
              </div>
              <UiButton variant="ghost" size="small">
                Resend OTP
              </UiButton>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center py-8"
            >
              <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              <p className="font-semibold text-lg mb-2">Ready to Submit!</p>
              <p className="text-sm text-muted-foreground mb-4">
                Review your information and submit your GST registration application
              </p>
              {isSubmitting && (
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Submitting application...</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t">
          <UiButton
            variant="outline"
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Previous
          </UiButton>
          <UiButton
            variant="primary"
            className="gradient-primary"
            onClick={handleNext}
            disabled={isSubmitting}
          >
            {currentStep === steps.length ? "Submit Application" : "Next"}
            {currentStep < steps.length && <ChevronRight className="h-4 w-4 ml-2" />}
          </UiButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GSTRegistrationWizard;

