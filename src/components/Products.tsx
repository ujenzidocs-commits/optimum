import { motion } from 'framer-motion';
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
    <section id="products" className="relative py-32 bg-gradient-to-b from-navy-50 to-white dark:from-navy-900/50 dark:to-navy-950 overflow-hidden">
      {/* Background animation */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-40 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30 -ml-48 -mb-48" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            Pricing Plans
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-white leading-tight">
            Choose Your <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">TallyPrime License</span>
          </h2>
          <p className="mt-6 text-lg text-navy-600 dark:text-navy-300 leading-relaxed">
            Silver, Gold, Plus, Enterprise deployment, and TDL customization. Pick the plan that fits your business size and needs.
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
                  ? 'border-accent bg-gradient-to-br from-accent/10 to-blue-500/5 dark:from-accent/20 dark:to-blue-500/10 shadow-2xl shadow-accent/25 xl:scale-[1.05]'
                  : 'border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800/50 hover:shadow-xl hover:shadow-accent/10'
              }`}
            >
              {/* Badge */}
              {p.popular && (
                <motion.div
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-blue-600 px-4 py-1.5 text-xs font-bold text-white flex items-center gap-1.5 shadow-lg"
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
                  <div className="inline-block p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                    <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                {p.edition === 'Gold' && (
                  <div className="inline-block p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
                    <Crown className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                )}
                {['Plus', 'Enterprise'].some(e => p.edition.includes(e)) && (
                  <div className="inline-block p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                    <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
              </motion.div>

              {/* Pricing */}
              <div className="relative z-10 text-center">
                <p className="text-sm font-medium text-navy-500 dark:text-navy-400">{p.name}</p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-2xl font-bold text-navy-900 dark:text-white mt-2"
                >
                  {p.edition}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <span className="text-3xl font-extrabold text-navy-900 dark:text-white">
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
                <p className="text-xs text-navy-500 dark:text-navy-400 mt-1">{p.period}</p>
              </div>

              {/* Features */}
              <ul className="mt-8 space-y-3 relative z-10">
                {p.features.map((f, idx) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-start gap-3 text-xs text-navy-700 dark:text-navy-300"
                  >
                    <motion.div whileHover={{ scale: 1.2 }}>
                      <Check className="mt-0.5 h-4 w-4 text-accent shrink-0" />
                    </motion.div>
                    <span>{f}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`mt-8 block text-center rounded-xl py-3 text-sm font-semibold transition relative z-10 ${
                  p.popular
                    ? 'bg-gradient-to-r from-accent to-blue-600 text-white hover:shadow-lg hover:shadow-accent/40 shadow-lg shadow-accent/25'
                    : 'bg-navy-100 dark:bg-navy-700 text-navy-900 dark:text-white hover:bg-navy-200 dark:hover:bg-navy-600'
                }`}
              >
                {p.cta}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

