import { motion } from 'framer-motion';
import { Package, BookOpen, Wallet, Factory, FileCheck, Code, Headphones, BarChart3, ArrowRight, type LucideIcon } from 'lucide-react';
import { useSite } from '../context/SiteContext';
const iconMap:Record<string,LucideIcon>={Package,BookOpen,Wallet,Factory,FileCheck,Code,Headphones,BarChart3,Download:Package};
export default function Features() {
  const { data } = useSite();
  return (
    <section id="services" className="py-24 bg-navy-50/50 dark:bg-navy-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">Our Services</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">End-to-End Tally Prime Solutions</h2>
          <p className="mt-4 text-navy-600 dark:text-navy-300">From installation to customization, we cover every aspect of your business management needs.</p>
        </motion.div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.map((svc,i) => {
            const Ic = iconMap[svc.icon] || Package;
            return (
              <motion.div key={svc.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.05}}
                className="group relative rounded-2xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800/50 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
                <div className="absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r from-accent to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity"/>
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4"><Ic className="h-6 w-6 text-accent"/></div>
                <h3 className="text-base font-bold text-navy-900 dark:text-white">{svc.title}</h3>
                <p className="mt-2 text-sm text-navy-600 dark:text-navy-300 leading-relaxed line-clamp-3">{svc.desc}</p>
                <ul className="mt-4 space-y-1.5">{svc.features.map(f=><li key={f} className="flex items-center gap-2 text-xs text-navy-500 dark:text-navy-400"><span className="h-1 w-1 rounded-full bg-accent"/>{f}</li>)}</ul>
                <a href="#contact" className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent-dark transition">Learn more <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform"/></a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
