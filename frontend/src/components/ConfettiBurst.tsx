import { motion, AnimatePresence } from "framer-motion";

interface ConfettiBurstProps {
  show: boolean;
  onComplete?: () => void;
}

const ConfettiBurst = ({ show, onComplete }: ConfettiBurstProps) => {
  const colors = ["#2563EB", "#00B3C6", "#FFD166", "#1FA855"];
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    x: Math.random() * 100,
    y: Math.random() * 50,
    delay: Math.random() * 0.5,
  }));

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confetti.map((item) => (
            <motion.div
              key={item.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: item.color,
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              initial={{ scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                scale: [0, 1, 0.8, 0],
                rotate: [0, 180, 360],
                y: [0, -100 + Math.random() * 100],
                x: [-50 + Math.random() * 100, 50 - Math.random() * 100],
                opacity: [1, 1, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                delay: item.delay,
                times: [0, 0.3, 0.7, 1],
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiBurst;

