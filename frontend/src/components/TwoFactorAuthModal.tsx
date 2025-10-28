import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/ui-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TwoFactorAuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TwoFactorAuthModal = ({ open, onOpenChange }: TwoFactorAuthModalProps) => {
  const [step, setStep] = useState<"setup" | "verify">("setup");
  const [method, setMethod] = useState<"phone" | "app">("app");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const secretKey = "JBSWY3DPEHPK3PXP";
  const qrCodeUrl = `otpauth://totp/SmartBiz%20GST?secret=${secretKey}&issuer=SmartBiz`;

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    toast({
      title: "Secret key copied",
      description: "Paste it into your authenticator app",
    });
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled",
      });
      onOpenChange(false);
      setStep("setup");
      setOtp("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass rounded-2xl border-border/50 max-w-md">
        <DialogHeader>
          <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Add an extra layer of security to your account
          </DialogDescription>
        </DialogHeader>

        {step === "setup" && (
          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-muted/30 rounded-lg">
              <UiButton
                variant={method === "app" ? "primary" : "ghost"}
                size="small"
                onClick={() => setMethod("app")}
                className={method === "app" ? "shadow-glow-primary" : ""}
              >
                Authenticator App
              </UiButton>
              <UiButton
                variant={method === "phone" ? "primary" : "ghost"}
                size="small"
                onClick={() => setMethod("phone")}
                className={method === "phone" ? "shadow-glow-primary" : ""}
              >
                Phone Number
              </UiButton>
            </div>

            {method === "app" ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                  <p className="text-sm font-medium mb-3">Scan this QR code with your authenticator app:</p>
                  <div className="w-48 h-48 mx-auto bg-white p-4 rounded-lg flex items-center justify-center">
                    <QrCode className="h-full w-full" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Or enter this code manually:</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm">
                      {secretKey}
                    </code>
                    <UiButton variant="outline" size="small" onClick={handleCopySecret}>
                      <Copy className="h-4 w-4" />
                    </UiButton>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Download Google Authenticator, Microsoft Authenticator, or any compatible app
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="mt-2"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send OTP codes to this number for verification
                </p>
              </div>
            )}

            <UiButton
              variant="primary"
              className="gradient-primary w-full"
              onClick={() => setStep("verify")}
            >
              Continue to Verification
            </UiButton>
          </div>
        )}

        {step === "verify" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4 text-center"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Enter the 6-digit code from your {method === "app" ? "authenticator app" : "SMS"}
            </p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5, 6].map((digit) => (
                <Input
                  key={digit}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg"
                  value={otp[digit - 1] || ""}
                  onChange={(e) => {
                    const newOtp = otp.split("");
                    newOtp[digit - 1] = e.target.value;
                    setOtp(newOtp.join(""));
                  }}
                />
              ))}
            </div>
            <UiButton
              variant="ghost"
              size="small"
              onClick={() => toast({ title: "Code resent", description: "A new code has been sent" })}
            >
              Resend Code
            </UiButton>
            <div className="flex gap-2 pt-4">
              <UiButton variant="outline" onClick={() => setStep("setup")} className="flex-1">
                Back
              </UiButton>
              <UiButton
                variant="primary"
                className="gradient-primary flex-1"
                onClick={handleVerify}
                disabled={otp.length !== 6}
              >
                Enable 2FA
              </UiButton>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorAuthModal;

