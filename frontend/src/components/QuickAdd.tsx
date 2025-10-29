import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UiButton } from "@/components/ui/ui-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Upload, 
  Clock, 
  Image as ImageIcon, 
  Tag, 
  DollarSign,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Calendar,
  Package,
  Megaphone
} from "lucide-react";
import { motionVariants } from "@/lib/animations";

interface QuickAddProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: QuickAddFormData) => void;
}

interface QuickAddFormData {
  title: string;
  description: string;
  category: string;
  duration: number;
  productType: "promotion" | "request";
  priceRange?: string;
  images: File[];
  designPreference: string;
}

const categories = [
  "Groceries",
  "Electronics", 
  "Clothing",
  "Home & Garden",
  "Health & Beauty",
  "Automotive",
  "Books & Media",
  "Sports & Fitness",
  "Food & Beverages",
  "Other"
];

const designPreferences = [
  "Minimal",
  "Modern", 
  "Poster",
  "Animated"
];

const QuickAdd = ({ isOpen, onClose, onSubmit }: QuickAddProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<QuickAddFormData>({
    title: "",
    description: "",
    category: "",
    duration: 7,
    productType: "promotion",
    priceRange: "",
    images: [],
    designPreference: "Modern"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof QuickAddFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + formData.images.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSubmit?.(formData);
      onClose();
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        duration: 7,
        productType: "promotion",
        priceRange: "",
        images: [],
        designPreference: "Modern"
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Error submitting quick add:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title.trim() && formData.description.trim();
      case 2:
        return formData.category && formData.productType;
      case 3:
        return formData.duration >= 1 && formData.duration <= 7;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="glass rounded-2xl border-border/50 overflow-hidden">
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 5, scale: 1.05 }}
                  >
                    <Sparkles className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-xl">Quick Add</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Create temporary product listings or promotions
                    </p>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <UiButton
                    variant="ghost"
                    size="small"
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </UiButton>
                </motion.div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">What would you like to add?</h3>
                      <p className="text-sm text-muted-foreground">
                        Tell us about your product or promotion
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title" className="text-sm font-medium">
                          Product / Offer Title *
                        </Label>
                        <Input
                          id="title"
                          placeholder="e.g., Mango Juice - Summer Offer"
                          value={formData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description *
                        </Label>
                        <Textarea
                          id="description"
                          placeholder="Explain why you want to add this product or promotion..."
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          className="mt-1 min-h-[100px]"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Category and Type */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">Category & Type</h3>
                      <p className="text-sm text-muted-foreground">
                        Help us categorize your listing
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => handleInputChange("category", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Choose a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Product Type *</Label>
                        <RadioGroup
                          value={formData.productType}
                          onValueChange={(value) => handleInputChange("productType", value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="promotion" id="promotion" />
                            <Label htmlFor="promotion" className="flex items-center gap-2 cursor-pointer">
                              <Megaphone className="h-4 w-4 text-orange-500" />
                              Promotion (I want to promote an existing product)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="request" id="request" />
                            <Label htmlFor="request" className="flex items-center gap-2 cursor-pointer">
                              <Package className="h-4 w-4 text-blue-500" />
                              New Product Request (I want to request a new product)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.productType === "request" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="priceRange" className="text-sm font-medium">
                            Expected Price Range (Optional)
                          </Label>
                          <Input
                            id="priceRange"
                            placeholder="e.g., ₹50-100, Under ₹200"
                            value={formData.priceRange}
                            onChange={(e) => handleInputChange("priceRange", e.target.value)}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Duration and Settings */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">Duration & Settings</h3>
                      <p className="text-sm text-muted-foreground">
                        How long should this listing be active?
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="duration" className="text-sm font-medium">
                          Duration (1-7 days) *
                        </Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Input
                            id="duration"
                            type="number"
                            min="1"
                            max="7"
                            value={formData.duration}
                            onChange={(e) => handleInputChange("duration", parseInt(e.target.value))}
                            className="w-20"
                          />
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>days</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Maximum 7 days for temporary listings
                        </p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Design Preference</Label>
                        <Select
                          value={formData.designPreference}
                          onValueChange={(value) => handleInputChange("designPreference", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {designPreferences.map((pref) => (
                              <SelectItem key={pref} value={pref}>
                                {pref}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">Important Notes:</p>
                          <ul className="text-muted-foreground space-y-1">
                            <li>• Your listing will be automatically removed after the selected duration</li>
                            <li>• You can extend the duration before it expires</li>
                            <li>• All listings are subject to approval</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Images */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">Add Images</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload up to 3 product photos (optional but recommended)
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 text-center">
                        <input
                          type="file"
                          id="imageUpload"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="imageUpload"
                          className="cursor-pointer flex flex-col items-center gap-2"
                        >
                          <motion.div
                            className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-medium">Click to upload images</p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG up to 10MB each
                            </p>
                          </div>
                        </label>
                      </div>

                      {formData.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {formData.images.map((image, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="relative group"
                            >
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-20 object-cover rounded-lg"
                              />
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-green-800 mb-1">Ready to submit!</p>
                          <p className="text-green-700">
                            Your quick add will be reviewed and approved within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <UiButton
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="min-w-[100px]"
                  >
                    Previous
                  </UiButton>
                </motion.div>

                <div className="flex gap-3">
                  {currentStep < totalSteps ? (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <UiButton
                        variant="primary"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                        className="min-w-[100px] gradient-primary hover:shadow-glow-primary"
                      >
                        Next
                      </UiButton>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <UiButton
                        variant="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="min-w-[100px] gradient-primary hover:shadow-glow-primary"
                        icon={isSubmitting ? undefined : <Sparkles className="h-4 w-4" />}
                      >
                        {isSubmitting ? "Submitting..." : "Quick Add"}
                      </UiButton>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickAdd;
