import { motion } from "framer-motion";
import { StylingValidation } from "./styling-validation";

export function TestStylingSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100 dark:from-charcoal-950 dark:to-charcoal-900 p-8">
      {/* Background blur dots */}
      <div className="blur-dot primary w-96 h-96 top-10 right-10" />
      <div className="blur-dot accent w-80 h-80 bottom-20 left-20" />
      <div className="blur-dot secondary w-64 h-64 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-container mx-auto space-y-8">
        {/* Styling Validation */}
        <StylingValidation />

        {/* Typography Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8"
        >
          <h1 className="text-4xl font-bold mb-4 text-foreground">Typography Scale</h1>
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground">Extra Small Text (12px)</p>
            <p className="text-sm text-muted-foreground">Small Text (14px)</p>
            <p className="text-base text-foreground">Base Text (16px)</p>
            <p className="text-lg text-foreground">Large Text (18px)</p>
            <p className="text-xl text-foreground">Extra Large Text (20px)</p>
            <p className="text-2xl text-foreground">2XL Text (24px)</p>
            <p className="text-3xl text-foreground">3XL Text (30px)</p>
            <p className="text-4xl text-foreground">4XL Text (36px)</p>
          </div>
        </motion.section>

        {/* Color Palette Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Charcoal Color Palette</h2>
          <div className="grid grid-cols-5 md:grid-cols-11 gap-4">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
              <div key={shade} className="text-center">
                <div
                  className={`w-16 h-16 rounded-lg mb-2 bg-charcoal-${shade} border border-border`}
                />
                <p className="text-xs text-muted-foreground">{shade}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Accent Colors Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Accent Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg mb-2 bg-accent-blue" />
              <p className="text-xs text-muted-foreground">Blue</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg mb-2 bg-accent-green" />
              <p className="text-xs text-muted-foreground">Green</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg mb-2 bg-accent-orange" />
              <p className="text-xs text-muted-foreground">Orange</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg mb-2 bg-accent-red" />
              <p className="text-xs text-muted-foreground">Red</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg mb-2 bg-accent-purple" />
              <p className="text-xs text-muted-foreground">Purple</p>
            </div>
          </div>
        </motion.section>

        {/* Glassmorphism Components Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Glassmorphism Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-foreground">Glass Effect</h3>
              <p className="text-sm text-muted-foreground">Basic glass morphism with backdrop blur</p>
            </div>
            <div className="glass-morphism p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-foreground">Enhanced Glass</h3>
              <p className="text-sm text-muted-foreground">Enhanced glass morphism variant</p>
            </div>
            <div className="gradient-border p-6 bg-card rounded-xl">
              <h3 className="text-lg font-medium mb-2 text-foreground">Gradient Border</h3>
              <p className="text-sm text-muted-foreground">Animated gradient border effect</p>
            </div>
          </div>
        </motion.section>

        {/* Interactive Components Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Interactive Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="glass-button text-foreground">
              Glass Button
            </button>
            <button className="btn-hover-effect bg-primary text-primary-foreground px-4 py-2 rounded-lg">
              Hover Effect
            </button>
            <button className="btn-3d bg-accent text-accent-foreground px-4 py-2 rounded-lg">
              3D Button
            </button>
            <button className="micro-interaction bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
              Micro Interaction
            </button>
          </div>
        </motion.section>

        {/* Animation Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Animation System</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="animate-fade-in bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-foreground">Fade In</p>
            </div>
            <div className="animate-slide-up bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-foreground">Slide Up</p>
            </div>
            <div className="animate-slide-down bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-foreground">Slide Down</p>
            </div>
            <div className="animate-scale-in bg-card p-4 rounded-lg border border-border">
              <p className="text-sm text-foreground">Scale In</p>
            </div>
          </div>
        </motion.section>

        {/* Card Variations Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Card Variations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-interactive bg-card p-6 rounded-xl border border-border">
              <h3 className="text-lg font-medium mb-2 text-foreground">Interactive Card</h3>
              <p className="text-sm text-muted-foreground">Hover to see the lift effect</p>
            </div>
            <div className="card-hover-effect bg-card p-6 rounded-xl border border-border">
              <h3 className="text-lg font-medium mb-2 text-foreground">Hover Card</h3>
              <p className="text-sm text-muted-foreground">Smooth hover animation</p>
            </div>
            <div className="animate-shimmer bg-card p-6 rounded-xl border border-border">
              <h3 className="text-lg font-medium mb-2 text-foreground">Shimmer Card</h3>
              <p className="text-sm text-muted-foreground">Loading shimmer effect</p>
            </div>
          </div>
        </motion.section>

        {/* Spacing System Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Spacing System</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 6, 8, 12, 16].map((space) => (
              <div key={space} className="flex items-center gap-4">
                <div className={`w-${space} h-4 bg-primary rounded`} />
                <p className="text-sm text-muted-foreground">Space {space} ({space * 0.25}rem)</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Shadow System Test */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="glass-card p-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Shadow System</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card p-4 rounded-lg shadow-sm border border-border">
              <p className="text-sm text-foreground">Small</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-md border border-border">
              <p className="text-sm text-foreground">Medium</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-lg border border-border">
              <p className="text-sm text-foreground">Large</p>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-xl border border-border">
              <p className="text-sm text-foreground">Extra Large</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}