import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Waves } from "lucide-react";
import { UiButton } from "./ui/ui-button";

interface VoiceCommandProps {
  onCommand?: (command: string) => void;
}

const VoiceCommand = ({ onCommand }: VoiceCommandProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const handleToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const commands = [
          "Show my top selling product",
          "Open GST filing",
          "Show sales report",
          "Add a new product",
        ];
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        setTranscript(randomCommand);
        onCommand?.(randomCommand);
      }, 2000);
    } else {
      setTranscript("");
    }
  };

  return (
    <div className="fixed bottom-24 left-6 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <UiButton
            variant={isListening ? "destructive" : "primary"}
            size="large"
            className={`rounded-full w-14 h-14 ${isListening ? "gradient-primary" : ""}`}
            onClick={handleToggle}
            icon={isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          />
        </motion.div>

        {isListening && (
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {isListening && (
          <motion.div
            className="absolute top-full left-0 mt-4 p-3 bg-card rounded-xl shadow-lg border border-border min-w-[200px]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Waves className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-xs font-medium">Listening...</span>
            </div>
            {transcript && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm"
              >
                "{transcript}"
              </motion.p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default VoiceCommand;

