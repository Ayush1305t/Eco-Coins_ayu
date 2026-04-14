import React from 'react';
import { motion } from 'framer-motion';
import { Coins, Image as ImageIcon, History, Trophy, TrendingUp, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <motion.div initial="hidden" animate="show" variants={container} className="space-y-8">
        
        {/* Header */}
        <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold dark:text-white text-slate-900">Your Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">Track your environmental impact and rewards.</p>
          </div>
          <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/40 dark:hover:bg-white/10 transition-colors font-semibold dark:text-white hover:scale-105 transform duration-300">
            <ImageIcon size={20} className="text-emerald-500 dark:text-primary-light" />
            Upload New Cleanup
          </button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Eco-Coins", value: "1,250", icon: Coins, color: "text-amber-500", bg: "bg-amber-500/10" },
            { label: "Verified Cleanups", value: "24", icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Impact Score", value: "850", icon: TrendingUp, color: "text-cyan-500", bg: "bg-cyan-500/10" },
            { label: "Global Rank", value: "#142", icon: Trophy, color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((stat, idx) => (
            <div key={idx} className="glass p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between z-10 relative">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold dark:text-white text-slate-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
              </div>
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 ${stat.bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
            </div>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={item} className="lg:col-span-2 glass rounded-3xl p-8 min-h-[400px] flex flex-col">
            <h2 className="text-xl font-bold dark:text-white mb-6 flex items-center gap-2">
              <History size={20} className="text-emerald-500" />
              Activity History
            </h2>
            <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-700/50 rounded-2xl flex flex-col items-center justify-center bg-slate-50/30 dark:bg-slate-800/20 text-slate-400">
              <TrendingUp size={48} className="mb-4 opacity-50" />
              <p>Activity Chart Visualization</p>
              <p className="text-sm opacity-70 mt-2">(Connect backend data to render chart)</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="glass rounded-3xl p-8 flex flex-col">
            <h2 className="text-xl font-bold dark:text-white mb-6">Recent Cleanups</h2>
            <div className="space-y-4 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="w-14 h-14 rounded-xl bg-slate-200 dark:bg-slate-700 flex-shrink-0 animate-pulse overflow-hidden">
                     {/* Placeholder for uploaded image */}
                     <div className="w-full h-full bg-gradient-to-br from-emerald-400/20 to-cyan-500/20" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-primary-light transition-colors">Local Park Cleanup</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{i} days ago • +50 Coins</p>
                  </div>
                  <div className="text-emerald-500 bg-emerald-500/10 p-2 rounded-full">
                    <CheckCircle size={16} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 rounded-xl border border-black/10 dark:border-white/10 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              View All History
            </button>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default Dashboard;
