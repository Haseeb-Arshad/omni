import type { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { ArrowRight, MessageSquare, Bot, Zap, Shield, Globe, Users, Star, CheckCircle, Play } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "OmniAgent - Omni-Channel AI Platform" },
    { name: "description", content: "Connect all your communication channels with intelligent AI agents. Automate conversations, enhance customer experience, and scale your support effortlessly." },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OA</span>
            </div>
            <span className="text-xl font-bold text-gray-900">OmniAgent</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/auth/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/auth/register" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">Trusted by 10,000+ businesses</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Omni-Channel
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}AI Platform
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect all your communication channels with intelligent AI agents. 
                Automate conversations, enhance customer experience, and scale your support effortlessly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/auth/register" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-200">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">WhatsApp Integration</h3>
                      <p className="text-sm text-gray-600">Connected & Active</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          Hi! I'm your AI assistant. How can I help you today? 😊
                        </p>
                        <span className="text-xs text-gray-500">Just now</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">94%</div>
                      <div className="text-xs text-blue-600">Resolution Rate</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">1.2s</div>
                      <div className="text-xs text-green-600">Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything you need for omni-channel AI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features to connect, automate, and optimize your customer communications across all platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Multi-Channel Support",
                description: "Connect WhatsApp, Telegram, Discord, Slack, and more in one unified platform",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Bot,
                title: "Intelligent AI Agents",
                description: "Deploy smart AI agents with custom personalities and knowledge bases",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Zap,
                title: "Real-time Automation",
                description: "Automate responses and workflows with lightning-fast AI processing",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security with end-to-end encryption and compliance",
                color: "from-red-500 to-red-600"
              },
              {
                icon: Globe,
                title: "Global Scale",
                description: "Handle millions of conversations across multiple languages and regions",
                color: "from-purple-500 to-purple-600"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Seamless handoffs between AI agents and human team members",
                color: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "10,000+", label: "Active Users" },
              { number: "50M+", label: "Messages Processed" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to transform your customer communications?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join thousands of businesses already using OmniAgent to automate and enhance their customer experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auth/register" 
                className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-medium text-lg inline-flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-200">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">OA</span>
            </div>
            <span className="text-xl font-bold text-white">OmniAgent</span>
          </div>
          <p className="text-gray-400 mb-6">
            The future of omni-channel customer communication is here.
          </p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}