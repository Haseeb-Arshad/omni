import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { motion } from 'framer-motion';
import { Bell, Check, Trash2, Settings, Filter, Search } from 'lucide-react';
import { requireAuth } from '~/lib/auth';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  
  // Mock notification data - replace with actual data fetching
  const notifications = [
    {
      id: '1',
      title: 'New message from customer',
      message: 'John Doe sent a message in the support channel',
      type: 'message',
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2', 
      title: 'Agent performance alert',
      message: 'AI Agent response time exceeded threshold',
      type: 'alert',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: '3',
      title: 'System maintenance scheduled',
      message: 'Scheduled maintenance on Sunday 2AM-4AM EST',
      type: 'system',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
  ];
  
  return json({ notifications });
}

export default function NotificationsPage() {
  const { notifications } = useLoaderData<typeof loader>();

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <Bell className="h-5 w-5 text-blue-500" />;
      case 'alert':
        return <Bell className="h-5 w-5 text-red-500" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-charcoal-900">Notifications</h1>
            <p className="text-charcoal-600 mt-2">
              Stay updated with important alerts and messages
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/50 hover:bg-white/70 rounded-xl border border-charcoal-200 transition-colors">
              <Filter className="h-4 w-4 text-charcoal-600" />
              <span className="text-sm font-medium text-charcoal-700">Filter</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
              <Check className="h-4 w-4" />
              <span className="text-sm font-medium">Mark All Read</span>
            </button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full pl-12 pr-4 py-3 bg-white/50 border border-charcoal-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-all"
          />
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm border border-charcoal-200 rounded-2xl overflow-hidden"
        >
          {notifications.length === 0 ? (
            <div className="p-12 text-center">
              <Bell className="h-16 w-16 text-charcoal-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-charcoal-700 mb-2">No notifications</h3>
              <p className="text-charcoal-500">You're all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-charcoal-100">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 hover:bg-white/40 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-charcoal-900' : 'text-charcoal-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-charcoal-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-charcoal-500 mt-2">
                            {formatTimeAgo(notification.timestamp)}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button className="p-1.5 hover:bg-charcoal-100 rounded-lg transition-colors">
                            <Check className="h-4 w-4 text-charcoal-500" />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/60 backdrop-blur-sm border border-charcoal-200 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-charcoal-600 mb-2">Unread Notifications</h3>
            <p className="text-3xl font-bold text-charcoal-900">
              {notifications.filter(n => !n.read).length}
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm border border-charcoal-200 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-charcoal-600 mb-2">Total Today</h3>
            <p className="text-3xl font-bold text-charcoal-900">
              {notifications.length}
            </p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm border border-charcoal-200 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-charcoal-600 mb-2">High Priority</h3>
            <p className="text-3xl font-bold text-red-600">
              {notifications.filter(n => n.type === 'alert').length}
            </p>
          </div>
        </motion.div>
    </div>
  );
}
