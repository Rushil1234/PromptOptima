'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { AnalyticsData } from '@/lib/analytics-service';
import Threads from '@/components/Threads';
import GlassPanel from '@/components/GlassPanel';

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
    <>
      {/* WebGL Threads Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        isolation: 'isolate',
        backgroundColor: '#0a0a0a',
        willChange: 'transform',
        overflow: 'hidden'
      }}>
        <Threads
          color={[0.5, 0.2, 0.9]}
          amplitude={2.5}
          distance={0}
          enableMouseInteraction={false}
        />
      </div>

      <div className="min-h-screen relative py-12 px-4" style={{ zIndex: 1, backgroundColor: 'transparent' }}>
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
                <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-primary-200 to-purple-200 bg-clip-text text-transparent flex items-center gap-3">
                  <svg className="w-12 h-12 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Analytics Dashboard
                </h1>
                {refreshing && (
                  <div className="flex items-center gap-2 text-primary-400 text-sm">
                    <div className="animate-spin h-4 w-4 border-2 border-primary-400 border-t-transparent rounded-full"></div>
                    <span>Refreshing...</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <p className="text-dark-300 text-lg">
                  Real-time performance metrics and cost analytics
                </p>
                {lastUpdate && (
                  <span className="text-dark-500 text-sm">
                    Last updated: {lastUpdate.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 bg-dark-800/30 backdrop-blur-xl rounded-xl p-2 border border-dark-700/50">
              {(['24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/50'
                      : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Compressions"
            value={analytics.totalCompressions.toLocaleString()}
            subtitle={`${analytics.daily.compressions} today`}
            icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M12 2l-4 4M12 2l4 4M5 12l14-7M19 12l-14 7"/></svg>}
            trend="+12%"
          />
          <MetricCard
            title="Tokens Saved"
            value={formatNumber(analytics.totalTokensSaved)}
            subtitle={`${formatNumber(analytics.daily.tokensSaved)} today`}
            icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
            trend="+18%"
          />
          <MetricCard
            title="Cost Savings"
            value={`$${analytics.totalCostSaved.toFixed(2)}`}
            subtitle={`$${analytics.daily.costSaved.toFixed(2)} today`}
            icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/></svg>}
            trend="+22%"
          />
          <MetricCard
            title="Avg Compression"
            value={`${analytics.averageCompressionRatio.toFixed(1)}%`}
            subtitle={`${analytics.avgSemanticScore.toFixed(1)}% quality`}
            icon={<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
            trend="+5%"
          />
        </div>

        {/* Time Series Chart - Token Savings Over Time */}
        <GlassPanel className="p-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              Token Savings Trend
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
        </GlassPanel>

        {/* Strategy Performance Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Compression Ratio by Strategy */}
          <GlassPanel className="p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
                Strategy Performance
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
          </GlassPanel>

          {/* Radar Chart - Strategy Comparison */}
          <GlassPanel className="p-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                Multi-Dimensional Analysis
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
          </GlassPanel>
        </div>

        {/* Cost Analytics */}
        <GlassPanel className="p-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6"/>
              </svg>
              Cost Savings by Provider
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
        </GlassPanel>

        {/* Category Performance & Symbol Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Categories */}
          <GlassPanel className="p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4"/>
                </svg>
                Top Prompt Categories
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
          </GlassPanel>

          {/* Top Symbols */}
          <GlassPanel className="p-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 7 4 4 20 4 20 7"/>
                  <line x1="9" y1="20" x2="15" y2="20"/>
                  <line x1="12" y1="4" x2="12" y2="20"/>
                </svg>
                Top 5 Symbols Used
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
          </GlassPanel>
        </div>

        {/* System Health & Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <GlassPanel className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
                Quality Score
              </h3>
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
          </GlassPanel>

          <GlassPanel className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Success Rate
              </h3>
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
          </GlassPanel>
        </div>

        {/* Recent Activity */}
        <GlassPanel className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Recent Compressions
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
                        <svg className="w-5 h-5 text-green-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-400 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          </motion.div>
        </GlassPanel>
        </div>
      </div>
    </>
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
  icon: React.ReactNode;
  trend?: string;
}) {
  return (
    <GlassPanel>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        className="p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="text-primary-400">{icon}</div>
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
    </GlassPanel>
  );
}

// Helper function to format large numbers
function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toString();
}
