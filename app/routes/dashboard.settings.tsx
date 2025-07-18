import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  Settings, 
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

const settingsSections = [
  {
    title: 'Profile Settings',
    description: 'Manage your account information and preferences',
    icon: User,
    color: 'from-blue-500 to-blue-600'
  },
  {
    title: 'Notifications',
    description: 'Configure notification preferences and alerts',
    icon: Bell,
    color: 'from-green-500 to-green-600'
  },
  {
    title: 'Security',
    description: 'Password, two-factor authentication, and security settings',
    icon: Shield,
    color: 'from-red-500 to-red-600'
  },
  {
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
    icon: Palette,
    color: 'from-purple-500 to-purple-600'
  },
  {
    title: 'Language & Region',
    description: 'Set your language, timezone, and regional preferences',
    icon: Globe,
    color: 'from-orange-500 to-orange-600'
  },
  {
    title: 'Integrations',
    description: 'Manage third-party integrations and API connections',
    icon: Database,
    color: 'from-cyan-500 to-cyan-600'
  }
];

export default function SettingsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        title="Settings"
        subtitle="Manage your account settings and preferences"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color}`}>
                <section.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
              </div>
            </div>
            <p className="text-sm text-gray-600">{section.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive email alerts for important events</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Dark Mode</h4>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-save</h4>
              <p className="text-sm text-gray-600">Automatically save changes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}