import { motion } from "framer-motion";

interface AnimatedGradientProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedGradient = ({ children, className = "" }: AnimatedGradientProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: "linear-gradient(135deg, #2563EB 0%, #00B3C6 50%, #2563EB 100%)",
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedGradient;

