"use client";

/**
 * CSIR EOI 8119/06/01/2026 - Main Application Page
 * Single Page Web Application with DataUSA Population Data Visualization
 *
 * This component fulfills the task requirements:
 * - Calls REST API endpoint (DataUSA API)
 * - Displays data in Grid View and Tree View
 * - Modern look and feel
 * - Interactive page elements (buttons)
 * - Built with Next.js (React framework)
 *
 * Demonstrates proficiency in:
 * - React/Next.js
 * - TypeScript
 * - Modern UI/UX design
 * - Data visualization
 * - API integration
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  GitBranch,
  RefreshCw,
  TrendingUp,
  Database,
  Globe,
  Sparkles,
  ChevronRight,
  BarChart3,
  Users,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GridView from "@/components/views/GridView";
import TreeView from "@/components/views/TreeView";
import ChartView from "@/components/views/ChartView";
import StatsCard from "@/components/ui/StatsCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { usePopulationData } from "@/hooks/usePopulationData";

type ViewMode = "grid" | "tree" | "chart";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { data, isLoading, error, refetch, isFetching } = usePopulationData();

  // Calculate statistics
  const stats = {
    totalRecords: data?.length || 0,
    latestYear: data ? Math.max(...data.map((d) => d.year)) : 0,
    totalPopulation: data
      ? data.find((d) => d.year === Math.max(...data.map((d) => d.year)))
          ?.population || 0
      : 0,
    growthRate:
      data && data.length >= 2
        ? (
            ((data[0].population - data[1].population) / data[1].population) *
            100
          ).toFixed(2)
        : "0",
  };

  const viewOptions = [
    {
      id: "grid" as ViewMode,
      label: "Grid View",
      icon: LayoutGrid,
      description: "Tabular data display",
    },
    {
      id: "tree" as ViewMode,
      label: "Tree View",
      icon: GitBranch,
      description: "Hierarchical structure",
    },
    {
      id: "chart" as ViewMode,
      label: "Chart View",
      icon: BarChart3,
      description: "Visual analytics",
    },
  ];

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>AINEXIM | CSIR EOI 8119/06/02/2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Population Data
                <span className="block text-secondary-300">
                  Visualization Platform
                </span>
              </h1>

              <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                A modern web application demonstrating proficiency in full-stack
                development, featuring real-time data from the DataUSA API with
                multiple visualization options.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="btn bg-white text-primary-700 hover:bg-primary-50 shadow-xl shadow-black/10"
                >
                  {isFetching ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-5 h-5" />
                  )}
                  Fetch Data
                </motion.button>

                <a
                  href="#data-section"
                  className="btn border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  View Data
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-slate-50 dark:fill-slate-900"
              />
            </svg>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 -mt-8 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Records"
                value={stats.totalRecords}
                icon={Database}
                color="primary"
                delay={0}
              />
              <StatsCard
                title="Latest Year"
                value={stats.latestYear}
                icon={Globe}
                color="secondary"
                delay={0.1}
              />
              <StatsCard
                title="Population"
                value={stats.totalPopulation.toLocaleString()}
                icon={Users}
                color="accent"
                suffix=" (Latest)"
                delay={0.2}
              />
              <StatsCard
                title="Growth Rate"
                value={`${stats.growthRate}%`}
                icon={TrendingUp}
                color="success"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Data Visualization Section */}
        <section id="data-section" className="py-16 scroll-mt-8">
          <div className="container mx-auto px-4">
            {/* View Mode Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
                    DataUSA Population Data
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Interactive data visualization with multiple view options
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="btn-outline text-sm"
                >
                  {isFetching ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Refresh Data
                </motion.button>
              </div>

              {/* View Toggle Buttons */}
              <div className="flex flex-wrap gap-3 p-2 bg-slate-100 dark:bg-slate-800/50 rounded-2xl">
                {viewOptions.map((option) => {
                  const Icon = option.icon;
                  const isActive = viewMode === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setViewMode(option.id)}
                      className={`
                        flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300
                        ${
                          isActive
                            ? "bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-lg"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="hidden sm:inline">{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="card p-6 md:p-8 min-h-[500px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-96">
                  <LoadingSpinner
                    size="lg"
                    message="Fetching population data from DataUSA API..."
                  />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="w-16 h-16 bg-danger-100 dark:bg-danger-900/30 rounded-full flex items-center justify-center mb-4">
                    <Database className="w-8 h-8 text-danger-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    Failed to Load Data
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4 max-w-md">
                    {error instanceof Error
                      ? error.message
                      : "An error occurred while fetching data."}
                  </p>
                  <button onClick={() => refetch()} className="btn-primary">
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                </div>
              ) : data && data.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={viewMode}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {viewMode === "grid" && <GridView data={data} />}
                    {viewMode === "tree" && <TreeView data={data} />}
                    {viewMode === "chart" && <ChartView data={data} />}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <Database className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    No Data Available
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Click the button below to fetch population data from the
                    DataUSA API.
                  </p>
                  <button onClick={() => refetch()} className="btn-primary">
                    <RefreshCw className="w-4 h-4" />
                    Fetch Data
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Technical Capabilities
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                This application demonstrates proficiency in modern web
                development technologies as required by CSIR EOI
                8119/06/02/2026.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Next.js & React",
                  description:
                    "Modern frontend framework with TypeScript, server-side rendering, and optimized performance.",
                  icon: "⚛️",
                },
                {
                  title: "Node.js & Express",
                  description:
                    "Scalable backend API with RESTful endpoints, JWT authentication, and MongoDB integration.",
                  icon: "🚀",
                },
                {
                  title: "Docker Containerization",
                  description:
                    "Fully containerized application stack for consistent deployment across environments.",
                  icon: "🐳",
                },
                {
                  title: "MongoDB Database",
                  description:
                    "NoSQL database with optimized schemas, indexing, and data validation.",
                  icon: "🗃️",
                },
                {
                  title: "REST API Integration",
                  description:
                    "External API consumption from DataUSA with error handling and data transformation.",
                  icon: "🔗",
                },
                {
                  title: "Modern UI/UX",
                  description:
                    "Responsive design with Tailwind CSS, animations, and accessibility features.",
                  icon: "🎨",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-hover p-6"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
