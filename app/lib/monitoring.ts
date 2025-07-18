/**
 * Monitoring utilities for error tracking and performance measurement
 */

// Error reporting interface
export interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  userAgent: string;
  timestamp: number;
  userId?: string;
  context?: Record<string, any>;
}

// Performance metrics interface
export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Error reporting service
export class ErrorReporter {
  private static instance: ErrorReporter;
  private isProduction = process.env.NODE_ENV === 'production';

  static getInstance(): ErrorReporter {
    if (!ErrorReporter.instance) {
      ErrorReporter.instance = new ErrorReporter();
    }
    return ErrorReporter.instance;
  }

  reportError(error: Error | unknown, context?: Record<string, any>): void {
    const errorReport: ErrorReport = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      url: typeof window !== 'undefined' ? window.location.href : 'server',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      timestamp: Date.now(),
      context,
    };

    // Log to console in development
    if (!this.isProduction) {
      console.error('Error Report:', errorReport);
    }

    // In production, send to error tracking service
    if (this.isProduction) {
      this.sendToErrorService(errorReport);
    }
  }

  private async sendToErrorService(errorReport: ErrorReport): Promise<void> {
    try {
      // Replace with your actual error tracking service
      // Examples: Sentry, LogRocket, Bugsnag, etc.
      
      // Example for a generic endpoint:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport),
      // });
      
      console.log('Would send error to tracking service:', errorReport);
    } catch (sendError) {
      console.error('Failed to send error report:', sendError);
    }
  }
}

// Performance monitoring service
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private isProduction = process.env.NODE_ENV === 'production';

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(name: string, metadata?: Record<string, any>) {
    const start = performance.now();
    
    return {
      end: () => {
        const duration = performance.now() - start;
        this.recordMetric(name, duration, metadata);
        return duration;
      }
    };
  }

  recordMetric(name: string, duration: number, metadata?: Record<string, any>): void {
    const metric: PerformanceMetrics = {
      name,
      duration,
      timestamp: Date.now(),
      metadata,
    };

    this.metrics.push(metric);

    // Log in development
    if (!this.isProduction) {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`, metadata);
    }

    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Send to analytics service in production
    if (this.isProduction) {
      this.sendToAnalyticsService(metric);
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  clearMetrics(): void {
    this.metrics = [];
  }

  private async sendToAnalyticsService(metric: PerformanceMetrics): Promise<void> {
    try {
      // Replace with your actual analytics service
      // Examples: Google Analytics, Mixpanel, etc.
      
      // Example for Google Analytics 4:
      // if (typeof window !== 'undefined' && window.gtag) {
      //   window.gtag('event', 'performance_metric', {
      //     metric_name: metric.name,
      //     metric_duration: metric.duration,
      //     custom_parameter_1: metric.metadata?.key1,
      //   });
      // }
      
      console.log('Would send metric to analytics service:', metric);
    } catch (sendError) {
      console.error('Failed to send performance metric:', sendError);
    }
  }
}

// Web Vitals monitoring (client-side only)
export function initializeWebVitalsMonitoring(): void {
  if (typeof window === 'undefined') return;

  const performanceMonitor = PerformanceMonitor.getInstance();

  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcpEntry = entry as any; // Type assertion for LCP-specific properties
          performanceMonitor.recordMetric('LCP', entry.startTime, {
            element: lcpEntry.element?.tagName,
            url: lcpEntry.url,
          });
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any; // Type assertion for FID-specific properties
          const fid = fidEntry.processingStart - entry.startTime;
          performanceMonitor.recordMetric('FID', fid, {
            eventType: entry.name,
          });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any; // Type assertion for CLS-specific properties
          if (!clsEntry.hadRecentInput) {
            performanceMonitor.recordMetric('CLS', clsEntry.value, {
              sources: clsEntry.sources?.map((source: any) => source.node?.tagName),
            });
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (error) {
      console.warn('Some performance observers not supported:', error);
    }
  }

  // Monitor navigation timing
  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      performanceMonitor.recordMetric('DOM Content Loaded', 
        navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      performanceMonitor.recordMetric('Load Complete', 
        navigation.loadEventEnd - navigation.loadEventStart);
      performanceMonitor.recordMetric('Total Load Time', 
        navigation.loadEventEnd - navigation.fetchStart);
    }
  });
}

// Convenience functions
export const reportError = (error: Error | unknown, context?: Record<string, any>) => {
  ErrorReporter.getInstance().reportError(error, context);
};

export const startPerformanceTimer = (name: string, metadata?: Record<string, any>) => {
  return PerformanceMonitor.getInstance().startTimer(name, metadata);
};

export const recordPerformanceMetric = (name: string, duration: number, metadata?: Record<string, any>) => {
  PerformanceMonitor.getInstance().recordMetric(name, duration, metadata);
};