import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useSite } from '../context/SiteContext';
export default function Products() {
  const { data } = useSite();
  return (
    <section id="products" className="py-24 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">Pricing</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Choose Your TallyPrime License</h2>
          <p className="mt-4 text-navy-600 dark:text-navy-300">Silver, Gold, Plus, enterprise deployment, and TDL customization. Prices can be updated anytime from the admin panel.</p>
        </motion.div>
        <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-5 gap-5">
          {data.products.map((p,i)=>(
            <motion.div key={p.id} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              className={`relative rounded-2xl border p-6 transition-all hover:shadow-xl ${p.popular?'border-accent bg-accent/5 dark:bg-accent/10 shadow-lg shadow-accent/10 xl:scale-[1.03]':'border-navy-100 dark:border-navy-700 bg-white dark:bg-navy-800/50'}`}>
              {p.popular&&<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white flex items-center gap-1"><Star className="h-3 w-3"/>Most Popular</div>}
              <div className="text-center">
                <p className="text-sm font-medium text-navy-500 dark:text-navy-400">{p.name}</p>
                <p className="text-xl font-bold text-navy-900 dark:text-white mt-1">{p.edition}</p>
                <p className="mt-4"><span className="text-2xl font-extrabold text-navy-900 dark:text-white">{p.price}</span></p>
                <p className="text-xs text-navy-500 dark:text-navy-400">{p.period}</p>
              </div>
              <ul className="mt-7 space-y-2.5">{p.features.map(f=><li key={f} className="flex items-start gap-2.5 text-xs text-navy-700 dark:text-navy-300"><Check className="mt-0.5 h-3.5 w-3.5 text-accent shrink-0"/>{f}</li>)}</ul>
              <a href="#contact" className={`mt-8 block text-center rounded-xl py-3 text-sm font-semibold transition ${p.popular?'bg-accent text-white hover:bg-accent-dark shadow-lg shadow-accent/25':'bg-navy-100 dark:bg-navy-700 text-navy-900 dark:text-white hover:bg-navy-200 dark:hover:bg-navy-600'}`}>{p.cta}</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
