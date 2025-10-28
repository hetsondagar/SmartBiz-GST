import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessAnimationProps {
  show: boolean;
  message?: string;
  onComplete?: () => void;
}

const SuccessAnimation = ({ show, message = "Success!", onComplete }: SuccessAnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onAnimationComplete={onComplete}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      <motion.div
        className="bg-card rounded-2xl p-8 shadow-2xl border border-border/50 glass text-center"
        animate={show ? {
          scale: [0.8, 1.1, 1],
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ pathLength: 0 }}
          animate={show ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CheckCircle2 className="h-16 w-16 text-success mx-auto mb-4" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="font-semibold text-lg"
        >
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessAnimation;

