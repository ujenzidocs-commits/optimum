import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Star, TrendingUp, Zap, Crown } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export default function Products() {
  const { data } = useSite();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="products" className="relative py-32 bg-gradient-to-br from-red-700 via-red-600 to-red-700 overflow-hidden">
      {/* Background animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/30 rounded-full blur-3xl opacity-70 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700/30 rounded-full blur-3xl opacity-40 -ml-48 -mb-48" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block rounded-full bg-blue-900/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Services Overview
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Solutions for Systems, Cloud & Scalable Operations
          </h2>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            From implementation and hosting to process optimization and reporting, choose the combination of services that delivers operational traction and growth for your business.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 xl:grid-cols-5 gap-5"
        >
          {data.products.map((p, i) => (
            <motion.div
              key={p.id}
              variants={itemVariants}
              whileHover={{ y: p.popular ? 0 : -8 }}
              className={`group relative rounded-2xl border p-8 transition-all duration-300 overflow-hidden ${
                p.popular
                  ? 'border-red-500/40 bg-gradient-to-br from-red-700 via-red-600 to-red-700 shadow-2xl shadow-red-900/40 xl:scale-[1.05] text-white'
                  : 'border-slate-800 bg-slate-950/95 hover:shadow-xl hover:shadow-black/20'
              }`}
            >
              {/* Badge */}
              {p.popular && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600 px-4 py-1.5 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg"
                >
                  <Star className="h-3.5 w-3.5" />
                  Most Popular
                </motion.div>
              )}

              {/* Background shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />

              {/* Icon */}
              <motion.div className="relative z-10 mb-6">
                {p.edition === 'Silver' && (
                  <div className="inline-block p-3 rounded-xl bg-red-500/10">
                    <Zap className="h-6 w-6 text-red-400" />
                  </div>
                )}
                {p.edition === 'Gold' && (
                  <div className="inline-block p-3 rounded-xl bg-red-600/10">
                    <Crown className="h-6 w-6 text-red-300" />
                  </div>
                )}
                {['Plus', 'Enterprise'].some(e => p.edition.includes(e)) && (
                  <div className="inline-block p-3 rounded-xl bg-slate-800/60">
                    <TrendingUp className="h-6 w-6 text-slate-200" />
                  </div>
                )}
              </motion.div>

              {/* Pricing */}
              <div className="relative z-10 text-center">
                <p className="text-sm font-medium text-slate-400">{p.name}</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-2xl font-bold text-white mt-2"
                >
                  {p.edition}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <span className="text-3xl font-extrabold text-white">
                    {p.price.includes('KES') && p.price.match(/\d+/)?.[0] ? (
                      <motion.span
                        key={p.price}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {p.price}
                      </motion.span>
                    ) : (
                      p.price
                    )}
                  </span>
                </motion.div>
                <p className="text-xs text-slate-400 mt-1">{p.period}</p>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-3 relative z-10">
                {p.features.map((f, idx) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-xs text-slate-300"
                  >
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Check className="mt-0.5 h-4 w-4 text-yellow-600 shrink-0" />
                    </motion.div>
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <Link
                  to="/contact"
                  className={`block text-center rounded-xl py-3 text-sm font-semibold transition relative z-10 ${
                    p.popular
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-lg hover:shadow-red-900/25 shadow-lg shadow-red-900/20'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {p.cta}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

