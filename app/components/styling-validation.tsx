import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { validateDesignTokens, getCSSVariable } from "~/lib/design-tokens";

export function StylingValidation() {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Validate design tokens after component mounts
    const valid = validateDesignTokens();
    setIsValid(valid);

    // Get sample token values for display
    const sampleTokens = [
      '--charcoal-50',
      '--charcoal-900',
      '--accent-blue',
      '--success',
      '--text-base',
      '--space-4',
      '--duration-normal',
      '--radius',
    ];

    const values: Record<string, string> = {};
    sampleTokens.forEach(token => {
      values[token] = getCSSVariable(token);
    });
    setTokenValues(values);
  }, []);

  if (isValid === null) {
    return (
      <div className="glass-card p-6">
        <div className="animate-shimmer h-4 bg-muted rounded mb-4" />
        <div className="animate-shimmer h-4 bg-muted rounded w-3/4" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        {isValid ? (
          <CheckCircle className="w-6 h-6 text-success" />
        ) : (
          <AlertCircle className="w-6 h-6 text-error" />
        )}
        <h3 className="text-lg font-semibold text-foreground">
          Design Token Validation
        </h3>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {isValid
          ? "All design tokens are properly loaded and available."
          : "Some design tokens are missing or not loaded correctly."}
      </p>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Sample Token Values:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
          {Object.entries(tokenValues).map(([token, value]) => (
            <div key={token} className="flex justify-between p-2 bg-muted/50 rounded">
              <span className="text-muted-foreground">{token}:</span>
              <span className="text-foreground">{value || 'Not found'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Visual test of glassmorphism */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Glassmorphism Test:</h4>
        <div className="relative p-4 bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 rounded-lg">
          <div className="glass p-4 rounded-lg">
            <p className="text-sm text-foreground">
              This card demonstrates the glassmorphism effect with backdrop blur.
            </p>
          </div>
        </div>
      </div>

      {/* Animation test */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Animation Test:</h4>
        <div className="flex gap-2">
          <motion.div
            className="w-4 h-4 bg-accent-blue rounded"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="w-4 h-4 bg-accent-green rounded"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="w-4 h-4 bg-accent-orange rounded"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}