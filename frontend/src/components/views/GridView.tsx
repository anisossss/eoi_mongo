'use client';

/**
 * CSIR EOI 8119/06/01/2026 - Grid View Component
 * 
 * TASK REQUIREMENT: Display data in Grid view
 * 
 * This component displays the population data in a modern, 
 * interactive tabular format with sorting and pagination.
 * 
 * Demonstrates proficiency in:
 * - React components
 * - TypeScript
 * - Data visualization
 * - Modern UI/UX
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Download,
  Users
} from 'lucide-react';
import { PopulationRecord } from '@/types';

interface GridViewProps {
  data: PopulationRecord[];
}

type SortField = 'year' | 'population' | 'nation';
type SortOrder = 'asc' | 'desc';

export default function GridView({ data }: GridViewProps) {
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = data.filter((item) =>
      item.nation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.year.toString().includes(searchTerm)
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'year') {
        comparison = a.year - b.year;
      } else if (sortField === 'population') {
        comparison = a.population - b.population;
      } else {
        comparison = a.nation.localeCompare(b.nation);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [data, sortField, sortOrder, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const paginatedData = processedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-slate-400" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-primary-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary-600" />
    );
  };

  const formatPopulation = (population: number): string => {
    return new Intl.NumberFormat('en-US').format(population);
  };

  const exportToCSV = () => {
    const headers = ['Year', 'Nation', 'Population'];
    const csvContent = [
      headers.join(','),
      ...processedData.map((item) =>
        [item.year, item.nation, item.population].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'population_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by year or nation..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="input pl-10 w-full sm:w-80"
          />
        </div>
        
        <button
          onClick={exportToCSV}
          className="btn-outline text-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="table-container custom-scrollbar">
        <table className="table">
          <thead>
            <tr>
              <th>
                <button
                  onClick={() => handleSort('year')}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  Year
                  <SortIcon field="year" />
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('nation')}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  Nation
                  <SortIcon field="nation" />
                </button>
              </th>
              <th>
                <button
                  onClick={() => handleSort('population')}
                  className="flex items-center gap-2 hover:text-primary-600 transition-colors"
                >
                  Population
                  <SortIcon field="population" />
                </button>
              </th>
              <th>Population (Millions)</th>
              <th>Growth Indicator</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {paginatedData.map((item, index) => {
                const prevYearData = data.find(d => d.year === item.year - 1);
                const growth = prevYearData 
                  ? ((item.population - prevYearData.population) / prevYearData.population * 100).toFixed(2)
                  : null;

                return (
                  <motion.tr
                    key={`${item.idNation}-${item.year}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <td>
                      <span className="font-semibold text-slate-800 dark:text-white">
                        {item.year}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span>{item.nation}</span>
                      </div>
                    </td>
                    <td>
                      <span className="font-mono text-slate-800 dark:text-white">
                        {formatPopulation(item.population)}
                      </span>
                    </td>
                    <td>
                      <span className="badge-secondary">
                        {(item.population / 1_000_000).toFixed(2)}M
                      </span>
                    </td>
                    <td>
                      {growth !== null ? (
                        <span className={`badge ${parseFloat(growth) >= 0 ? 'badge-success' : 'badge-primary'}`}>
                          {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                        </span>
                      ) : (
                        <span className="text-slate-400">N/A</span>
                      )}
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, processedData.length)} of{' '}
            {processedData.length} results
          </p>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn-ghost p-2 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn-ghost p-2 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
