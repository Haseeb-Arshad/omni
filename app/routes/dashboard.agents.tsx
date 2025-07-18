import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  Bot, 
  Plus,
  Settings,
  Activity,
  Zap,
  Brain,
  MessageSquare,
  Clock,
  TrendingUp,
  Play,
  Pause,
  MoreHorizontal,
  Star
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

// Mock agents data
const agents = [
  {
    id: '1',
    name: 'Customer Support AI',
    description: 'Handles general customer inquiries and support tickets',
    status: 'active',
    conversations: 456,
    successRate: 94,
    avgResponseTime: '1.2s',
    personality: 'Professional & Helpful',
    channels: ['WhatsApp', 'Telegram', 'Discord'],
    lastActive: '2 min ago',
    avatar: '🤖'
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Qualifies leads and assists with product inquiries',
    status: 'active',
    conversations: 234,
    successRate: 87,
    avgResponseTime: '0.8s',
    personality: 'Friendly & Persuasive',
    channels: ['WhatsApp', 'Slack'],
    lastActive: '5 min ago',
    avatar: '💼'
  },
  {
    id: '3',
    name: 'Technical Support',
    description: 'Provides technical assistance and troubleshooting',
    status: 'paused',
    conversations: 189,
    successRate: 91,
    avgResponseTime: '2.1s',
    personality: 'Technical & Patient',
    channels: ['Discord', 'Slack'],
    lastActive: '1 hour ago',
    avatar: '🔧'
  },
  {
    id: '4',
    name: 'Onboarding Guide',
    description: 'Helps new users get started with the platform',
    status: 'active',
    conversations: 123,
    successRate: 96,
    avgResponseTime: '1.5s',
    personality: 'Welcoming & Informative',
    channels: ['WhatsApp', 'Telegram'],
    lastActive: '10 min ago',
    avatar: '🎯'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Play className="h-4 w-4 text-green-500" />;
    case 'paused':
      return <Pause className="h-4 w-4 text-yellow-500" />;
    default:
      return <Pause className="h-4 w-4 text-gray-500" />;
  }
};

const getChannelColor = (channel: string) => {
  switch (channel) {
    case 'WhatsApp':
      return 'bg-green-500';
    case 'Telegram':
      return 'bg-blue-500';
    case 'Discord':
      return 'bg-indigo-500';
    case 'Slack':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};

export default function AgentsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="AI Agents"
        subtitle="Manage your intelligent conversation agents and their performance"
        action={
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg flex items-center transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Create Agent
          </button>
        }
      />

      {/* Agent Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +1
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4</h3>
          <p className="text-sm text-gray-600">Total Agents</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              75%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3</h3>
          <p className="text-sm text-gray-600">Active Now</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +23%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1,002</h3>
          <p className="text-sm text-gray-600">Conversations</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +5%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">92%</h3>
          <p className="text-sm text-gray-600">Avg Success Rate</p>
        </div>
      </motion.div>

      {/* Agents Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
          >
            {/* Agent Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                  <span className="text-2xl">{agent.avatar}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{agent.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(agent.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Agent Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="text-lg font-bold text-gray-900">{agent.conversations}</span>
                </div>
                <p className="text-xs text-gray-600">Conversations</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-bold text-gray-900">{agent.successRate}%</span>
                </div>
                <p className="text-xs text-gray-600">Success Rate</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-bold text-gray-900">{agent.avgResponseTime}</span>
                </div>
                <p className="text-xs text-gray-600">Response Time</p>
              </div>
            </div>

            {/* Agent Details */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Personality</span>
                <span className="text-sm font-medium text-gray-900">{agent.personality}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-sm text-gray-600">Channels</span>
                <div className="flex space-x-1">
                  {agent.channels.map((channel) => (
                    <div
                      key={channel}
                      className={`w-3 h-3 ${getChannelColor(channel)} rounded-full`}
                      title={channel}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Active</span>
                <span className="text-sm font-medium text-gray-900">{agent.lastActive}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Activity className="h-4 w-4 mr-1" />
                View Analytics
              </button>
              <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                <Settings className="h-4 w-4 mr-1" />
                Configure
              </button>
              <button className="px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center">
                <Zap className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Agent Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Agent Templates</h3>
            <p className="text-sm text-gray-600">Quick start with pre-configured agent templates</p>
          </div>
          <Brain className="h-6 w-6 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'E-commerce Assistant', icon: '🛒', description: 'Handle orders, returns, and product inquiries' },
            { name: 'HR Chatbot', icon: '👥', description: 'Employee onboarding and HR support' },
            { name: 'Booking Agent', icon: '📅', description: 'Appointment scheduling and management' }
          ].map((template, index) => (
            <motion.button
              key={template.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group text-left"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{template.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}