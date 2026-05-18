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
    <section id="services" className="relative py-32 bg-gradient-to-b from-navy-50 via-white to-navy-50/50 dark:from-navy-900/50 dark:via-navy-950 dark:to-navy-900/50 overflow-hidden perspective">
      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
          <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block">
            <Sparkles className="h-5 w-5 text-accent" />
          </motion.span>
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent ml-2">Our Services</span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-white leading-tight">
            End-to-End <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">Tally Prime</span> Solutions
          </h2>
          <p className="mt-6 text-lg text-navy-600 dark:text-navy-300 leading-relaxed">
            From installation to customization, we cover every aspect of your business management needs with expert support and proven results.
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
                className="group relative rounded-2xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800/50 p-6 shadow-md hover:shadow-2xl hover:shadow-accent/30 transition-all duration-300 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Gradient border on hover */}
                <motion.div
                  className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-accent via-blue-500 to-accent"
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
                  className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-blue-500/10 flex items-center justify-center mb-4 relative overflow-hidden"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/30 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <Ic className="h-6 w-6 text-accent relative z-10" />
                </motion.div>

                <h3 className="text-base font-bold text-navy-900 dark:text-white group-hover:text-accent transition-colors">
                  {svc.title}
                </h3>
                <p className="mt-3 text-sm text-navy-600 dark:text-navy-300 leading-relaxed line-clamp-2">
                  {svc.desc}
                </p>

                {/* Features list */}
                <ul className="mt-4 space-y-2">
                  {svc.features.slice(0, 2).map((f) => (
                    <motion.li
                      key={f}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-xs text-navy-500 dark:text-navy-400"
                    >
                      <motion.span
                        className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-blue-500"
                        whileHover={{ scale: 1.2 }}
                      />
                      {f}
                    </motion.li>
                  ))}
                  {svc.features.length > 2 && (
                    <li className="text-xs text-accent font-semibold">+{svc.features.length - 2} more</li>
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
                  className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition group/link cursor-pointer"
                >
                  View on Tally
                  <motion.div whileHover={{ x: 2 }} className="group-hover/link:text-accent-dark">
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

