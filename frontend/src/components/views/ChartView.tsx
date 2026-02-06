'use client';

/**
 * CSIR EOI 8119/06/01/2026 - Chart View Component
 * 
 * Additional visualization option using charts
 * 
 * Demonstrates proficiency in:
 * - Data visualization
 * - Recharts library
 * - Interactive charts
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3, LineChartIcon, AreaChartIcon } from 'lucide-react';
import { PopulationRecord } from '@/types';

interface ChartViewProps {
  data: PopulationRecord[];
}

type ChartType = 'line' | 'bar' | 'area';

export default function ChartView({ data }: ChartViewProps) {
  const [chartType, setChartType] = useState<ChartType>('area');

  // Transform data for charts
  const chartData = useMemo(() => {
    const sortedData = [...data].sort((a, b) => a.year - b.year);
    
    return sortedData.map((item, index) => {
      const prevItem = sortedData[index - 1];
      const growth = prevItem
        ? ((item.population - prevItem.population) / prevItem.population) * 100
        : 0;

      return {
        year: item.year,
        population: item.population,
        populationMillions: item.population / 1_000_000,
        nation: item.nation,
        growth: parseFloat(growth.toFixed(2)),
      };
    });
  }, [data]);

  const chartOptions = [
    { type: 'area' as ChartType, label: 'Area', icon: AreaChartIcon },
    { type: 'line' as ChartType, label: 'Line', icon: LineChartIcon },
    { type: 'bar' as ChartType, label: 'Bar', icon: BarChart3 },
  ];

  const formatPopulation = (value: number) => {
    return `${value.toFixed(1)}M`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <p className="font-semibold text-slate-800 dark:text-white mb-2">
            Year: {label}
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-slate-600 dark:text-slate-300">
              Population: <span className="font-mono font-semibold">{new Intl.NumberFormat('en-US').format(data.population)}</span>
            </p>
            <p className="text-slate-600 dark:text-slate-300">
              In Millions: <span className="font-semibold">{data.populationMillions.toFixed(2)}M</span>
            </p>
            <p className={`font-medium ${data.growth >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
              Growth: {data.growth >= 0 ? '+' : ''}{data.growth}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    const gradientId = 'populationGradient';

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              tickFormatter={formatPopulation}
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="populationMillions"
              name="Population (Millions)"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: '#2563eb' }}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              tickFormatter={formatPopulation}
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="populationMillions"
              name="Population (Millions)"
              fill="url(#barGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </BarChart>
        );

      case 'area':
      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="year" 
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
            />
            <YAxis 
              tickFormatter={formatPopulation}
              stroke="#64748b"
              tick={{ fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="populationMillions"
              name="Population (Millions)"
              stroke="#3b82f6"
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </AreaChart>
        );
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const populations = chartData.map(d => d.population);
    const min = Math.min(...populations);
    const max = Math.max(...populations);
    const avg = populations.reduce((a, b) => a + b, 0) / populations.length;
    const totalGrowth = chartData.length > 1
      ? ((chartData[chartData.length - 1].population - chartData[0].population) / chartData[0].population) * 100
      : 0;

    return {
      min,
      max,
      avg,
      totalGrowth,
      startYear: chartData[0]?.year,
      endYear: chartData[chartData.length - 1]?.year,
    };
  }, [chartData]);

  return (
    <div className="space-y-6">
      {/* Chart Type Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
          {chartOptions.map((option) => {
            const Icon = option.icon;
            const isActive = chartType === option.type;
            
            return (
              <motion.button
                key={option.type}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setChartType(option.type)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Statistics Summary */}
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="badge-primary">
            Range: {stats.startYear} - {stats.endYear}
          </span>
          <span className="badge-secondary">
            Total Growth: {stats.totalGrowth >= 0 ? '+' : ''}{stats.totalGrowth.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        key={chartType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-[400px] w-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Minimum
          </p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white">
            {(stats.min / 1_000_000).toFixed(2)}M
          </p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Maximum
          </p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white">
            {(stats.max / 1_000_000).toFixed(2)}M
          </p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Average
          </p>
          <p className="text-lg font-semibold text-slate-800 dark:text-white">
            {(stats.avg / 1_000_000).toFixed(2)}M
          </p>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Total Growth
          </p>
          <p className={`text-lg font-semibold ${stats.totalGrowth >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
            {stats.totalGrowth >= 0 ? '+' : ''}{stats.totalGrowth.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
}
