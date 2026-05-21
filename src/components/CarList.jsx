import React from "react";
import { Plus, Edit, Trash2, ExternalLink, Sparkles, ChevronRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CarList = ({ cars, setCars }) => {
  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-[1.5rem] shadow-premium border border-slate-100 flex flex-col gap-4 max-w-sm">
        <p className="font-bold text-slate-900 text-sm tracking-tight leading-relaxed">
          Permanent Deletion? This will remove the vehicle from active global inventory.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setCars(cars.filter(car => car.id !== id));
              toast.dismiss(t);
              toast.success("Inventory purged successfully");
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-colors"
          >
            Confirm
          </button>
          <button 
            onClick={() => toast.dismiss(t)}
            className="bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 mb-2">
            <Filter size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Inventory Core</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Global Stock</h1>
          <p className="text-slate-500 font-medium">Managing {cars.length} specialized automotive units.</p>
        </div>
        <Link 
          to="/dashboard/cars/add" 
          className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest flex items-center space-x-3 hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
        >
          <Plus size={18} />
          <span>Onboard New Unit</span>
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Asset Entity</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Specifications</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Evaluation</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Market Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Directives</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cars.map((car, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={car.id} 
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-5">
                      <div className="relative">
                         <img 
                          src={car.image} 
                          alt={car.model} 
                          className="w-16 h-16 rounded-2xl object-cover shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-500"
                        />
                        {idx === 0 && (
                          <div className="absolute -top-2 -left-2 bg-blue-600 text-white p-1 rounded-lg shadow-lg">
                            <Sparkles size={10} />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-950 tracking-tight text-base uppercase leading-tight">{car.make}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{car.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                       <span className="text-sm font-black text-slate-700 uppercase tracking-tighter">{car.year}</span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{car.type} / {car.fuelType}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-lg font-black text-slate-950 tracking-tighter leading-none">${car.price.toLocaleString()}</p>
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.1em]">MSRP Evaluation</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                      car.status === "Available" ? "bg-green-100 text-green-700 border border-green-200" : 
                      car.status === "Sold" ? "bg-red-50 text-white border border-red-100" : "bg-orange-50 text-orange-700 border border-orange-200"
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full mr-2 ${car.status === "Available" ? "bg-green-600" : car.status === "Sold" ? "bg-white" : "bg-orange-600 animate-pulse"}`}></div>
                      {car.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/dashboard/cars/edit/${car.id}`}
                        className="p-3 text-slate-400 hover:text-blue-600 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all"
                        title="Modify Entity"
                      >
                        <Edit size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(car.id)}
                        className="p-3 text-slate-400 hover:text-red-600 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all"
                        title="Purge Record"
                      >
                        <Trash2 size={16} />
                      </button>
                      <Link 
                        to="/"
                        className="p-3 text-slate-400 hover:text-slate-900 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-all"
                        title="Showroom Visualization"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {cars.length === 0 && (
          <div className="p-20 text-center">
             <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="text-slate-200" size={32} />
             </div>
             <p className="font-black text-slate-900 tracking-tight uppercase">Inventory Empty</p>
             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Begin onboarding to populate stock</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarList;