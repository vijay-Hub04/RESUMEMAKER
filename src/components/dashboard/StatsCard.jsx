import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Award, Briefcase, ArrowUpRight } from 'lucide-react';

const iconMap = {
  FileText: FileText,
  TrendingUp: TrendingUp,
  Award: Award,
  Briefcase: Briefcase,
};

export const StatsCard = ({ stat, index = 0 }) => {
  const Icon = iconMap[stat.icon] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#151F32] border border-slate-200/80 dark:border-slate-800 shadow-lg shadow-slate-100 dark:shadow-none transition-all duration-200 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
          <ArrowUpRight className="w-3 h-3 mr-0.5" />
          {stat.change}
        </span>
      </div>

      <div className="mt-5">
        <h4 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white">
          {stat.value}
        </h4>
        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
          {stat.title}
        </p>
      </div>
    </motion.div>
  );
};

export default StatsCard;
