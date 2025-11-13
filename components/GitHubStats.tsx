"use client";

import { useState, useEffect, useCallback } from "react";
import { Octokit } from "octokit";
import {
  Star,
  GitFork,
  BookOpen,
  Users,
  Code2,
  TrendingUp,
  Activity,
} from "lucide-react";

interface GitHubStatsProps {
  username: string;
}

interface UserData {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface RepoData {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export default function GitHubStats({ username }: GitHubStatsProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [languages, setLanguages] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // MOVED FUNCTION HERE - BEFORE useEffect
  const fetchGitHubData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const octokit = new Octokit();

      // Fetch user data
      const userResponse = await octokit.request("GET /users/{username}", {
        username: username,
      });

      setUserData(userResponse.data as UserData);

      // Fetch repositories
      const reposResponse = await octokit.request(
        "GET /users/{username}/repos",
        {
          username: username,
          sort: "updated",
          per_page: 100,
        }
      );

      const reposData = reposResponse.data as RepoData[];
      setRepos(reposData);

      // Calculate language statistics
      const langStats: { [key: string]: number } = {};
      reposData.forEach((repo) => {
        if (repo.language) {
          langStats[repo.language] = (langStats[repo.language] || 0) + 1;
        }
      });

      setLanguages(langStats);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch GitHub data. Please check the username.");
      setLoading(false);
      console.error(err);
    }
  }, [username]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchGitHubData();
  }, [fetchGitHubData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-xl">
        <p className="text-red-400 text-center">{error}</p>
      </div>
    );
  }

  if (!userData) return null;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-purple-500/50 transition-all duration-300">
        <div className="flex items-start space-x-6">
          <img
            src={userData.avatar_url}
            alt={userData.name}
            className="w-24 h-24 rounded-2xl border-4 border-purple-500/50 shadow-xl"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">
              {userData.name}
            </h2>
            <p className="text-gray-400 mb-4">@{username}</p>
            <p className="text-gray-300">{userData.bio}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Repositories"
          value={userData.public_repos}
          color="purple"
        />
        <StatCard
          icon={<Star className="w-6 h-6" />}
          label="Total Stars"
          value={totalStars}
          color="yellow"
        />
        <StatCard
          icon={<GitFork className="w-6 h-6" />}
          label="Total Forks"
          value={totalForks}
          color="blue"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Followers"
          value={userData.followers}
          color="green"
        />
      </div>

      {/* Languages Chart */}
      <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
        <div className="flex items-center space-x-3 mb-6">
          <Code2 className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">Top Languages</h3>
        </div>
        <div className="space-y-4">
          {topLanguages.map(([language, count], index) => {
            const percentage = (count / repos.length) * 100;
            const colors = [
              "bg-purple-500",
              "bg-blue-500",
              "bg-green-500",
              "bg-yellow-500",
              "bg-pink-500",
            ];
            return (
              <div key={language}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{language}</span>
                  <span className="text-gray-400 text-sm">
                    {count} repos ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${colors[index]} h-full rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Repositories */}
      <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-2xl font-bold text-white">Top Repositories</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topRepos.map((repo) => (
            <div
              key={repo.name}
              className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <h4 className="text-white font-semibold mb-2 truncate">
                {repo.name}
              </h4>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GitFork className="w-4 h-4 text-blue-400" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
              {repo.language && (
                <div className="mt-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                    {repo.language}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  const colorClasses = {
    purple:
      "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
    yellow:
      "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
    green:
      "from-green-500/20 to-green-500/5 border-green-500/30 text-green-400",
  };

  return (
    <div
      className={`p-6 bg-gradient-to-br ${
        colorClasses[color as keyof typeof colorClasses]
      } backdrop-blur-xl rounded-2xl border hover:scale-105 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 bg-white/10 rounded-xl ${
            colorClasses[color as keyof typeof colorClasses]
          }`}
        >
          {icon}
        </div>
        <Activity className="w-5 h-5 text-white/30" />
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value.toLocaleString()}</p>
    </div>
  );
}
