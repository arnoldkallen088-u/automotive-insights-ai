import React, { useState } from "react";
import { Lock, Mail, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const success = onLogin(email, password);
      setLoading(false);
      if (success) navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] p-10 md:p-14 shadow-premium border border-white/50">
          <div className="text-center mb-12">
            <div className="bg-slate-950 w-20 h-20 rounded-[1.75rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-3">
              <ShieldCheck className="text-blue-500" size={32} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Dealer Portal</h2>
            <p className="text-slate-500 font-medium text-sm">Secure access for authorized AutoElite agents.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Verified Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent.identifier@autoelite.com"
                  className="w-full pl-14 pr-6 py-4 bg-white/50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Security Pass</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-white/50 border-2 border-slate-100 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-slate-950 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-slate-900/10 flex items-center justify-center space-x-3"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Initialize Session</span>
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
            <div className="flex items-start space-x-4 relative z-10">
              <div className="bg-blue-600/10 p-2 rounded-xl">
                <Sparkles className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-1">Sandbox Access</p>
                <div className="text-[10px] text-slate-500 font-bold leading-relaxed">
                  <span className="text-slate-400 uppercase tracking-wider">User:</span> arnoldkallen13@gmail.com<br/>
                  <span className="text-slate-400 uppercase tracking-wider">Code:</span> 14052005
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;