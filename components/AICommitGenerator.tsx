"use client";

import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";

export default function AICommitGenerator() {
  const [codeChanges, setCodeChanges] = useState("");
  const [commitMessage, setCommitMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateCommitMessage = async () => {
    if (!codeChanges.trim()) {
      alert("Please enter your code changes");
      return;
    }

    setLoading(true);
    setCommitMessage("");

    try {
      const response = await fetch("/api/generate-commit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codeChanges }),
      });

      const data = await response.json();

      if (data.error) {
        setCommitMessage("Error: " + data.error);
      } else {
        setCommitMessage(data.commitMessage);
      }
    } catch (error) {
      setCommitMessage("Error generating commit message. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commitMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const examples = [
    {
      title: "Bug Fix",
      code: "Fixed null pointer exception in user authentication\nAdded error handling for edge cases\nUpdated unit tests",
    },
    {
      title: "New Feature",
      code: "Added dark mode toggle\nImplemented theme persistence in localStorage\nCreated theme context provider",
    },
    {
      title: "Refactor",
      code: "Extracted duplicate code into reusable functions\nImproved variable naming for clarity\nRemoved unused imports",
    },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">
            AI Commit Message Generator
          </h3>
          <p className="text-gray-400 text-sm">
            Let AI write professional commit messages for you
          </p>
        </div>
      </div>

      {/* Example Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-sm text-gray-400">Try an example:</span>
        {examples.map((example) => (
          <button
            key={example.title}
            onClick={() => setCodeChanges(example.code)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all"
          >
            {example.title}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Input Area */}
        <div>
          <label className="block text-white font-medium mb-2">
            Describe your code changes:
          </label>
          <textarea
            value={codeChanges}
            onChange={(e) => setCodeChanges(e.target.value)}
            placeholder="Example:&#10;- Added user authentication with JWT&#10;- Fixed bug in password validation&#10;- Updated API endpoints&#10;- Added unit tests for login function"
            className="w-full h-40 px-4 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={generateCommitMessage}
          disabled={loading}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate Commit Message</span>
            </>
          )}
        </button>

        {/* Output Area */}
        {commitMessage && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-white font-medium">
                Generated Commit Message:
              </label>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl">
              <code className="text-white font-mono text-sm whitespace-pre-wrap break-words">
                {commitMessage}
              </code>
            </div>

            {/* Quick Tips */}
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-sm text-blue-300 font-medium mb-2">
                💡 Commit Message Best Practices:
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>
                  • Use imperative mood (e.g., &quot;Add&quot; not
                  &quot;Added&quot;)
                </li>
                <li>• Keep the first line under 50 characters</li>
                <li>• Separate subject from body with a blank line</li>
                <li>
                  • Use conventional commits format: feat:, fix:, docs:, etc.
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
