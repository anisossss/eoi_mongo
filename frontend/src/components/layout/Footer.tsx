'use client';

/**
 * CSIR EOI 8119/06/01/2026 - Footer Component
 * Application footer with links and copyright
 */

import { Heart, Github, ExternalLink, Mail } from 'lucide-react';

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
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">CSIR EOI</h3>
                <p className="text-xs text-slate-400">8119/06/01/2026</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md mb-4">
              A modern web application demonstrating proficiency in software development
              for the Council for Scientific and Industrial Research (CSIR).
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://hub.docker.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Docker Hub"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <a
                href="mailto:tender@csir.co.za"
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Technologies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-slate-400">Frontend:</span>{' '}
                <span className="text-slate-300">Next.js, React, TypeScript</span>
              </li>
              <li>
                <span className="text-slate-400">Backend:</span>{' '}
                <span className="text-slate-300">Node.js, Express.js</span>
              </li>
              <li>
                <span className="text-slate-400">Database:</span>{' '}
                <span className="text-slate-300">MongoDB</span>
              </li>
              <li>
                <span className="text-slate-400">Container:</span>{' '}
                <span className="text-slate-300">Docker</span>
              </li>
            </ul>
          </div>

          {/* EOI Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              EOI Information
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>EOI No: 8119/06/01/2026</li>
              <li>Closing: 06 February 2026</li>
              <li>Category: Professional Services</li>
              <li>Duration: 3 Years</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 text-center md:text-left">
              © {currentYear} CSIR EOI Software Development Services. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 flex items-center gap-1">
              Built with <Heart className="w-4 h-4 text-danger-500" /> using modern technologies
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
