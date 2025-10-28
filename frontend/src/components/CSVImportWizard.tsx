import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/ui-button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, AlertCircle, Table } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CSVImportWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CSVImportWizard = ({ open, onOpenChange }: CSVImportWizardProps) => {
  const [step, setStep] = useState<"upload" | "map" | "preview" | "importing" | "complete">("upload");
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = () => {
    setStep("map");
  };

  const handleMapFields = () => {
    setStep("preview");
  };

  const handleConfirmImport = () => {
    setStep("importing");
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStep("complete");
        setTimeout(() => {
          onOpenChange(false);
          setStep("upload");
          setProgress(0);
        }, 2000);
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass rounded-2xl border-border/50 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Import Products from CSV
          </DialogTitle>
          <DialogDescription>
            Upload CSV file to bulk import products
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
                <p className="font-medium mb-2">Drop your CSV file here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Format: Product Name, SKU, Category, Buying Price, Selling Price, Qty, GST%
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label htmlFor="csv-upload">
                  <UiButton variant="primary" size="medium" className="cursor-pointer gradient-primary">
                    Choose CSV File
                  </UiButton>
                </label>
              </div>
            </motion.div>
          )}

          {step === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Map CSV columns to product fields
              </p>
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl">
                {[
                  { field: "Product Name", csv: "Name" },
                  { field: "SKU", csv: "SKU" },
                  { field: "Category", csv: "Category" },
                  { field: "Buying Price", csv: "Buy Price" },
                  { field: "Selling Price", csv: "Sell Price" },
                  { field: "Quantity", csv: "Qty" },
                ].map((mapping, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-background rounded-lg">
                    <span className="text-sm font-medium">{mapping.field}</span>
                    <span className="text-sm text-muted-foreground">→</span>
                    <span className="text-sm text-primary">{mapping.csv}</span>
                  </div>
                ))}
              </div>
              <UiButton
                variant="primary"
                className="gradient-primary w-full"
                onClick={handleMapFields}
              >
                Continue to Preview
              </UiButton>
            </motion.div>
          )}

          {step === "preview" && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-sm text-muted-foreground">
                Preview first 10 rows (editable)
              </p>
              <div className="max-h-[300px] overflow-y-auto border border-border/50 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 sticky top-0">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">SKU</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((row) => (
                      <tr key={row} className="border-t border-border/50">
                        <td className="p-2">Sample Product {row}</td>
                        <td className="p-2">SKU00{row}</td>
                        <td className="p-2">₹{100 * row}</td>
                        <td className="p-2">{10 * row}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-2">
                <UiButton variant="outline" onClick={() => setStep("map")}>
                  Back
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

          {step === "importing" && (
            <motion.div
              key="importing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 text-center py-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
              />
              <p className="font-medium mb-2">Importing products...</p>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">{progress}% complete</p>
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
              <p className="font-semibold text-lg mb-2">Import completed!</p>
              <p className="text-sm text-muted-foreground">
                50 products have been added to your store
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportWizard;

