import { motion } from 'framer-motion';
import { Package, BookOpen, Wallet, Factory, FileCheck, Code, Headphones, BarChart3, ArrowRight, Sparkles, ExternalLink, type LucideIcon } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const iconMap: Record<string, LucideIcon> = {
  Package, BookOpen, Wallet, Factory, FileCheck, Code, Headphones, BarChart3, Download: Package
};

export default function Features() {
  const { data } = useSite();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="services" className="relative py-32 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 overflow-hidden perspective">
      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20 font-sans">
          <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block">
            <Sparkles className="h-5 w-5 text-red-500" />
          </motion.span>
          <span className="inline-block rounded-full bg-blue-900/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300 ml-2">Our Services</span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Business Systems, Cloud Hosting & Operational Consulting
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            We design and implement systems that deliver financial clarity, centralized reporting, and operational traction — combining TallyPrime expertise with secure cloud hosting and process optimization.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px' }}
        >
          {data.services.map((svc) => {
            const Ic = iconMap[svc.icon] || Package;
            return (
              <motion.div
                key={svc.id}
                variants={itemVariants}
                whileHover={{ y: -12, rotateX: -5, transition: { duration: 0.3 } }}
                className="group relative rounded-2xl border border-slate-800 bg-slate-950/95 p-6 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-red-900/25 transition-all duration-300 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient border on hover */}
                <motion.div
                  className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-yellow-400 via-blue-500 to-yellow-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />

                {/* Background shine effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />

                {/* Icon background animation */}
                <motion.div
                  className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-600/20 to-white/10 flex items-center justify-center mb-4 relative overflow-hidden"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <Ic className="h-6 w-6 text-red-400 relative z-10" />
                </motion.div>

                <h3 className="text-base font-bold text-white group-hover:text-red-300 transition-colors">
                  {svc.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-2">
                  {svc.desc}
                </p>

                {/* Features list */}
                <ul className="mt-4 space-y-2">
                  {svc.features.slice(0, 2).map((f) => (
                    <motion.li
                      key={f}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-xs text-gray-300 dark:text-gray-400"
                    >
                      <motion.span
                        className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500"
                        whileHover={{ scale: 1.2 }}
                      />
                      {f}
                    </motion.li>
                  ))}
                  {svc.features.length > 2 && (
                    <li className="text-xs text-yellow-600 font-semibold">+{svc.features.length - 2} more</li>
                  )}
                </ul>

                {/* CTA */}
                <motion.a
                  href={svc.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (svc.link) {
                      e.preventDefault();
                      window.open(svc.link, '_blank');
                    }
                  }}
                  whileHover={{ x: 4 }}
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-red-300 hover:text-red-200 transition group/link cursor-pointer"
                >
                  View on Tally
                  <motion.div whileHover={{ x: 2 }} className="group-hover/link:text-yellow-600-dark">
                    <ExternalLink className="h-3 w-3" />
                  </motion.div>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

