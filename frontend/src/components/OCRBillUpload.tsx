import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/ui-button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OCRBillUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OCRBillUpload = ({ open, onOpenChange }: OCRBillUploadProps) => {
  const [step, setStep] = useState<"upload" | "processing" | "review" | "complete">("upload");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [ocrResults, setOcrResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStep("processing");
      simulateOCR();
    }
  };

  const simulateOCR = () => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        // Simulate OCR results
        setOcrResults([
          { product: "Rice (25kg)", qty: 2, price: 1200, gst: 5, confidence: 0.95 },
          { product: "Cooking Oil (1L)", qty: 5, price: 120, gst: 5, confidence: 0.88 },
          { product: "Sugar (1kg)", qty: 10, price: 40, gst: 5, confidence: 0.92 },
        ]);
        setStep("review");
      }
    }, 300);
  };

  const handleConfirmImport = () => {
    toast({
      title: "Bills imported successfully",
      description: `${ocrResults.length} items added to your inventory`,
    });
    setStep("complete");
    setTimeout(() => {
      onOpenChange(false);
      setStep("upload");
      setProgress(0);
      setFile(null);
      setOcrResults([]);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass rounded-2xl border-border/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Upload Purchase Bill
          </DialogTitle>
          <DialogDescription>
            Upload a bill to automatically extract product details using OCR
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">Drop your bill here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports PDF, JPG, PNG formats
                </p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="bill-upload"
                />
                <label htmlFor="bill-upload">
                  <UiButton variant="primary" size="medium" className="cursor-pointer">
                    Choose File
                  </UiButton>
                </label>
              </div>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4"
            >
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="font-medium mb-2">Processing your bill...</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Extracting product details using AI
                </p>
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
              </div>
            </motion.div>
          )}

          {step === "review" && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Review extracted items. Click any row to edit details.
              </p>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {ocrResults.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border ${
                      item.confidence < 0.6
                        ? "border-yellow-500/50 bg-yellow-500/5"
                        : "border-border/50 bg-muted/30"
                    }`}
                  >
                    {item.confidence < 0.6 && (
                      <div className="flex items-center gap-2 mb-2 text-yellow-600">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">Low confidence - Review recommended</span>
                      </div>
                    )}
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Product</p>
                        <p className="font-medium">{item.product}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Qty</p>
                        <p className="font-medium">{item.qty}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-medium">₹{item.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">GST%</p>
                        <p className="font-medium">{item.gst}%</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex gap-2 pt-4">
                <UiButton variant="outline" onClick={() => { setStep("upload"); setOcrResults([]); }}>
                  Re-upload
                </UiButton>
                <UiButton
                  variant="primary"
                  className="gradient-primary flex-1"
                  onClick={handleConfirmImport}
                >
                  Confirm Import
                </UiButton>
              </div>
            </motion.div>
          )}

          {step === "complete" && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
              </motion.div>
              <p className="font-semibold text-lg mb-2">Bill imported successfully!</p>
              <p className="text-sm text-muted-foreground">
                {ocrResults.length} products have been added to your inventory
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default OCRBillUpload;

