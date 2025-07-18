import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  gradient, 
  delay = 0 
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-black/5 border border-white/20 hover:shadow-xl hover:shadow-black/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "p-3 rounded-xl bg-gradient-to-r",
          gradient
        )}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={cn(
          "text-sm font-semibold px-2 py-1 rounded-full",
          trend === 'up' 
            ? "text-green-700 bg-green-100" 
            : "text-red-700 bg-red-100"
        )}>
          {change}
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </motion.div>
  );
}