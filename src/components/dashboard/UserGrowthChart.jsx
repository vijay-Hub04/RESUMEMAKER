import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { USER_GROWTH_DATA } from '../../utils/constants';

// Custom Tooltip component for Recharts
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-[#151F32]/95 backdrop-blur-md p-3.5 shadow-xl">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-500" />
          {label}
        </p>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {data.value} Registered Users
          </span>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
          {data.payload.activeJobs ? `${data.payload.activeJobs} active matches available` : ''}
        </p>
      </div>
    );
  }
  return null;
};

export const UserGrowthChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [filter, setFilter] = useState('7d');

  // Multi-range mock data
  const data = filter === '7d' ? USER_GROWTH_DATA : [
    { date: 'Week 1', users: 120 },
    { date: 'Week 2', users: 185 },
    { date: 'Week 3', users: 240 },
    { date: 'Week 4', users: 310 },
  ];

  const totalRegistered = data.reduce((acc, curr) => acc + curr.users, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-3xl bg-white dark:bg-[#151F32] border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none relative overflow-hidden"
    >
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Chart Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live Platform Metrics</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
            Application User Growth
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Track how our community of job seekers is growing over time as candidates optimize their resumes and land interviews.
          </p>
        </div>

        {/* Action Controls & Aggregate */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
            <button
              type="button"
              onClick={() => setFilter('7d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === '7d'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Daily
            </button>
            <button
              type="button"
              onClick={() => setFilter('30d')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === '30d'
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Weekly
            </button>
          </div>

          <div className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/50 text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Period Total
            </span>
            <span className="text-lg font-bold font-heading text-indigo-600 dark:text-indigo-400">
              +{totalRegistered} New Users
            </span>
          </div>
        </div>
      </div>

      {/* Main Chart Container */}
      <div className="h-72 sm:h-80 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onMouseMove={(state) => {
              if (state.isTooltipActive) {
                setHoveredIndex(state.activeTooltipIndex);
              } else {
                setHoveredIndex(null);
              }
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <defs>
              <linearGradient id="barGradientActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="barGradientNormal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.85} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.4} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dx={-5}
              allowDecimals={false}
            />

            <Tooltip content={<CustomChartTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.06)' }} />

            <Bar
              dataKey="users"
              radius={[8, 8, 2, 2]}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    hoveredIndex === index
                      ? 'url(#barGradientActive)'
                      : 'url(#barGradientNormal)'
                  }
                  className="transition-all duration-200 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-xs text-slate-400 block">Today's Signups</span>
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">49 users</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Yesterday's Signups</span>
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">42 users</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Peak Day</span>
          <span className="text-base font-bold text-slate-800 dark:text-slate-100">49 (Today)</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Growth Momentum</span>
          <span className="text-base font-bold text-emerald-500 flex items-center gap-1">
            +18.4% WoW
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserGrowthChart;
