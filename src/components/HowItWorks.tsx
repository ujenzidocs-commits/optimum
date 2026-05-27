import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PhoneCall, Settings, Rocket, HeadphonesIcon } from 'lucide-react';
import Logo from './Logo';
import TallyLogo from './TallyLogo';

const steps = [
  { icon: PhoneCall, num: '01', title: 'Free Consultation', desc: 'Tell us about your business. We\'ll analyze your needs and recommend the right Tally Prime solution — Silver, Gold, Plus, Enterprise, or Custom TDL.', color: 'from-yellow-400 to-blue-400' },
  { icon: Settings, num: '02', title: 'Setup & Migration', desc: 'Our certified team installs Tally Prime, migrates your data from Excel, QuickBooks, or Sage, and configures KRA/eTIMS compliance.', color: 'from-blue-500 to-cyan-400' },
  { icon: Rocket, num: '03', title: 'Training & Go Live', desc: 'Comprehensive hands-on training for your team — accounting, inventory, payroll, and reporting. Go live with confidence.', color: 'from-purple-500 to-pink-400' },
  { icon: HeadphonesIcon, num: '04', title: 'Ongoing Support', desc: '24/7 remote support with < 1 hour response time. Regular updates, health checks, and on-site visits when you need them.', color: 'from-amber-500 to-orange-400' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-blue-900/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">Our Process</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">
            From Discovery to Operational Traction — A Practical 6-Step Approach
          </h2>
          <p className="mt-4 text-navy-600 dark:text-navy-300">
            We align systems, cloud infrastructure, and workflows to deliver faster reporting, accountability, and scalable operations across locations.
          </p>
        </motion.div>

        <div className="mt-16 relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-yellow-400/20 via-accent/40 to-yellow-600/20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="relative text-center group">
                  {/* Step Circle */}
                  <div className="relative mx-auto mb-6">
                    <div className={`mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br ${step.color} p-[2px] shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <div className="h-full w-full rounded-3xl bg-white dark:bg-navy-950 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-navy-800 dark:text-white" />
                      </div>
                    </div>
                    {/* Number Badge */}
                    <div className={`absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-xs font-bold text-white shadow-lg`}>
                      {step.num}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy-600 dark:text-navy-600 leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA like Tally's "Ready to fall in love" */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-20 rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-700 p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,38,38,0.22),transparent_60%)]" />
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Ready to transform your business? 🚀
            </h3>
            <p className="mt-3 text-navy-300 max-w-xl mx-auto">
              Join 500+ Kenyan businesses already running smarter with Tally Prime. Get the full experience with a free, personalized demo.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/contact" className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-red-700 shadow-xl shadow-red-400/20 hover:bg-red-50 transition-all hover:scale-105">
                Request Free Demo
              </Link>
              <a href="https://tallysolutions.com/ssa/download/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all">
                <TallyLogo className="h-5 w-auto" />
                Download TallyPrime
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3 text-sm text-white/70">
              <Logo className="h-6 w-auto text-white" variant="icon" />
              <span>Powered by Optimum Prime Solutions</span>
            </div>
            <p className="mt-6 text-xs text-navy-600">
              ✓ No commitment required · ✓ Free installation help · ✓ KRA & eTIMS pre-configured
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
