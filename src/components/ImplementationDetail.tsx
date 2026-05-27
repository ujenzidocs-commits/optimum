import { motion } from 'framer-motion';
import { CheckCircle2, Database, FileCheck2, Headphones, Layers, ShieldCheck } from 'lucide-react';

const delivery = [
  {
    icon: Layers,
    title: 'License Advisory',
    points: ['Silver for single-user operations', 'Gold for multi-user teams', 'Plus for support-led growth', 'Enterprise for branches and high-volume usage'],
  },
  {
    icon: Database,
    title: 'Data Migration',
    points: ['Opening balances', 'Customer and supplier ledgers', 'Stock items and units', 'Historical transactions where required'],
  },
  {
    icon: FileCheck2,
    title: 'KRA & eTIMS Setup',
    points: ['VAT return configuration', 'PAYE/NHIF/NSSF readiness', 'Tax invoice formats', 'Audit trail and reporting controls'],
  },
  {
    icon: Headphones,
    title: 'Support Framework',
    points: ['Remote troubleshooting', 'User training refreshers', 'Periodic health checks', 'Priority escalation for critical issues'],
  },
];

const controls = [
  'Role-based access for finance, store, payroll, and management users',
  'Backup planning for local, cloud, and hybrid deployment environments',
  'Approval-ready reports for auditors, directors, tax teams, and accountants',
  'Documented setup notes so your internal team understands every configuration',
];

export default function ImplementationDetail() {
  return (
    <section className="relative py-24 bg-navy-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(37,99,235,0.20),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full border border-blue-700/20 bg-blue-900/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
            Implementation & Cloud Hosting
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-bold tracking-tight">
            End-to-end systems delivery — implementation, hosting, and operational enablement
          </h2>
          <p className="mt-4 text-navy-700 leading-relaxed">
            We combine deep TallyPrime expertise with secure cloud infrastructure and process design to deliver reliable reporting, resilient operations, and measurable business outcomes.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-4 gap-5">
          {delivery.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-900/10 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-base font-bold">{item.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-navy-700 leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600-light" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:p-8"
        >
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
            <div>
              <div className="h-12 w-12 rounded-2xl bg-yellow-400/15 flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-yellow-600-light" />
              </div>
              <h3 className="text-xl font-bold">Controls that protect your business</h3>
              <p className="mt-3 text-sm leading-relaxed text-navy-300">
                Every setup is designed for accountability, continuity, and compliance. This is the difference between basic installation and a serious business system.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {controls.map((control) => (
                <div key={control} className="rounded-xl border border-white/10 bg-navy-900/70 p-4 text-sm text-navy-200">
                  {control}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}