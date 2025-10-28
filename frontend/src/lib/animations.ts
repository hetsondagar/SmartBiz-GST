import { Variants } from "framer-motion";

// Motion variants for consistent animations across the app
export const motionVariants = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
  },

  // Modal transitions
  modalTransition: {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },

  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  } as Variants,

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  } as Variants,

  // Magnetic hover effect for buttons
  magneticHover: {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.98 }
  } as Variants,

  // Ripple effect
  ripple: {
    initial: { scale: 0, opacity: 0.6 },
    animate: { scale: 4, opacity: 0 },
    transition: { duration: 0.6 }
  } as Variants,

  // Breathing animation for AI assistant
  breathing: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Chart drawing animation
  chartDraw: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  } as Variants,

  // Floating animation
  floating: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Pulse glow
  pulseGlow: {
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(37, 99, 235, 0.7)",
        "0 0 0 10px rgba(37, 99, 235, 0)",
        "0 0 0 0 rgba(37, 99, 235, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  } as Variants,

  // Success checkmark
  checkmark: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    }
  } as Variants,

  // Confetti burst
  confetti: {
    initial: { scale: 0, rotate: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0.8],
      rotate: [0, 180 * (i % 2 === 0 ? 1 : -1), 360 * (i % 2 === 0 ? 1 : -1)],
      y: [0, -100 + (i * 10)],
      x: [-50 + (i * 10), 50 - (i * 5), 0],
      opacity: [1, 1, 0],
      transition: {
        duration: 1,
        times: [0, 0.5, 1],
        delay: i * 0.05
      }
    })
  } as Variants
};

// Spring configurations
export const springConfig = {
  gentle: { type: "spring", stiffness: 200, damping: 20 },
  snappy: { type: "spring", stiffness: 400, damping: 25 },
  bouncy: { type: "spring", stiffness: 300, damping: 15 },
  smooth: { type: "spring", stiffness: 100, damping: 20 }
};

