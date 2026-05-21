import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ChevronRight, Fuel, Gauge, Zap, Car, ArrowRight } from "lucide-react";

const Showroom = ({ cars }) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.make.toLowerCase().includes(search.toLowerCase()) || 
                          car.model.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || car.fuelType === filter || car.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-0">
      {/* Hero Section */}
      <div className="relative rounded-[3rem] overflow-hidden mb-20 bg-slate-950 min-h-[500px] flex items-center px-12 shadow-2xl shadow-blue-900/10">
        <div className="z-10 relative max-w-2xl py-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.2em] rounded-full mb-8 uppercase"
          >
            <Sparkles size={12} />
            <span>2024 Collection Live</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter"
          >
            THE ART OF <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">PRECISION.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed font-medium"
          >
            Experience the pinnacle of automotive engineering with our curated selection of high-performance luxury vehicles.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-white text-slate-950 px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center space-x-2 shadow-xl shadow-white/5">
              <span>Explore Fleet</span>
              <ChevronRight size={18} />
            </button>
            <button className="bg-slate-900/50 backdrop-blur-md text-white border border-white/10 px-10 py-4 rounded-full font-black text-sm uppercase tracking-wider hover:bg-white/5 transition-all duration-300">
              View Special Offers
            </button>
          </motion.div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-3/4 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent z-10"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent z-10 h-1/3 bottom-0"></div>
           <Car className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] text-blue-500/10 stroke-[0.5]" />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 px-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
          {["All", "Electric", "Hybrid", "SUV", "Sedan", "Sports Car"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${
                filter === f 
                  ? "bg-slate-950 text-white shadow-2xl scale-105" 
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="relative group min-w-[320px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search make or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-14 pr-8 py-4 bg-white border-2 border-slate-100 rounded-full text-sm font-bold focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none w-full shadow-lg shadow-slate-200/50 transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredCars.map((car) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={car.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-premium transition-all duration-500"
            >
              <div className="aspect-[16/11] relative overflow-hidden bg-slate-100">
                <img 
                  src={car.image} 
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                  {car.aiTags.map(tag => (
                    <span key={tag} className="flex items-center space-x-1 px-3 py-1.5 bg-white/95 backdrop-blur-md text-[9px] font-black uppercase tracking-widest rounded-xl shadow-xl text-slate-900">
                      <Sparkles size={10} className="text-blue-600" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
                
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl border border-white/20 backdrop-blur-md ${
                    car.status === "Available" ? "bg-green-500/90 text-white" : 
                    car.status === "Sold" ? "bg-red-500/90 text-white" : "bg-orange-500/90 text-white"
                  }`}>
                    {car.status}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <button className="w-full bg-white text-slate-950 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-colors">
                     Configure Build
                   </button>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{car.year} {car.make}</p>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">{car.model}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-400 line-through mb-1">${(car.price * 1.05).toLocaleString()}</p>
                    <p className="text-2xl font-black text-slate-950 tracking-tighter">${car.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col items-center group/spec">
                    <Fuel size={16} className="text-slate-400 mb-2 group-hover/spec:text-blue-500 transition-colors" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{car.fuelType}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col items-center group/spec">
                    <Zap size={16} className="text-slate-400 mb-2 group-hover/spec:text-blue-500 transition-colors" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{car.transmission}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl flex flex-col items-center group/spec">
                    <Gauge size={16} className="text-slate-400 mb-2 group-hover/spec:text-blue-500 transition-colors" />
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{car.type}</span>
                  </div>
                </div>

                <button className="flex items-center justify-between w-full p-1 group/btn">
                  <span className="text-sm font-black uppercase tracking-widest text-slate-900">View Details</span>
                  <div className="bg-slate-950 text-white p-2.5 rounded-full group-hover/btn:bg-blue-600 group-hover/btn:translate-x-1 transition-all">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredCars.length === 0 && (
        <div className="text-center py-32 px-4">
          <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
            <Search className="text-slate-300" size={40} />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No Vehicles Match Your Search</h3>
          <p className="text-slate-500 font-medium">Try adjusting your filters or checking back later for new arrivals.</p>
        </div>
      )}
    </div>
  );
};

export default Showroom;