"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Code,
  Database,
  Server,
  Globe,
  Package,
  GitBranch,
  Terminal,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Cpu,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const techStack = [
  {
    name: "Next.js 14",
    category: "Frontend",
    icon: Globe,
    description: "React framework with App Router",
  },
  {
    name: "React 18",
    category: "Frontend",
    icon: Code,
    description: "UI library with hooks",
  },
  {
    name: "TypeScript",
    category: "Language",
    icon: FileText,
    description: "Type-safe JavaScript",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    icon: Layers,
    description: "Utility-first CSS framework",
  },
  {
    name: "Node.js",
    category: "Backend",
    icon: Server,
    description: "JavaScript runtime",
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: Cpu,
    description: "Web framework for Node.js",
  },
  {
    name: "MongoDB",
    category: "Database",
    icon: Database,
    description: "NoSQL document database",
  },
  {
    name: "Docker",
    category: "DevOps",
    icon: Package,
    description: "Container platform",
  },
];

const features = [
  {
    title: "REST API Integration",
    description:
      "Fetches real-time population data from the DataUSA API with error handling and caching.",
    code: "GET https://datausa.io/api/data?drilldowns=Nation&measures=Population",
  },
  {
    title: "Grid View",
    description:
      "Sortable table displaying population data with year, population, and growth rate columns.",
    code: "<GridView data={populationData} sortable={true} />",
  },
  {
    title: "Tree View",
    description:
      "Interactive hierarchical view with expandable/collapsible nodes organized by decade.",
    code: '<TreeView data={populationData} groupBy="decade" />',
  },
  {
    title: "Docker Containerization",
    description:
      "Multi-stage Docker builds for optimized production images with Docker Compose orchestration.",
    code: "docker pull ainexim/population-frontend:latest",
  },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-4">
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">Documentation</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Population Data Platform
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Complete documentation for the CSIR EOI 8119 single-page web
              application demonstrating modern web development capabilities.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://github.com/ainexim/csir-eoi-population"
                target="_blank"
                className="card p-6 hover:border-primary-500 transition-colors group"
              >
                <Github className="w-8 h-8 text-slate-400 group-hover:text-primary-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Source Code
                </h3>
                <p className="text-sm text-slate-500">View on GitHub</p>
              </a>
              <a
                href="https://hub.docker.com/u/ainexim"
                target="_blank"
                className="card p-6 hover:border-primary-500 transition-colors group"
              >
                <Package className="w-8 h-8 text-slate-400 group-hover:text-primary-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                  Docker Images
                </h3>
                <p className="text-sm text-slate-500">Pull from Docker Hub</p>
              </a>
              <Link
                href="/api-docs"
                className="card p-6 hover:border-primary-500 transition-colors group"
              >
                <Code className="w-8 h-8 text-slate-400 group-hover:text-primary-500 mb-3" />
                <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                  API Reference
                </h3>
                <p className="text-sm text-slate-500">Explore endpoints</p>
              </Link>
            </div>
          </motion.div>

          {/* Overview Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary-500" />
              Overview
            </h2>
            <div className="card p-8">
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                This application is developed as part of the CSIR Expression of
                Interest (EOI) submission for software development services. It
                demonstrates proficiency in modern web development technologies
                including React, Node.js, MongoDB, and Docker.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-3">
                    Requirements Met:
                  </h4>
                  <ul className="space-y-2">
                    {[
                      "Single page web application",
                      "Modern look and feel",
                      "Modern framework (Next.js/React)",
                      "Interactive button element",
                      "REST API integration (DataUSA)",
                      "Grid view display",
                      "Interactive tree view",
                      "Docker containerized",
                      "Available on Docker Hub",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-3">
                    Docker Pull Command:
                  </h4>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400">
                    <p>docker pull ainexim/population-frontend:latest</p>
                    <p>docker pull ainexim/population-backend:latest</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Tech Stack Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Layers className="w-6 h-6 text-primary-500" />
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="card p-4 text-center hover:border-primary-500 transition-colors"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary-500" />
                    <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
                      {tech.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {tech.category}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary-500" />
              Key Features
            </h2>
            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="card p-6"
                >
                  <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    {feature.code}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Quick Start Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-primary-500" />
              Quick Start
            </h2>
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
                Using Docker (Recommended)
              </h3>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 space-y-2 overflow-x-auto">
                <p className="text-slate-500"># Clone the repository</p>
                <p className="text-green-400">
                  git clone https://github.com/ainexim/csir-eoi-population.git
                </p>
                <p className="text-green-400">cd csir-eoi-population</p>
                <p></p>
                <p className="text-slate-500"># Start with Docker Compose</p>
                <p className="text-green-400">docker-compose up -d</p>
                <p></p>
                <p className="text-slate-500"># Access the application</p>
                <p className="text-cyan-400">
                  # Frontend: http://localhost:3000
                </p>
                <p className="text-cyan-400">
                  # Backend API: http://localhost:5000/api
                </p>
              </div>
            </div>
          </motion.section>

          {/* Architecture Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <GitBranch className="w-6 h-6 text-primary-500" />
              Architecture
            </h2>
            <div className="card p-6">
              <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{`┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    Next.js Frontend                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Grid View  │  │  Tree View  │  │     Chart View      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                   Express.js Backend                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Auth API   │  │Population AP│  │    Cache Layer      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────┬─────────────────────────────────┬───────────────┘
            │                                 │
┌───────────▼───────────┐       ┌─────────────▼───────────────┐
│       MongoDB         │       │       DataUSA API           │
│   (Data Storage)      │       │    (External Source)        │
└───────────────────────┘       └─────────────────────────────┘`}</pre>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}
