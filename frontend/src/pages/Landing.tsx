import { motion } from "framer-motion";
import { UiButton } from "@/components/ui/ui-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  FileText, 
  Users, 
  ShoppingCart,
  Package,
  BarChart3,
  Megaphone,
  Building2,
  Sparkles,
  Upload,
  Award,
  Shield,
  Zap,
  Star,
  IndianRupee
} from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: FileText,
      title: "Smart GST Management",
      description: "Automated GST filing with OCR bill scanning. Stay compliant effortlessly.",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-500"
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track stock levels, set alerts, and manage products with ease.",
      color: "from-green-500/20 to-emerald-500/20",
      iconColor: "text-green-500"
    },
    {
      icon: ShoppingCart,
      title: "Sales Tracking",
      description: "Monitor daily sales, generate invoices, and analyze revenue trends.",
      color: "from-purple-500/20 to-pink-500/20",
      iconColor: "text-purple-500"
    },
    {
      icon: Megaphone,
      title: "Marketing Tools",
      description: "Promote products with targeted campaigns and track performance.",
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-500"
    },
    {
      icon: Users,
      title: "Business Network",
      description: "Connect with suppliers, wholesalers, and retailers in your area.",
      color: "from-teal-500/20 to-cyan-500/20",
      iconColor: "text-teal-500"
    },
    {
      icon: BarChart3,
      title: "Market Insights",
      description: "AI-powered insights on trending products and market opportunities.",
      color: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-500"
    },
    {
      icon: Building2,
      title: "Business Building",
      description: "Plan new ventures with AI-powered business intelligence.",
      color: "from-yellow-500/20 to-amber-500/20",
      iconColor: "text-yellow-500"
    },
    {
      icon: Sparkles,
      title: "AI Assistant",
      description: "Get instant help with voice commands and smart suggestions.",
      color: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-500"
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Businesses", icon: Users },
    { value: "₹50Cr+", label: "GST Filed", icon: FileText },
    { value: "95%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "AI Support", icon: Sparkles }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      store: "Rajesh General Store, Bangalore",
      text: "SmartBiz GST made GST filing so simple. Now I focus on growing my business!",
      rating: 5
    },
    {
      name: "Anita Sharma",
      store: "Anita's Supermarket, Mumbai",
      text: "The inventory management and AI insights help me stock the right products.",
      rating: 5
    },
    {
      name: "Mukesh Patel",
      store: "Patel Kirana Store, Delhi",
      text: "Best platform for connecting with suppliers. My business network has grown 3x!",
      rating: 5
    }
  ];

  const benefits = [
    { icon: Shield, text: "Bank-level Security" },
    { icon: Zap, text: "Lightning Fast" },
    { icon: Award, text: "GST Compliant" },
    { icon: IndianRupee, text: "Cost Effective" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-2xl font-bold"
          >
            <motion.img
              src="/logo.png"
              alt="SmartBiz GST Logo"
              className="h-8 w-8 object-contain"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SmartBiz GST
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-3"
          >
            <Link to="/login">
              <UiButton variant="ghost" size="medium" aria-label="Login">
                Login
              </UiButton>
            </Link>
            <Link to="/signup">
              <UiButton variant="primary" size="medium" className="gradient-primary hover:shadow-glow-primary transition-all" aria-label="Sign up">
                Sign up
              </UiButton>
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[680px]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block mb-6"
              >
                <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1">
                  <Sparkles className="h-3 w-3 mr-2 inline" />
                  AI-Powered Business Management
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                  Manage Your Business
                </span>
                <br />
                <span className="text-foreground">Like a Pro</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Complete GST management, inventory tracking, sales analytics, and local business networking - all in one simple platform designed for Indian shopkeepers.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 mb-8"
              >
                <Link to="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <UiButton
                    variant="primary"
                    size="large"
                    icon={<ArrowRight className="h-5 w-5" />}
                    iconPosition="right"
                      className="gradient-primary hover:shadow-glow-primary transition-all w-full sm:w-auto"
                  >
                      Start Free Trial
                  </UiButton>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <UiButton
                  variant="outline"
                  size="large"
                    className="w-full sm:w-auto hover:border-primary transition-all"
                >
                    Watch Demo
                </UiButton>
                </motion.div>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-2 gap-4"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <benefit.icon className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{benefit.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Landing Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src="/landing_image.png"
                  alt="SmartBiz GST Platform"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.div
                  className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-glow-primary"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity }
                  }}
                >
                  <Sparkles className="h-10 w-10 text-white" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="text-center"
              >
                <motion.div
                  className="flex justify-center mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </motion.div>
                <motion.p
                  className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything You Need to Grow
          </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Powerful features designed for Indian businesses
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="hover-lift"
              >
                <Card className="glass rounded-2xl border-border/50 h-full overflow-hidden relative group cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <CardContent className="p-6 relative z-10">
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl font-bold mb-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Trusted by Shopkeepers Across India
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              See what our users say
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.03, y: -8, rotateY: 2 }}
                className="hover-lift"
                style={{ perspective: 1000 }}
              >
                <Card className="glass rounded-2xl border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.store}</p>
                </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="glass rounded-2xl border border-border/50 p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 opacity-50" />
            <div className="relative z-10">
              <motion.h2
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Ready to Transform Your Business?
              </motion.h2>
              <p className="text-xl text-muted-foreground mb-8">Join thousands of shopkeepers managing their business smarter</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
            <Link to="/signup">
              <UiButton
                    variant="primary"
                size="large"
                icon={<CheckCircle className="h-5 w-5" />}
                    className="gradient-primary hover:shadow-glow-primary transition-all"
              >
                    Start Free Trial
              </UiButton>
            </Link>
              </motion.div>
              <p className="text-sm text-muted-foreground mt-4">No credit card required • Setup in 5 minutes</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="SmartBiz GST Logo" className="h-6 w-6 object-contain" />
              <span className="text-sm font-medium">SmartBiz GST</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">&copy; 2025 SmartBiz GST. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
