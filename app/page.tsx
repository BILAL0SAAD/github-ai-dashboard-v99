"use client";

import { useState } from "react";
import {
  Github,
  Star,
  GitFork,
  Code2,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import GitHubStats from "../components/GitHubStats";
import AICommitGenerator from "../components/AICommitGenerator";

export default function Home() {
  const [username, setUsername] = useState("");
  const [showStats, setShowStats] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setShowStats(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 -bottom-48 -right-48 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg">
                  <Github className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    GitHub AI Dashboard
                  </h1>
                  <p className="text-sm text-gray-400">
                    Powered by AI & Real-time Data
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white font-medium">
                  AI Enabled
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          {!showStats && (
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6 backdrop-blur-xl border border-purple-500/30">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300 font-medium">
                  Trending in 2025
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Analyze GitHub Stats
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  with AI Insights
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Get real-time GitHub statistics, AI-powered commit messages, and
                beautiful visualizations
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    GitHub Stats
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Real-time repository and contribution data
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Code2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    Language Analysis
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Breakdown of your coding languages
                  </p>
                </div>

                <div className="p-6 bg-white/5 rounded-2xl backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    AI Commit Messages
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Generate smart commit messages with AI
                  </p>
                </div>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                  >
                    Analyze
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Try:{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setUsername("torvalds");
                      setShowStats(true);
                    }}
                    className="text-purple-400 hover:underline"
                  >
                    torvalds
                  </button>
                  ,{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setUsername("gaearon");
                      setShowStats(true);
                    }}
                    className="text-purple-400 hover:underline"
                  >
                    gaearon
                  </button>
                  , or{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setUsername("BILAL0SAAD");
                      setShowStats(true);
                    }}
                    className="text-purple-400 hover:underline"
                  >
                    BILAL0SAAD
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* Stats Display */}
          {showStats && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">
                  GitHub Stats for{" "}
                  <span className="text-purple-400">@{username}</span>
                </h2>
                <button
                  onClick={() => setShowStats(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-xl transition-all"
                >
                  Change User
                </button>
              </div>

              <GitHubStats username={username} />
            </div>
          )}

          {/* AI Commit Generator Section */}
          <div className="mt-16">
            <AICommitGenerator />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 backdrop-blur-xl mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                Built with Next.js 14, TypeScript, Tailwind CSS & OpenAI
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a
                  href="https://github.com/BILAL0SAAD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/belal-saad-9455a7321/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
