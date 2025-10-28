import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UiButton } from "@/components/ui/ui-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Minus, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RecordSaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecordSaleModal = ({ open, onOpenChange }: RecordSaleModalProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    customerType: "walk-in",
    products: [{ name: "", qty: 1, price: 0, discount: 0 }],
    paymentMethod: "cash",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleAddProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: "", qty: 1, price: 0, discount: 0 }],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Sale recorded",
        description: "Sale has been successfully recorded",
      });
      onOpenChange(false);
    }, 1500);
  };

  const total = formData.products.reduce((sum, p) => sum + (p.price * p.qty * (1 - p.discount / 100)), 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass rounded-2xl border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record Sale</DialogTitle>
          <DialogDescription>Enter sale details and print receipt</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="customerType">Customer Type *</Label>
              <Select
                value={formData.customerType}
                onValueChange={(value) => setFormData({ ...formData, customerType: value })}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="walk-in">Walk-in</SelectItem>
                  <SelectItem value="regular">Regular Customer</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Products</Label>
            <div className="space-y-3 mt-2">
              {formData.products.map((product, index) => (
                <div key={index} className="p-3 border border-border/50 rounded-xl bg-muted/30">
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Product name"
                      value={product.name}
                      onChange={(e) => {
                        const newProducts = [...formData.products];
                        newProducts[index].name = e.target.value;
                        setFormData({ ...formData, products: newProducts });
                      }}
                    />
                    <div className="flex items-center gap-1">
                      <UiButton
                        type="button"
                        variant="outline"
                        size="small"
                        onClick={() => {
                          const newProducts = [...formData.products];
                          if (newProducts[index].qty > 1) newProducts[index].qty--;
                          setFormData({ ...formData, products: newProducts });
                        }}
                      >
                        <Minus className="h-3 w-3" />
                      </UiButton>
                      <Input
                        type="number"
                        value={product.qty}
                        onChange={(e) => {
                          const newProducts = [...formData.products];
                          newProducts[index].qty = parseInt(e.target.value) || 1;
                          setFormData({ ...formData, products: newProducts });
                        }}
                        className="w-16 text-center"
                        min={1}
                      />
                      <UiButton
                        type="button"
                        variant="outline"
                        size="small"
                        onClick={() => {
                          const newProducts = [...formData.products];
                          newProducts[index].qty++;
                          setFormData({ ...formData, products: newProducts });
                        }}
                      >
                        <Plus className="h-3 w-3" />
                      </UiButton>
                    </div>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={product.price}
                      onChange={(e) => {
                        const newProducts = [...formData.products];
                        newProducts[index].price = parseFloat(e.target.value) || 0;
                        setFormData({ ...formData, products: newProducts });
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Discount %"
                      value={product.discount}
                      onChange={(e) => {
                        const newProducts = [...formData.products];
                        newProducts[index].discount = parseFloat(e.target.value) || 0;
                        setFormData({ ...formData, products: newProducts });
                      }}
                      max={100}
                    />
                  </div>
                </div>
              ))}
              <UiButton
                type="button"
                variant="outline"
                size="small"
                icon={<Plus className="h-4 w-4" />}
                onClick={handleAddProduct}
              >
                Add Product
              </UiButton>
            </div>
          </div>

          <div>
            <Label htmlFor="paymentMethod">Payment Method *</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              placeholder="Additional notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-2"
            />
          </div>

          <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total Amount:</span>
              <span className="text-2xl font-bold">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <UiButton
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </UiButton>
            <UiButton
              type="button"
              variant="outline"
              className="flex-1"
            >
              Save & Print Receipt
            </UiButton>
            <UiButton
              type="submit"
              variant="primary"
              className="gradient-primary flex-1"
              loading={isSubmitting}
            >
              Save Sale
            </UiButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RecordSaleModal;

