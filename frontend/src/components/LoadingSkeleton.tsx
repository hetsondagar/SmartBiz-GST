import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = ({ className = "" }: LoadingSkeletonProps) => {
  return (
    <div className={`relative overflow-hidden bg-muted/30 rounded-xl ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: "50%",
          height: "100%",
        }}
      />
    </div>
  );
};

export const CardSkeleton = () => (
  <div className="space-y-3">
    <LoadingSkeleton className="h-4 w-3/4" />
    <LoadingSkeleton className="h-8 w-full" />
    <LoadingSkeleton className="h-4 w-1/2" />
  </div>
);

export const TableSkeleton = () => (
  <div className="space-y-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <LoadingSkeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);

export default LoadingSkeleton;

