import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Clock, Users } from 'lucide-react';

function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { icon: Users, value: 500, suffix: '+', label: 'Businesses Served', desc: 'Across East Africa' },
  { icon: Award, value: 15, suffix: '+', label: 'Years Experience', desc: 'Certified expertise' },
  { icon: Shield, value: 99, suffix: '.9%', label: 'Uptime Guarantee', desc: 'Always available' },
  { icon: Clock, value: 1, suffix: 'hr', label: 'Avg Response Time', desc: '24/7 support' },
];

export default function TrustBanner() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.14),transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23fff' stroke-width='.5'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-4">
            <Shield className="h-4 w-4" />
            Certified TallyPrime Partner · eTIMS Compliant · KRA Approved
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Trusted by Kenyan Businesses Since 2009
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center group hover:border-accent/30 hover:bg-white/10 transition-all">
                <div className="mx-auto h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1.5 text-sm font-semibold text-white/80">{s.label}</p>
                <p className="mt-0.5 text-xs text-white/40">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Partner Logos Strip */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-60">
          {['TallyPrime', 'KRA Certified', 'eTIMS Ready', 'ISO Compliant', 'Cloud Enabled'].map(label => (
            <div key={label} className="flex items-center gap-2 text-xs font-medium text-white/50 uppercase tracking-wider">
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
