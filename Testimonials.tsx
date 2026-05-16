import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useSite } from '../context/SiteContext';
export default function Testimonials() {
  const { data } = useSite();
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">Testimonials</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Trusted by Kenyan Businesses</h2>
        </motion.div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.testimonials.map((t,i)=>(
            <motion.div key={t.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
              className="group rounded-2xl border border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800/50 p-6 hover:shadow-lg transition-all">
              <Quote className="h-7 w-7 text-accent/20 mb-3"/>
              <div className="flex gap-0.5 mb-3">{Array.from({length:t.rating}).map((_,j)=><Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400"/>)}</div>
              <p className="text-sm text-navy-600 dark:text-navy-300 leading-relaxed">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-navy-50 dark:border-navy-700 pt-5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-xs font-bold text-white">{t.name.split(' ').map(n=>n[0]).join('')}</div>
                <div><p className="text-sm font-semibold text-navy-900 dark:text-white">{t.name}</p><p className="text-xs text-navy-500 dark:text-navy-400">{t.role}, {t.company}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
