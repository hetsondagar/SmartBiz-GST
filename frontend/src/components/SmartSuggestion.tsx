import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { UiButton } from "./ui/ui-button";

interface SmartSuggestionProps {
  type: "success" | "alert" | "suggestion";
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

const SmartSuggestion = ({ type, message, action, onDismiss }: SmartSuggestionProps) => {
  const icons = {
    success: CheckCircle2,
    alert: AlertCircle,
    suggestion: TrendingUp,
  };

  const colors = {
    success: "from-success/10 to-success/5 border-success/30",
    alert: "from-destructive/10 to-destructive/5 border-destructive/30",
    suggestion: "from-primary/10 to-secondary/5 border-primary/30",
  };

  const Icon = icons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`mb-4 p-4 rounded-xl bg-gradient-to-r ${colors[type]} border glass`}
    >
      <div className="flex items-start gap-3">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-10 h-10 rounded-full ${
            type === "success" ? "bg-success/20" :
            type === "alert" ? "bg-destructive/20" :
            "bg-primary/20"
          } flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`h-5 w-5 ${
            type === "success" ? "text-success" :
            type === "alert" ? "text-destructive" :
            "text-primary"
          }`} />
        </motion.div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
          {action && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2"
            >
              <UiButton
                variant="outline"
                size="small"
                onClick={action.onClick}
              >
                {action.label}
              </UiButton>
            </motion.div>
          )}
        </div>
        {onDismiss && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default SmartSuggestion;

