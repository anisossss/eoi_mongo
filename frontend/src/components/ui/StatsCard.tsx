'use client';

/**
 * CSIR EOI 8119/06/01/2026 - Stats Card Component
 * Animated statistics card with icon
 */

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  suffix?: string;
  delay?: number;
}

const colorClasses = {
  primary: {
    bg: 'bg-primary-100 dark:bg-primary-900/30',
    icon: 'text-primary-600 dark:text-primary-400',
    gradient: 'from-primary-500 to-primary-600',
  },
  secondary: {
    bg: 'bg-secondary-100 dark:bg-secondary-900/30',
    icon: 'text-secondary-600 dark:text-secondary-400',
    gradient: 'from-secondary-500 to-secondary-600',
  },
  accent: {
    bg: 'bg-accent-100 dark:bg-accent-900/30',
    icon: 'text-accent-600 dark:text-accent-400',
    gradient: 'from-accent-500 to-accent-600',
  },
  success: {
    bg: 'bg-success-100 dark:bg-success-900/30',
    icon: 'text-success-600 dark:text-success-400',
    gradient: 'from-success-500 to-success-600',
  },
  warning: {
    bg: 'bg-warning-100 dark:bg-warning-900/30',
    icon: 'text-warning-600 dark:text-warning-400',
    gradient: 'from-warning-500 to-warning-600',
  },
  danger: {
    bg: 'bg-danger-100 dark:bg-danger-900/30',
    icon: 'text-danger-600 dark:text-danger-400',
    gradient: 'from-danger-500 to-danger-600',
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  suffix,
  delay = 0,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card-hover p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {value}
            {suffix && (
              <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">
                {suffix}
              </span>
            )}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${colors.bg}`}>
          <Icon className={`w-6 h-6 ${colors.icon}`} />
        </div>
      </div>
      
      {/* Decorative gradient bar */}
      <div className="mt-4 h-1 w-full rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1, delay: delay + 0.3 }}
          className={`h-full bg-gradient-to-r ${colors.gradient}`}
        />
      </div>
    </motion.div>
  );
}
