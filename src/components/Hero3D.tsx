import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import WhatsAppIcon from './WhatsAppIcon';
import { useSite } from '../context/SiteContext';

export default function Hero3D() {
  const { data } = useSite();

  return (
    <section id="home" className="relative overflow-hidden bg-slate-50">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-slate-100 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <Logo className="h-12 w-auto text-blue-950" variant="icon" />
            </div>

            <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Optimum Prime Solutions Ltd.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Cloud Simplified, Business Amplified.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">
                Request Demo
              </Link>
              <a
                href={`https://wa.me/${data.contact.whatsapp}?text=Hi,%20I%20am%20interested%20in%20your%20services`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-green-500/30 hover:bg-green-700 transition-all"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                Chat on WhatsApp
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {[
                { title: 'KRA compliant', description: 'Accurate tax-ready accounting.' },
                { title: 'Inventory control', description: 'Real-time stock intelligence.' },
              ].map((item) => (
                <div key={item.title} className="surface rounded-3xl p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{item.title}</p>
                  <p className="mt-3 text-base text-slate-700">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-soft">
              <div className="bg-slate-950 p-6 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Business overview</p>
                    <h2 className="mt-3 text-3xl font-semibold">Performance by metric</h2>
                  </div>
                  <div className="rounded-3xl bg-white/10 px-4 py-2 text-xs text-white/80">Live</div>
                </div>
              </div>

              <div className="space-y-6 p-6">
                {[
                  { label: 'Clients', value: '85%', accent: 'bg-red-600' },
                  { label: 'Compliance', value: '98%', accent: 'bg-red-700' },
                  { label: 'Uptime', value: '99.9%', accent: 'bg-red-500' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                    <div className="h-3 rounded-full bg-slate-800">
                      <div className={`h-full rounded-full ${item.accent}`} style={{ width: item.value }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 bg-slate-950 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Active users</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">500+</h3>
                  </div>
                  <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Response time</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">1 hr</h3>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
