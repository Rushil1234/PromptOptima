'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { AnalyticsData } from '@/lib/analytics-service';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      if (!loading) setRefreshing(true);
      
      const [overviewRes, timeSeriesRes] = await Promise.all([
        fetch('/api/analytics?type=overview'),
        fetch(`/api/analytics?type=timeseries&hours=${timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720}`)
      ]);

      const analyticsData = await overviewRes.json();
      const timeSeriesResult = await timeSeriesRes.json();

      setAnalytics(analyticsData);
      setTimeSeriesData(timeSeriesResult.data);
      setLastUpdate(new Date());
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(fetchAnalytics, 10000); // Refresh every 10s
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRefresh]);

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-dark-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

  // Prepare strategy comparison data
  const strategyComparisonData = Object.entries(analytics.strategyStats).map(([name, stats]: [string, any]) => ({
    name: name.replace('-', ' ').toUpperCase(),
    compressionRatio: stats.avgCompressionRatio.toFixed(1),
    tokensSaved: stats.totalTokensSaved,
    successRate: stats.successRate.toFixed(1),
    avgTime: stats.avgProcessingTime.toFixed(0)
  }));

  // Prepare cost savings data
  const costSavingsData = Object.entries(analytics.costByProvider).map(([provider, costs]: [string, any]) => ({
    provider: provider.toUpperCase(),
    baseline: costs.baseline,
    optimized: costs.optimized,
    saved: costs.saved
  }));

  // Prepare category data
  const categoryData = analytics.popularCategories.map(cat => ({
    name: cat.category,
    count: cat.count,
    avgCompression: cat.avgCompression.toFixed(1)
  }));

  // Prepare symbol usage pie chart
  const symbolPieData = analytics.topSymbols.slice(0, 5).map(s => ({
    name: `${s.symbol} (${s.concept})`,
    value: s.usageCount
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 py-12 px-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">
                  📊 Analytics Dashboard
                </h1>
                {refreshing && (
                  <div className="flex items-center gap-2 text-primary-400 text-sm">
                    <div className="animate-spin h-4 w-4 border-2 border-primary-400 border-t-transparent rounded-full"></div>
                    <span>Refreshing...</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p className="text-dark-300">
                  Real-time performance metrics and cost analytics
                </p>
                {lastUpdate && (
                  <span className="text-dark-500 text-sm">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                {/* Time Range Selector */}
                <div className="flex gap-2 bg-dark-800/50 rounded-xl p-2">
                  {(['24h', '7d', '30d'] as const).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        timeRange === range
                          ? 'bg-primary-500 text-white'
                          : 'text-dark-300 hover:text-white hover:bg-dark-700'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Auto Refresh Toggle */}
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all relative ${
                    autoRefresh
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-dark-800/50 text-dark-300 border border-dark-700'
                  }`}
                >
                  {autoRefresh && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                  {autoRefresh ? '🔄 Live' : '⏸️ Paused'}
                </button>
              </div>
              
              {autoRefresh && (
                <div className="text-right text-xs text-dark-500">
                  Auto-refresh every 10 seconds
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Compressions"
            value={analytics.totalCompressions.toLocaleString()}
            subtitle={`${analytics.daily.compressions} today`}
            icon="🚀"
            trend="+12%"
          />
          <MetricCard
            title="Tokens Saved"
            value={formatNumber(analytics.totalTokensSaved)}
            subtitle={`${formatNumber(analytics.daily.tokensSaved)} today`}
            icon="⚡"
            trend="+18%"
          />
          <MetricCard
            title="Cost Savings"
            value={`$${analytics.totalCostSaved.toFixed(2)}`}
            subtitle={`$${analytics.daily.costSaved.toFixed(2)} today`}
            icon="💰"
            trend="+22%"
          />
          <MetricCard
            title="Avg Compression"
            value={`${analytics.averageCompressionRatio.toFixed(1)}%`}
            subtitle={`${analytics.avgSemanticScore.toFixed(1)}% quality`}
            icon="📈"
            trend="+5%"
          />
        </div>

        {/* Time Series Chart - Token Savings Over Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            📈 Token Savings Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <defs>
                <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#64748b"
                tickFormatter={(ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e2e', 
                  border: '1px solid #6366f1',
                  borderRadius: '8px'
                }}
                labelFormatter={(ts) => new Date(ts).toLocaleString()}
              />
              <Area 
                type="monotone" 
                dataKey="tokensSaved" 
                stroke="#6366f1" 
                fillOpacity={1}
                fill="url(#colorTokens)"
                name="Tokens Saved"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Strategy Performance Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Compression Ratio by Strategy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              ⚡ Strategy Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={strategyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e2e', 
                    border: '1px solid #6366f1',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="compressionRatio" fill="#6366f1" name="Compression %" />
                <Bar dataKey="successRate" fill="#8b5cf6" name="Success %" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Radar Chart - Strategy Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              🎯 Multi-Dimensional Analysis
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={strategyComparisonData}>
                <PolarGrid stroke="#2a2a40" />
                <PolarAngleAxis dataKey="name" stroke="#64748b" />
                <PolarRadiusAxis stroke="#64748b" />
                <Radar 
                  name="Compression Ratio" 
                  dataKey="compressionRatio" 
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Success Rate" 
                  dataKey="successRate" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6} 
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Cost Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            💰 Cost Savings by Provider
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={costSavingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
              <XAxis dataKey="provider" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1e2e', 
                  border: '1px solid #6366f1',
                  borderRadius: '8px'
                }}
                formatter={(value: any) => `$${value.toFixed(4)}`}
              />
              <Legend />
              <Bar dataKey="baseline" fill="#f43f5e" name="Baseline Cost" />
              <Bar dataKey="optimized" fill="#10b981" name="Optimized Cost" />
              <Bar dataKey="saved" fill="#6366f1" name="Cost Saved" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Performance & Symbol Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              📋 Top Prompt Categories
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a40" />
                <XAxis type="number" stroke="#64748b" />
                <YAxis type="category" dataKey="name" stroke="#64748b" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e2e', 
                    border: '1px solid #6366f1',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" name="Usage Count" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Symbols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              🔤 Top 5 Symbols Used
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={symbolPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name?.split(' ')[0] || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {symbolPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e2e', 
                    border: '1px solid #6366f1',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-dark-300">
                Symbol Utilization: <span className="text-primary-400 font-bold">
                  {analytics.symbolUtilizationRate.toFixed(1)}%
                </span> ({analytics.topSymbols.length} of 753 symbols used)
              </p>
            </div>
          </motion.div>
        </div>

        {/* System Health & Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">🎯 Quality Score</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#2a2a40"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#6366f1"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(analytics.avgSemanticScore / 100) * 351.86} 351.86`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {analytics.avgSemanticScore.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-dark-300 mt-4">Semantic Preservation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">✅ Success Rate</h3>
            <div className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#2a2a40"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${((100 - analytics.errorRate) / 100) * 351.86} 351.86`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {(100 - analytics.errorRate).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-dark-300 mt-4">Overall Success</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">⏰ Peak Hours</h3>
            <div className="space-y-2">
              {analytics.peakHours.slice(0, 5).map((hour, idx) => (
                <div key={hour} className="flex items-center justify-between">
                  <span className="text-dark-300">
                    {hour.toString().padStart(2, '0')}:00 - {(hour + 1).toString().padStart(2, '0')}:00
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                        style={{ width: `${100 - idx * 20}%` }}
                      />
                    </div>
                    <span className="text-primary-400 font-medium text-sm">
                      #{idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            🕐 Recent Compressions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 text-dark-300 font-medium">Time</th>
                  <th className="text-left py-3 px-4 text-dark-300 font-medium">Strategy</th>
                  <th className="text-left py-3 px-4 text-dark-300 font-medium">Category</th>
                  <th className="text-right py-3 px-4 text-dark-300 font-medium">Tokens Saved</th>
                  <th className="text-right py-3 px-4 text-dark-300 font-medium">Compression</th>
                  <th className="text-right py-3 px-4 text-dark-300 font-medium">Quality</th>
                  <th className="text-center py-3 px-4 text-dark-300 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentCompressions.slice(0, 10).map((compression, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-dark-800 hover:bg-dark-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 text-dark-300 text-sm">
                      {new Date(compression.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge bg-primary-500/20 text-primary-400 border-primary-500/30">
                        {compression.strategy}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-dark-300 text-sm capitalize">
                      {compression.promptCategory}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-primary-400">
                      {compression.tokensSaved}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-green-400">
                      {compression.compressionRatio.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-yellow-400">
                      {compression.semanticScore.toFixed(1)}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      {compression.success ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-red-400">✗</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend 
}: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: string; 
  trend?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{icon}</span>
        {trend && (
          <span className={`text-sm font-medium ${
            trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-dark-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      <p className="text-dark-500 text-sm">{subtitle}</p>
    </motion.div>
  );
}

// Helper function to format large numbers
function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}
