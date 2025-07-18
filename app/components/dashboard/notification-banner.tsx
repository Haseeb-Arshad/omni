import { motion } from "framer-motion";
import { LucideIcon, X } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

interface NotificationBannerProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
}

export function NotificationBanner({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  variant = 'info',
  dismissible = true
}: NotificationBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const variantStyles = {
    info: "bg-blue-50 border-blue-200 text-blue-900",
    success: "bg-green-50 border-green-200 text-green-900",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
    error: "bg-red-50 border-red-200 text-red-900"
  };

  const iconStyles = {
    info: "text-blue-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "rounded-2xl border p-4 shadow-sm",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start space-x-3">
        <div className={cn("mt-0.5", iconStyles[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>

        <div className="flex items-center space-x-2">
          {action && (
            <button
              onClick={action.onClick}
              className="text-sm font-medium hover:underline"
            >
              {action.label}
            </button>
          )}
          
          {dismissible && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-lg hover:bg-black/5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}