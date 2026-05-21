import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { TrendingUp, Users, Car, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = ({ cars }) => {
  const totalValue = cars.reduce((acc, car) => acc + car.price, 0);
  const soldCount = cars.filter(c => c.status === "Sold").length;

  const data = [
    { name: "Mon", sales: 4, leads: 12 },
    { name: "Tue", sales: 7, leads: 18 },
    { name: "Wed", sales: 5, leads: 14 },
    { name: "Thu", sales: 9, leads: 22 },
    { name: "Fri", sales: 12, leads: 30 },
    { name: "Sat", sales: 15, leads: 35 },
    { name: "Sun", sales: 10, leads: 25 },
  ];

  const statusData = [
    { name: "Available", value: cars.filter(c => c.status === "Available").length, color: "#2563eb" },
    { name: "Sold", value: soldCount, color: "#dc2626" },
    { name: "Reserved", value: cars.filter(c => c.status === "Reserved").length, color: "#d97706" },
  ];

  const stats = [
    { label: "Active Fleet", value: cars.length, icon: Car, trend: "+12%", color: "blue" },
    { label: "Market Value", value: `$${(totalValue / 1000).toFixed(1)}k`, icon: DollarSign, trend: "+8.2%", color: "emerald" },
    { label: "Conversion", value: `${((soldCount / cars.length) * 100).toFixed(1)}%`, icon: TrendingUp, trend: "+24%", color: "purple" },
    { label: "Client Inquiries", value: 142, icon: Users, trend: "+5.4%", color: "orange" },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <Activity size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Live Intelligence</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">OPERATIONS OVERVIEW</h1>
          <p className="text-slate-500 font-medium">Monitoring real-time inventory performance and dealer analytics.</p>
        </div>
        <div className="flex items-center space-x-3">
           <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Status</p>
              <p className="text-xs font-bold text-green-600 uppercase">Operational</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl">
              <ShieldCheck className="text-white" size={24} />
           </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-premium group cursor-default"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 rounded-2xl bg-slate-50 text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <stat.icon size={24} />
              </div>
              <span className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${stat.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                <span>{stat.trend}</span>
                {stat.trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </span>
            </div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className="text-3xl font-black text-slate-950 tracking-tighter">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Lead Performance</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Weekly conversion trajectory</p>
            </div>
            <div className="flex items-center bg-slate-50 p-1.5 rounded-full border border-slate-100">
               <button className="px-6 py-2 bg-white text-slate-950 text-[10px] font-black rounded-full shadow-sm uppercase tracking-wider">Weekly</button>
               <button className="px-6 py-2 text-slate-400 text-[10px] font-black uppercase tracking-wider">Monthly</button>
            </div>
          </div>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#2563eb" 
                  strokeWidth={5} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 4, stroke: '#fff' }}
                  activeDot={{ r: 10, strokeWidth: 0, fill: '#2563eb' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#cbd5e1" 
                  strokeWidth={3} 
                  strokeDasharray="8 8"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 flex items-center space-x-6 pt-8 border-t border-slate-50">
             <div className="flex items-center space-x-2">
                <div className="w-3 h-1.5 rounded-full bg-blue-600"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confirmed Sales</span>
             </div>
             <div className="flex items-center space-x-2">
                <div className="w-3 h-1.5 rounded-full bg-slate-300"></div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Projected Leads</span>
             </div>
          </div>
        </motion.div>

        {/* Status Breakdown */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
          
          <h3 className="text-xl font-black uppercase tracking-tight mb-2 relative z-10">Stock Allocation</h3>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-12 relative z-10">Inventory distribution</p>
          
          <div className="h-64 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={10}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-white">{cars.length}</span>
              <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">Units</span>
            </div>
          </div>
          
          <div className="space-y-4 mt-12 relative z-10">
            {statusData.map((item) => (
              <div key={item.name} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">{item.name}</span>
                </div>
                <span className="text-sm font-black text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;