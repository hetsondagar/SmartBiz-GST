import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UiButton } from "@/components/ui/ui-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import onboardingIllustration from "@/assets/onboarding-illustration.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    businessName: "",
    businessType: "",
    category: "",
    ownershipType: "sole_proprietorship",
    address: "",
    mobile: "",
    email: "",
    password: "",
    gstNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const passwordStrength = (): { score: number; text: string; color: string } => {
    const { password } = formData;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { score, text: "Weak", color: "bg-destructive" };
    if (score === 3) return { score, text: "Medium", color: "bg-yellow-500" };
    return { score, text: "Strong", color: "bg-success" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Welcome to SmartBiz GST. +10 reward points earned.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const strength = passwordStrength();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="w-full max-w-2xl py-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="SmartBiz GST Logo" className="h-10 w-10 object-contain" />
            <div>
              <h1 className="text-3xl font-bold">Create your account</h1>
              <p className="text-muted-foreground">Start managing your business smarter</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Owner & Business Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.06 }}
              >
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Your full name"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  required
                  aria-label="Owner name"
                  className="mt-2"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.12 }}
              >
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Your business name"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  aria-label="Business name"
                  className="mt-2"
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.18 }}
              >
                <Label htmlFor="businessType">Type of Business *</Label>
                <Select value={formData.businessType} onValueChange={(value) => setFormData({ ...formData, businessType: value })}>
                  <SelectTrigger className="mt-2" aria-label="Type of business">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.24 }}
              >
                <Label htmlFor="category">Business Category *</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="mt-2" aria-label="Business category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grocery">Grocery</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.3 }}
            >
              <Label>Ownership Type *</Label>
              <RadioGroup
                value={formData.ownershipType}
                onValueChange={(value) => setFormData({ ...formData, ownershipType: value })}
                className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { value: "sole_proprietorship", label: "Sole Proprietorship" },
                  { value: "partnership", label: "Partnership" },
                  { value: "llp", label: "LLP" },
                  { value: "pvt_ltd", label: "Pvt. Ltd." },
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.36 }}
            >
              <Label htmlFor="address">Store Address *</Label>
              <Input
                id="address"
                placeholder="Full store address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                aria-label="Store address"
                className="mt-2"
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.42 }}
              >
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  aria-label="Mobile number"
                  className="mt-2"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.48 }}
              >
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  aria-label="Email address"
                  className="mt-2"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.54 }}
            >
              <Label htmlFor="password">Password *</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  aria-label="Password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${strength.color}`}
                        style={{ width: `${(strength.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{strength.text}</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className={formData.password.length >= 8 ? "text-success flex items-center gap-1" : "flex items-center gap-1"}>
                      {formData.password.length >= 8 && <Check className="h-3 w-3" />}
                      Minimum 8 characters
                    </li>
                    <li className={/[0-9]/.test(formData.password) ? "text-success flex items-center gap-1" : "flex items-center gap-1"}>
                      {/[0-9]/.test(formData.password) && <Check className="h-3 w-3" />}
                      Contains a number
                    </li>
                    <li className={/[a-zA-Z]/.test(formData.password) ? "text-success flex items-center gap-1" : "flex items-center gap-1"}>
                      {/[a-zA-Z]/.test(formData.password) && <Check className="h-3 w-3" />}
                      Contains a letter
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.6 }}
            >
              <Label htmlFor="gstNumber">GST Number (Optional)</Label>
              <Input
                id="gstNumber"
                placeholder="15-digit GST number"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                aria-label="GST number"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">You can add this later</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, delay: 0.66 }}
            >
              <UiButton
                type="submit"
                variant="primary"
                size="large"
                className="w-full"
                loading={isLoading}
                aria-label="Create account"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </UiButton>
            </motion.div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.42, delay: 0.72 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Right side - Illustration & Tips */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.42, delay: 0.2 }}
        className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center p-12"
      >
        <div className="max-w-md">
          <img src={onboardingIllustration} alt="Business onboarding" className="w-full mb-8 rounded-xl" />
          <h2 className="text-2xl font-bold mb-4">Join thousands of local businesses</h2>
          <ul className="space-y-3">
            {[
              "Automated GST filing and compliance",
              "Real-time inventory and sales tracking",
              "Connect with local suppliers",
              "AI-powered business insights",
            ].map((tip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.42, delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-2 text-muted-foreground"
              >
                <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span>{tip}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
