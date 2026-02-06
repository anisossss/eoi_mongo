"use client";

import { motion } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Lock,
  CheckCircle2,
  Copy,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";

const endpoints = [
  {
    method: "GET",
    path: "/api/population",
    description: "Fetch all population data from cache or DataUSA API",
    response: `{
  "success": true,
  "data": [
    {
      "nation": "United States",
      "year": 2022,
      "population": 333287557
    }
  ],
  "source": "cache|api"
}`,
    params: [],
  },
  {
    method: "GET",
    path: "/api/population/fetch",
    description: "Force fetch fresh data from DataUSA API and update cache",
    response: `{
  "success": true,
  "data": [...],
  "message": "Data fetched and cached successfully"
}`,
    params: [],
  },
  {
    method: "GET",
    path: "/api/population/stats",
    description: "Get statistical summary of population data",
    response: `{
  "success": true,
  "stats": {
    "totalRecords": 10,
    "latestYear": 2022,
    "oldestYear": 2013,
    "averagePopulation": 320000000,
    "growthRate": 0.58
  }
}`,
    params: [],
  },
  {
    method: "POST",
    path: "/api/auth/login",
    description: "Authenticate user and receive JWT token",
    response: `{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}`,
    params: [
      { name: "email", type: "string", required: true },
      { name: "password", type: "string", required: true },
    ],
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Health check endpoint for monitoring",
    response: `{
  "status": "healthy",
  "timestamp": "2026-02-06T12:00:00Z",
  "version": "1.0.0"
}`,
    params: [],
  },
];

const methodColors: Record<string, string> = {
  GET: "bg-green-500",
  POST: "bg-blue-500",
  PUT: "bg-yellow-500",
  DELETE: "bg-red-500",
};

export default function ApiDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

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
              <Code className="w-5 h-5" />
              <span className="text-sm font-medium">API Reference</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
              Backend API Documentation
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              RESTful API endpoints for the Population Data Platform. Built with
              Express.js and MongoDB.
            </p>
          </motion.div>

          {/* Base URL */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="card p-6">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <Server className="w-5 h-5 text-primary-500" />
                Base URL
              </h3>
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <code className="text-primary-600 dark:text-primary-400 font-mono flex-1">
                  https://ainexim-eoi.co.za/api
                </code>
                <button
                  onClick={() =>
                    copyToClipboard("https://ainexim-eoi.co.za/api", "base")
                  }
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copiedEndpoint === "base" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Authentication */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary-500" />
              Authentication
            </h2>
            <div className="card p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Some endpoints require authentication via JWT token. Include the
                token in the Authorization header:
              </p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                Authorization: Bearer {"<your_jwt_token>"}
              </div>
            </div>
          </motion.section>

          {/* Endpoints */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary-500" />
              Endpoints
            </h2>
            <div className="space-y-6">
              {endpoints.map((endpoint, i) => (
                <motion.div
                  key={endpoint.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="card overflow-hidden"
                >
                  {/* Endpoint Header */}
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`${
                          methodColors[endpoint.method]
                        } text-white text-xs font-bold px-3 py-1 rounded-full`}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-slate-800 dark:text-white font-mono text-lg">
                        {endpoint.path}
                      </code>
                      <button
                        onClick={() =>
                          copyToClipboard(endpoint.path, endpoint.path)
                        }
                        className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors ml-auto"
                      >
                        {copiedEndpoint === endpoint.path ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      {endpoint.description}
                    </p>
                  </div>

                  {/* Parameters */}
                  {endpoint.params.length > 0 && (
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-3 text-sm">
                        Request Body
                      </h4>
                      <div className="space-y-2">
                        {endpoint.params.map((param) => (
                          <div
                            key={param.name}
                            className="flex items-center gap-3 text-sm"
                          >
                            <code className="text-primary-600 dark:text-primary-400 font-mono">
                              {param.name}
                            </code>
                            <span className="text-slate-500">{param.type}</span>
                            {param.required && (
                              <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded">
                                required
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Response */}
                  <div className="p-6">
                    <h4 className="font-semibold text-slate-800 dark:text-white mb-3 text-sm flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      Response
                    </h4>
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                      <pre>{endpoint.response}</pre>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* External API */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <ExternalLink className="w-6 h-6 text-primary-500" />
              External API (DataUSA)
            </h2>
            <div className="card p-6">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                This application fetches data from the DataUSA public API as
                specified in the EOI requirements:
              </p>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <p className="text-slate-500 mb-2">
                  # DataUSA Population Endpoint
                </p>
                <p className="text-cyan-400">
                  GET
                  https://datausa.io/api/data?drilldowns=Nation&measures=Population
                </p>
              </div>
              <div className="mt-4">
                <a
                  href="https://datausa.io/about/api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  DataUSA API Documentation
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}
