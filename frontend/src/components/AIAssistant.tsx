import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, TrendingUp, FileText, Megaphone, BarChart3, Mic, MicOff, Waves } from "lucide-react";
import { UiButton } from "./ui/ui-button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { motionVariants } from "@/lib/animations";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const shortcuts = [
    { icon: BarChart3, label: "GST Report", action: "/gst" },
    { icon: TrendingUp, label: "My Sales", action: "/sales" },
    { icon: Megaphone, label: "Start Campaign", action: "/marketing" },
    { icon: FileText, label: "View Invoices", action: "/invoices" },
  ];

  const handleSend = () => {
    if (message.trim()) {
      setIsTyping(true);
      setTranscript(""); // Clear transcript when sending
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
        setMessage("");
      }, 2000);
    }
  };

  const handleShortcut = (action: string) => {
    window.location.href = action;
  };

  const handleVoiceToggle = () => {
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
        setMessage(randomCommand);
        setIsListening(false);
      }, 2000);
    } else {
      setTranscript("");
    }
  };

  return (
    <>
      {/* Chat Bubble with Breathing Animation */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-primary shadow-glow-primary flex items-center justify-center text-white"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? {
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 0 0 rgba(37, 99, 235, 0.7)",
            "0 0 0 10px rgba(37, 99, 235, 0)",
            "0 0 0 0 rgba(37, 99, 235, 0)"
          ]
        } : { rotate: 90 }}
        transition={{ 
          duration: 2,
          repeat: !isOpen ? Infinity : 0,
          ease: "easeInOut"
        }}
        aria-label="Open AI Assistant"
      >
        <motion.div
          animate={!isOpen ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 2, repeat: !isOpen ? Infinity : 0 }}
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.div>
        {!isOpen && (
          <motion.span
            className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Chat Window with Background Blur Effect */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-24 right-6 z-50 w-96 h-[500px]"
            >
              <Card className="glass-dark rounded-2xl border-border/50 h-full flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <motion.div 
                  className="p-4 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-primary/10 to-secondary/10"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="h-5 w-5 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-white">SmartBiz AI</h3>
                      <p className="text-xs text-muted-foreground">Your Shop Companion</p>
                    </div>
                  </div>
                </motion.div>

              {/* Shortcuts */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 border-b border-border/50"
              >
                <p className="text-xs text-muted-foreground mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {shortcuts.map((shortcut, index) => {
                    const Icon = shortcut.icon;
                    return (
                      <motion.div
                        key={shortcut.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <UiButton
                          variant="outline"
                          size="small"
                          className="rounded-full text-xs"
                          icon={<Icon className="h-3 w-3" />}
                          onClick={() => handleShortcut(shortcut.action)}
                        >
                          {shortcut.label}
                        </UiButton>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <motion.div 
                    className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                  </motion.div>
                  <div className="flex-1 bg-card/50 rounded-lg p-3">
                    <p className="text-sm text-foreground">
                      Hi! I'm SmartBiz AI. How can I help you today? I can assist with GST filing, inventory management, or business insights.
                    </p>
                  </div>
                </motion.div>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 bg-card/50 rounded-lg p-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -8, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50">
                {/* Voice Listening Indicator */}
                <AnimatePresence>
                  {isListening && !transcript && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-2 p-2 bg-primary/10 rounded-lg border border-primary/20"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Waves className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-muted-foreground">Listening...</span>
                      </div>
                    </motion.div>
                  )}
                  {transcript && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-2 p-2 bg-primary/10 rounded-lg border border-primary/20"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <Waves className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-muted-foreground">Heard:</span>
                        <span className="font-medium">{transcript}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything or use voice..."
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <UiButton
                      variant={isListening ? "destructive" : "ghost"}
                      size="medium"
                      onClick={handleVoiceToggle}
                      icon={isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      className={isListening ? "gradient-primary" : ""}
                      aria-label={isListening ? "Stop listening" : "Start voice input"}
                    />
                    {isListening && (
                      <motion.span
                        className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <UiButton
                      variant="primary"
                      size="medium"
                      onClick={handleSend}
                      icon={<Send className="h-4 w-4" />}
                      className="gradient-primary"
                      disabled={!message.trim()}
                    />
                  </motion.div>
                </div>
              </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;

