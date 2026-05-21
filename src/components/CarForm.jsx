import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, X, Sparkles, Upload, Trash2, Camera, Info, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const CarForm = ({ cars = [], onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    id: Math.random().toString(36).substr(2, 9),
    make: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    type: "Sedan",
    fuelType: "Gasoline",
    transmission: "Automatic",
    description: "",
    status: "Available",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800",
    features: [],
    aiTags: ["Premium"]
  });

  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (isEditing && cars.length > 0) {
      const carToEdit = cars.find(c => c.id === id);
      if (carToEdit) {
        setFormData(carToEdit);
      }
    }
  }, [id, cars, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: Number(formData.price) });
    toast.success(isEditing ? "Entity Specification Updated" : "Unit Successfully Onboarded");
    navigate("/dashboard/cars");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-5xl mx-auto space-y-12"
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 text-blue-600 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Authorized Entry</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            {isEditing ? "Modify Specification" : "Entity Initialization"}
          </h1>
          <p className="text-slate-500 font-medium mt-2">Defining parameters for global inventory distribution.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/cars")}
          className="p-4 text-slate-400 hover:text-slate-950 bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Photo & Quick Info */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center">
                <Camera size={16} className="mr-2 text-blue-600" />
                Asset Capture
              </h3>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">HD Preview</span>
            </div>
            
            <div className="aspect-[4/3] rounded-3xl bg-slate-100 overflow-hidden relative group border-2 border-slate-50">
              <img 
                src={formData.image} 
                alt="Preview" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <button type="button" className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl flex items-center space-x-2">
                   <Upload size={14} />
                   <span>Upload RAW</span>
                </button>
              </div>
            </div>
            
            <div className="mt-8 space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Secure Image Link</label>
              <input 
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-[11px] font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-inner"
              />
            </div>
          </div>

          <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-600/30 transition-colors"></div>
            <h3 className="text-[11px] font-black mb-6 flex items-center text-blue-400 uppercase tracking-widest relative z-10">
              <Sparkles size={16} className="mr-2" />
              AI CONFIG ENGINE
            </h3>
            <p className="text-[11px] text-slate-400 font-bold leading-relaxed mb-8 relative z-10">
              Automated heuristics suggest high engagement for <span className="text-white">{formData.make}</span> entities in the <span className="text-white">{formData.type}</span> category.
            </p>
            <div className="flex flex-wrap gap-2 relative z-10">
              {formData.aiTags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Details Form */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Manufacturer Entity</label>
                <input 
                  required
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  placeholder="e.g. Porsche"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase tracking-tight"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Model Designation</label>
                <input 
                  required
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. Taycan Turbo S"
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase tracking-tight"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Model Year</label>
                <input 
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-3 md:col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Valuation (MSRP)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-black">$</span>
                  <input 
                    required
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full pl-10 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-lg font-black outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all tracking-tighter"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Energy Source</label>
                <select 
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase"
                >
                  <option>Gasoline</option>
                  <option>Diesel</option>
                  <option>Electric</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Global Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-black outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all uppercase"
                >
                  <option>Available</option>
                  <option>Reserved</option>
                  <option>Sold</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 flex items-center">
                 <Info size={14} className="mr-2" />
                 Premium Features
              </label>
              <div className="flex gap-3">
                <input 
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="e.g. Burmester Audio"
                  className="flex-1 px-6 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <button 
                  type="button" 
                  onClick={addFeature}
                  className="bg-slate-950 text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl"
                >
                  Append
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.features.map((feature, idx) => (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={idx} 
                    className="group flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-100 hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-colors cursor-pointer"
                    onClick={() => removeFeature(idx)}
                  >
                    <span>{feature}</span>
                    <Trash2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="pt-10 flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-slate-950 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-3 group"
              >
                <Save size={20} />
                <span>{isEditing ? "Finalize Update" : "Onboard Asset"}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/cars")}
                className="px-12 py-5 bg-slate-100 text-slate-500 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-200 hover:text-slate-900 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CarForm;