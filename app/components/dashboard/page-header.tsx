import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 text-sm">{subtitle}</p>
        )}
      </div>
      {action && (
        <div className="flex items-center space-x-3">
          {action}
        </div>
      )}
    </motion.div>
  );
}