import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Download, MessageCircle, Play, BarChart3, Sparkles, Zap } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Hero() {
  const { data } = useSite();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // 3D Tagline animation
  const taglineVariants = {
    hidden: { opacity: 0, rotateX: 90 },
    visible: {
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1, ease: "easeOut" }
    },
    animate: {
      y: [-4, 4, -4],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };
  
  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ y: [0, 30, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" 
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(37,99,235,0.12),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-6">
              <motion.span 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2"
              >
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              </motion.span>
              <motion.span 
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(37, 99, 235, 0.2)" }}
              >
                #1 TallyPrime Partner in Kenya
              </motion.span>
            </div>

            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight"
              style={{ perspective: "1200px" }}
            >
              <motion.span
                initial={{ opacity: 0, rotateX: 15 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                Transform Your Business with{' '}
              </motion.span>
              <motion.span 
                className="relative inline-block"
                initial={{ opacity: 0, rotateX: 15, scale: 0.95 }}
                animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="bg-gradient-to-r from-accent via-blue-200 to-accent bg-clip-text text-transparent animate-gradient">
                  Smart Tally Prime
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, rotateX: 15 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {' '}Solutions
              </motion.span>
            </motion.h1>

            {/* 3D Tagline */}
            <motion.div
              initial={{ opacity: 0, rotateX: 90, y: 20 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              style={{ perspective: "1200px" }}
              className="mt-4"
            >
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-accent/20 via-accent/10 to-blue-500/20 px-5 py-3 border border-accent/30 backdrop-blur-sm"
              >
                <Zap className="h-5 w-5 text-accent animate-pulse" />
                <span className="text-lg font-semibold bg-gradient-to-r from-accent to-blue-300 bg-clip-text text-transparent">
                  {data.company?.tagline || 'Smart Business Solutions For Smart Entrepreneurs'}
                </span>
              </motion.div>
            </motion.div>

            <p className="mt-6 text-lg text-navy-300 leading-relaxed max-w-lg">
              Run your business like a pro. From accounting & inventory to KRA compliance & eTIMS — we implement, customize, and support TallyPrime for Kenyan businesses of all sizes.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a 
                href="#contact" 
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-4 text-sm font-bold text-white shadow-xl shadow-accent/25 hover:bg-accent-dark hover:scale-[1.02] transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Request Demo
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.a>
              <motion.a 
                href={`https://wa.me/${data.contact.whatsapp}?text=Hi%20Optimum%20Prime%20Solutions,%20I'm%20interested%20in%20TallyPrime`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, borderColor: "rgba(37, 99, 235, 0.5)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <MessageCircle className="h-4 w-4 text-blue-200" />
                </motion.div>
                Chat on WhatsApp
              </motion.a>
              <motion.a 
                href="https://tallysolutions.com/ssa/download/" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Download className="h-4 w-4 text-accent" /> Download Tally
              </motion.a>
            </div>

            {/* Trust Signals */}
            <div className="mt-8 flex flex-wrap gap-5">
              {['KRA & eTIMS Compliant', '24/7 Support', 'Certified Partner', 'Free Training'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-navy-400">
                  <CheckCircle className="h-4 w-4 text-accent" />{t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — Dashboard Mockup */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block">
            <div className="relative">
              {/* Main Card */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-white">Business Dashboard</h3>
                  </div>
                  <span className="rounded-full bg-accent/20 px-3 py-1 text-[10px] font-semibold text-accent animate-pulse-glow">● Live</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { l: 'Revenue', v: 'KES 12.5M', c: 'text-accent', d: '↑ 23% this quarter' },
                    { l: 'Expenses', v: 'KES 8.2M', c: 'text-red-400', d: '↓ 5% optimized' },
                    { l: 'Inventory', v: '2,847 items', c: 'text-amber-400', d: 'All tracked' },
                    { l: 'Payroll', v: '156 staff', c: 'text-cyan-400', d: 'PAYE compliant' },
                  ].map(x => (
                    <div key={x.l} className="rounded-xl bg-white/[0.04] border border-white/5 p-3.5">
                      <p className="text-[10px] text-navy-400 font-medium">{x.l}</p>
                      <p className="mt-1 text-xl font-bold text-white">{x.v}</p>
                      <p className={`text-[10px] mt-0.5 ${x.c}`}>{x.d}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div>
                  <p className="text-[10px] text-navy-400 font-medium mb-2">Monthly Performance</p>
                  <div className="flex items-end gap-1.5 h-20">
                    {[35, 55, 45, 70, 60, 85, 70, 80, 90, 65, 82, 88].map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className="flex-1 rounded-t bg-gradient-to-t from-accent to-accent-light" />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5 text-[8px] text-navy-500">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'].map(m => <span key={m}>{m}</span>)}
                  </div>
                </div>
              </div>

              {/* KRA Floating Badge */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 rounded-xl border border-white/10 bg-navy-900/95 p-3.5 shadow-2xl backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Play className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-navy-400 font-medium">KRA & eTIMS</p>
                    <p className="text-sm font-bold text-accent">Compliant ✓</p>
                  </div>
                </div>
              </motion.div>

              {/* Users Online Badge */}
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -top-3 -right-3 rounded-xl border border-white/10 bg-navy-900/95 p-3 shadow-xl backdrop-blur">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    {['bg-accent', 'bg-blue-500', 'bg-purple-500'].map((c, i) => (
                      <div key={i} className={`h-6 w-6 rounded-full ${c} border-2 border-navy-900 flex items-center justify-center text-[8px] font-bold text-white`}>
                        {['JM', 'GW', 'PO'][i]}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-navy-400">+497 users</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 80" fill="none">
          <path d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 36C840 40 960 48 1080 52C1200 56 1320 56 1380 56L1440 56V80H0Z" fill="white" className="dark:fill-[#0a1929]" />
        </svg>
      </div>
    </section>
  );
}
