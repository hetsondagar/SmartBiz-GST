import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, Filter, FileText, TrendingUp, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const invoices = [
  {
    id: "INV-2025-001",
    customer: "Kiran General Store",
    customerPhone: "+91 98765 43210",
    date: "2025-01-15",
    amount: 12500,
    gst: 1125,
    total: 13625,
    status: "Paid",
    paymentMethod: "UPI",
    items: 15,
  },
  {
    id: "INV-2025-002",
    customer: "Rajesh Kumar",
    customerPhone: "+91 98765 43211",
    date: "2025-01-15",
    amount: 5600,
    gst: 504,
    total: 6104,
    status: "Paid",
    paymentMethod: "Cash",
    items: 8,
  },
  {
    id: "INV-2025-003",
    customer: "Anita's Supermarket",
    customerPhone: "+91 98765 43212",
    date: "2025-01-14",
    amount: 18900,
    gst: 1701,
    total: 20601,
    status: "Pending",
    paymentMethod: "Bank Transfer",
    items: 22,
  },
  {
    id: "INV-2025-004",
    customer: "Walk-in Customer",
    customerPhone: "-",
    date: "2025-01-14",
    amount: 890,
    gst: 80,
    total: 970,
    status: "Paid",
    paymentMethod: "Card",
    items: 3,
  },
  {
    id: "INV-2025-005",
    customer: "Patel Kirana Store",
    customerPhone: "+91 98765 43213",
    date: "2025-01-13",
    amount: 23400,
    gst: 2106,
    total: 25506,
    status: "Paid",
    paymentMethod: "UPI",
    items: 28,
  },
];

const Invoices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  const statuses = ["all", "Paid", "Pending"];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (searchQuery === "" ||
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.customer.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === "all" || invoice.status === filterStatus)
  );

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.total, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.total, 0);

  const handleDownload = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceId} is being downloaded.`,
    });
  };

  const handleView = (invoiceId: string) => {
    toast({
      title: "Invoice Details",
      description: `Viewing details for invoice ${invoiceId}`,
    });
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Invoices</h1>
          <p className="text-muted-foreground">View and manage all your invoices</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.06 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="hover-lift"
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <TrendingUp className="h-5 w-5 text-success" />
                </div>
                <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground mt-1">From all paid invoices</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.12 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="hover-lift"
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Pending Amount</p>
                  <FileText className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold">₹{pendingAmount.toLocaleString("en-IN")}</p>
                <p className="text-xs text-muted-foreground mt-1">Awaiting payment</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.18 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="hover-lift"
          >
            <Card className="glass rounded-2xl border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Invoices</p>
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <p className="text-3xl font-bold">{invoices.length}</p>
                <p className="text-xs text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by invoice ID or customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search invoices"
            />
          </div>
          <div className="flex gap-2">
            {statuses.map((status) => (
              <UiButton
                key={status}
                variant={filterStatus === status ? "primary" : "outline"}
                size="medium"
                onClick={() => setFilterStatus(status)}
                className={filterStatus === status ? "shadow-glow-primary" : ""}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </UiButton>
            ))}
          </div>
        </div>

        {/* Invoice List */}
        <Card className="glass rounded-2xl border-border/50">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, delay: index * 0.06 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors border border-border/50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{invoice.id}</h3>
                        <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                      </div>
                      <Badge
                        className={
                          invoice.status === "Paid"
                            ? "bg-success/20 text-success border-success/30 rounded-full"
                            : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30 rounded-full"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground ml-8">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {invoice.date}
                      </span>
                      <span>{invoice.items} items</span>
                      <span>{invoice.paymentMethod}</span>
                    </div>
                  </div>
                  <div className="text-right mr-4">
                    <p className="text-2xl font-bold mb-1">₹{invoice.total.toLocaleString("en-IN")}</p>
                    <p className="text-xs text-muted-foreground">GST: ₹{invoice.gst.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton
                        variant="outline"
                        size="small"
                        onClick={() => handleView(invoice.id)}
                        icon={<Eye className="h-3 w-3" />}
                      >
                        View
                      </UiButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <UiButton
                        variant="ghost"
                        size="small"
                        onClick={() => handleDownload(invoice.id)}
                        icon={<Download className="h-3 w-3" />}
                      >
                        Download
                      </UiButton>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Invoices;

