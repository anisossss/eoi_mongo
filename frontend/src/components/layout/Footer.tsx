"use client";

/**
 * CSIR EOI 8119/06/02/2026 - Footer Component
 * Application footer with links and copyright
 */

import {
  Heart,
  Github,
  ExternalLink,
  Mail,
  FileText,
  Code,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AINEXIM</h3>
                <p className="text-xs text-slate-400">CSIR EOI 8119</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md mb-4">
              A modern web application demonstrating proficiency in software
              development for the Council for Scientific and Industrial Research
              (CSIR).
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/ainexim/csir-eoi-population"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://hub.docker.com/u/ainexim"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Docker Hub"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@ainexim.co.za"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/api-docs"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Code className="w-4 h-4" />
                  API Reference
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/ainexim/csir-eoi-population"
                  target="_blank"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Tech Stack
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400">Frontend:</span>{" "}
                <span className="text-slate-300">
                  Next.js, React, TypeScript
                </span>
              </li>
              <li>
                <span className="text-slate-400">Backend:</span>{" "}
                <span className="text-slate-300">Node.js, Express.js</span>
              </li>
              <li>
                <span className="text-slate-400">Database:</span>{" "}
                <span className="text-slate-300">MongoDB</span>
              </li>
              <li>
                <span className="text-slate-400">Container:</span>{" "}
                <span className="text-slate-300">Docker</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {currentYear} AINEXIM. CSIR EOI 8119/06/02/2026 - Software
              Development Services
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>
                Docker:{" "}
                <code className="text-primary-400">
                  ainexim/population-frontend
                </code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
