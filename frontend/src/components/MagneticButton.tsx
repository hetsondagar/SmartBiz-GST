import { motion } from "framer-motion";
import { UiButton, UiButtonProps } from "./ui/ui-button";
import { useState } from "react";

interface MagneticButtonProps extends UiButtonProps {
  magneticStrength?: number;
  rippleColor?: string;
}

const MagneticButton = ({ 
  magneticStrength = 8, 
  rippleColor = "rgba(255, 255, 255, 0.5)",
  onClick,
  className = "",
  ...props 
}: MagneticButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x, y });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipples([...ripples, { x, y, id: Date.now() }]);
    setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 600);

    onClick?.(e);
  };

  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ 
        x: mousePosition.x * (magneticStrength / 100),
        y: mousePosition.y * (magneticStrength / 100),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      <UiButton
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
        {...props}
      >
        {props.children}
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              background: rippleColor,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [0, 4],
              opacity: [0.6, 0],
            }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </UiButton>
    </motion.div>
  );
};

export default MagneticButton;

