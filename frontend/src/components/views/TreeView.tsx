'use client';

/**
 * CSIR EOI 8119/06/01/2026 - Tree View Component
 * 
 * TASK REQUIREMENT: Display data in Interactive Tree view
 * 
 * This component displays the population data in a hierarchical,
 * collapsible tree structure for easy navigation and exploration.
 * 
 * Demonstrates proficiency in:
 * - React components
 * - TypeScript
 * - Interactive UI
 * - Recursive data structures
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronDown, 
  Globe, 
  Calendar, 
  Users,
  Folder,
  FolderOpen,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { PopulationRecord } from '@/types';

interface TreeViewProps {
  data: PopulationRecord[];
}

interface TreeNode {
  id: string;
  name: string;
  type: 'root' | 'nation' | 'year';
  value?: number;
  formattedValue?: string;
  growth?: number;
  children?: TreeNode[];
}

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
  defaultExpanded?: boolean;
}

function TreeNodeComponent({ node, level, defaultExpanded = false }: TreeNodeComponentProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || level < 2);
  const hasChildren = node.children && node.children.length > 0;

  const getIcon = () => {
    if (node.type === 'root') {
      return isExpanded ? <FolderOpen className="w-5 h-5 text-primary-500" /> : <Folder className="w-5 h-5 text-primary-500" />;
    }
    if (node.type === 'nation') {
      return <Globe className="w-5 h-5 text-secondary-500" />;
    }
    return <Calendar className="w-5 h-5 text-accent-500" />;
  };

  const getGrowthIcon = () => {
    if (node.growth === undefined || node.growth === null) return null;
    if (node.growth > 0) return <TrendingUp className="w-4 h-4 text-success-500" />;
    if (node.growth < 0) return <TrendingDown className="w-4 h-4 text-danger-500" />;
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const formatPopulation = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="select-none">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className={`
          flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200
          hover:bg-slate-100 dark:hover:bg-slate-800/50
          ${level === 0 ? 'bg-gradient-to-r from-primary-50 to-transparent dark:from-primary-900/20' : ''}
        `}
        style={{ paddingLeft: `${level * 24 + 12}px` }}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        {/* Expand/Collapse Arrow */}
        {hasChildren ? (
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="w-5 h-5 flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </motion.div>
        ) : (
          <div className="w-5 h-5" />
        )}

        {/* Icon */}
        {getIcon()}

        {/* Node Content */}
        <div className="flex-1 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${level === 0 ? 'text-lg text-slate-800 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
              {node.name}
            </span>
            {hasChildren && (
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                {node.children!.length}
              </span>
            )}
          </div>

          {/* Value Display */}
          {node.value !== undefined && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-sm text-slate-600 dark:text-slate-300">
                  {formatPopulation(node.value)}
                </span>
              </div>
              
              {node.formattedValue && (
                <span className="badge-secondary text-xs">
                  {node.formattedValue}
                </span>
              )}

              {node.growth !== undefined && (
                <div className="flex items-center gap-1">
                  {getGrowthIcon()}
                  <span className={`text-xs font-medium ${
                    node.growth > 0 ? 'text-success-600' : 
                    node.growth < 0 ? 'text-danger-600' : 
                    'text-slate-400'
                  }`}>
                    {node.growth > 0 ? '+' : ''}{node.growth.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Vertical line connector */}
            <div 
              className="relative"
              style={{ marginLeft: `${level * 24 + 24}px` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
              {node.children!.map((child, index) => (
                <div key={child.id} className="relative">
                  {/* Horizontal line connector */}
                  <div 
                    className="absolute left-0 top-5 w-4 h-px bg-slate-200 dark:bg-slate-700"
                  />
                  <TreeNodeComponent 
                    node={child} 
                    level={level + 1}
                    defaultExpanded={index === 0}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TreeView({ data }: TreeViewProps) {
  // Build tree structure from flat data
  const treeData = useMemo<TreeNode>(() => {
    const sortedData = [...data].sort((a, b) => b.year - a.year);
    
    // Group by nation
    const nationGroups = sortedData.reduce((acc, item) => {
      if (!acc[item.nation]) {
        acc[item.nation] = [];
      }
      acc[item.nation].push(item);
      return acc;
    }, {} as Record<string, PopulationRecord[]>);

    // Build tree
    const children: TreeNode[] = Object.entries(nationGroups).map(([nation, records]) => {
      const yearChildren: TreeNode[] = records.map((record, index) => {
        const prevRecord = records[index + 1];
        const growth = prevRecord
          ? ((record.population - prevRecord.population) / prevRecord.population) * 100
          : undefined;

        return {
          id: `${record.idNation}-${record.year}`,
          name: `${record.year}`,
          type: 'year' as const,
          value: record.population,
          formattedValue: `${(record.population / 1_000_000).toFixed(2)}M`,
          growth,
        };
      });

      const totalPopulation = records.reduce((sum, r) => sum + r.population, 0);
      const avgPopulation = Math.round(totalPopulation / records.length);

      return {
        id: records[0].idNation,
        name: nation,
        type: 'nation' as const,
        value: avgPopulation,
        formattedValue: `Avg: ${(avgPopulation / 1_000_000).toFixed(2)}M`,
        children: yearChildren,
      };
    });

    return {
      id: 'root',
      name: 'Population Data',
      type: 'root' as const,
      children,
    };
  }, [data]);

  // Statistics
  const stats = useMemo(() => {
    const years = [...new Set(data.map(d => d.year))].sort((a, b) => b - a);
    const nations = [...new Set(data.map(d => d.nation))];
    const latestYear = years[0];
    const latestPopulation = data.find(d => d.year === latestYear)?.population || 0;

    return {
      totalRecords: data.length,
      uniqueYears: years.length,
      uniqueNations: nations.length,
      latestYear,
      latestPopulation,
    };
  }, [data]);

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl">
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <Calendar className="w-4 h-4 text-primary-500" />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold">{stats.uniqueYears}</span> Years
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <Globe className="w-4 h-4 text-secondary-500" />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-semibold">{stats.uniqueNations}</span> Nations
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
          <Users className="w-4 h-4 text-accent-500" />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            Latest: <span className="font-semibold">{(stats.latestPopulation / 1_000_000).toFixed(2)}M</span>
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
        <ChevronDown className="w-4 h-4" />
        <span>Click on any node to expand or collapse its children</span>
      </div>

      {/* Tree */}
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 custom-scrollbar max-h-[600px] overflow-auto">
        <TreeNodeComponent node={treeData} level={0} defaultExpanded />
      </div>
    </div>
  );
}
