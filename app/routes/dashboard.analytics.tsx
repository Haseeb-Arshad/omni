import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download
} from "lucide-react";
import { requireAuth } from "~/lib/auth";
import { PageHeader, StatCard } from "~/components/dashboard";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuth(request);
  return json({});
}

const analyticsStats = [
  {
    title: 'Total Conversations',
    value: '12,847',
    change: '+23%',
    trend: 'up' as const,
    icon: Activity,
    gradient: 'from-blue-500 to-blue-600',
    delay: 0
  },
  {
    title: 'Response Rate',
    value: '94.2%',
    change: '+5%',
    trend: 'up' as const,
    icon: TrendingUp,
    gradient: 'from-green-500 to-green-600',
    delay: 0.1
  },
  {
    title: 'Avg Resolution Time',
    value: '2.3m',
    change: '-18%',
    trend: 'up' as const,
    icon: BarChart3,
    gradient: 'from-orange-500 to-orange-600',
    delay: 0.2
  },
  {
    title: 'Customer Satisfaction',
    value: '4.8/5',
    change: '+0.3',
    trend: 'up' as const,
    icon: PieChart,
    gradient: 'from-purple-500 to-purple-600',
    delay: 0.3
  }
];

export default function AnalyticsPage() {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PageHeader
        title="Analytics"
        subtitle="Track performance metrics and insights across all channels"
        action={
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center transition-colors">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        }
      />

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {analyticsStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Trends</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <BarChart3 className="h-16 w-16" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Channel Distribution</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <PieChart className="h-16 w-16" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}