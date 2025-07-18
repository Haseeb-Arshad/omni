import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  Filter, 
  Plus,
  Clock,
  User,
  Bot,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

// Mock conversation data
const conversations = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    avatar: 'SJ',
    channel: 'WhatsApp',
    lastMessage: 'Thank you for the quick response!',
    timestamp: '2 min ago',
    status: 'resolved',
    unread: 0,
    agent: 'AI Assistant'
  },
  {
    id: '2',
    customer: 'Mike Chen',
    avatar: 'MC',
    channel: 'Telegram',
    lastMessage: 'I need help with my order #12345',
    timestamp: '5 min ago',
    status: 'active',
    unread: 2,
    agent: 'David Wilson'
  },
  {
    id: '3',
    customer: 'Emma Davis',
    avatar: 'ED',
    channel: 'Discord',
    lastMessage: 'When will my refund be processed?',
    timestamp: '12 min ago',
    status: 'pending',
    unread: 1,
    agent: 'AI Assistant'
  },
  {
    id: '4',
    customer: 'Alex Rodriguez',
    avatar: 'AR',
    channel: 'Slack',
    lastMessage: 'The integration is working perfectly now',
    timestamp: '1 hour ago',
    status: 'resolved',
    unread: 0,
    agent: 'Sarah Miller'
  },
  {
    id: '5',
    customer: 'Lisa Wang',
    avatar: 'LW',
    channel: 'WhatsApp',
    lastMessage: 'Can you help me set up my account?',
    timestamp: '2 hours ago',
    status: 'active',
    unread: 3,
    agent: 'AI Assistant'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'resolved':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
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

export default function ConversationsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <PageHeader
        title="Conversations"
        subtitle="Manage all customer conversations across channels"
        action={
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg flex items-center transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            New Conversation
          </button>
        }
      />

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              Filter
            </button>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Channels</option>
              <option>WhatsApp</option>
              <option>Telegram</option>
              <option>Discord</option>
              <option>Slack</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Conversations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/5 border border-white/20 overflow-hidden"
      >
        <div className="divide-y divide-gray-100">
          {conversations.map((conversation, index) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="p-6 hover:bg-gray-50/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {conversation.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 h-4 w-4 ${getChannelColor(conversation.channel)} rounded-full border-2 border-white`}></div>
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{conversation.customer}</h3>
                      <span className="text-xs text-gray-500">via {conversation.channel}</span>
                      {conversation.unread > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{conversation.lastMessage}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{conversation.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {conversation.agent.includes('AI') ? (
                          <Bot className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        <span>{conversation.agent}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                    {conversation.status}
                  </span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">1,247</p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-lg font-semibold text-gray-900">23</p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Resolved</p>
              <p className="text-lg font-semibold text-gray-900">1,156</p>
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg shadow-black/5 border border-white/20">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">AI Handled</p>
              <p className="text-lg font-semibold text-gray-900">89%</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}