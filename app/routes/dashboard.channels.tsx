import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  Hash, 
  Plus,
  Settings,
  Activity,
  Users,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Zap,
  Globe
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

// Mock channels data
const channels = [
  {
    id: '1',
    name: 'WhatsApp Business',
    type: 'WhatsApp',
    status: 'connected',
    conversations: 456,
    activeUsers: 234,
    responseTime: '1.2m',
    icon: '💬',
    color: 'from-green-500 to-green-600',
    lastSync: '2 min ago'
  },
  {
    id: '2',
    name: 'Telegram Bot',
    type: 'Telegram',
    status: 'connected',
    conversations: 189,
    activeUsers: 89,
    responseTime: '45s',
    icon: '✈️',
    color: 'from-blue-500 to-blue-600',
    lastSync: '5 min ago'
  },
  {
    id: '3',
    name: 'Discord Server',
    type: 'Discord',
    status: 'connected',
    conversations: 234,
    activeUsers: 156,
    responseTime: '2.1m',
    icon: '🎮',
    color: 'from-indigo-500 to-indigo-600',
    lastSync: '1 min ago'
  },
  {
    id: '4',
    name: 'Slack Workspace',
    type: 'Slack',
    status: 'error',
    conversations: 67,
    activeUsers: 23,
    responseTime: '3.4m',
    icon: '💼',
    color: 'from-purple-500 to-purple-600',
    lastSync: '1 hour ago'
  },
  {
    id: '5',
    name: 'Facebook Messenger',
    type: 'Facebook',
    status: 'pending',
    conversations: 0,
    activeUsers: 0,
    responseTime: '-',
    icon: '📘',
    color: 'from-blue-600 to-blue-700',
    lastSync: 'Never'
  },
  {
    id: '6',
    name: 'Instagram DM',
    type: 'Instagram',
    status: 'pending',
    conversations: 0,
    activeUsers: 0,
    responseTime: '-',
    icon: '📷',
    color: 'from-pink-500 to-pink-600',
    lastSync: 'Never'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'connected':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'connected':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
};

export default function ChannelsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="Channels"
        subtitle="Manage your omni-channel integrations and connections"
        action={
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg flex items-center transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Channel
          </button>
        }
      />

      {/* Channel Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600">
              <Hash className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +2
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">6</h3>
          <p className="text-sm text-gray-600">Total Channels</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              75%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">4</h3>
          <p className="text-sm text-gray-600">Connected</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">946</h3>
          <p className="text-sm text-gray-600">Total Messages</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
              +8%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">502</h3>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>
      </motion.div>

      {/* Channels Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {channels.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
          >
            {/* Channel Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${channel.color}`}>
                  <span className="text-2xl">{channel.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                  <p className="text-sm text-gray-600">{channel.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(channel.status)}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(channel.status)}`}>
                {channel.status.charAt(0).toUpperCase() + channel.status.slice(1)}
              </span>
            </div>

            {/* Channel Stats */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversations</span>
                <span className="text-sm font-semibold text-gray-900">{channel.conversations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-sm font-semibold text-gray-900">{channel.activeUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-semibold text-gray-900">{channel.responseTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Sync</span>
                <span className="text-sm font-semibold text-gray-900">{channel.lastSync}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              {channel.status === 'connected' ? (
                <>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <Activity className="h-4 w-4 mr-1" />
                    View Activity
                  </button>
                  <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </button>
                </>
              ) : channel.status === 'pending' ? (
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center">
                  <Zap className="h-4 w-4 mr-1" />
                  Connect Now
                </button>
              ) : (
                <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Fix Connection
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Available Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Available Channels</h3>
            <p className="text-sm text-gray-600">Connect more channels to expand your reach</p>
          </div>
          <Globe className="h-6 w-6 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['Twitter', 'LinkedIn', 'YouTube', 'TikTok', 'WeChat', 'Line'].map((platform, index) => (
            <motion.button
              key={platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                  <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                </div>
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">{platform}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}