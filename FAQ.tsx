import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { useSite } from '../context/SiteContext';
export default function FAQ() {
  const { data } = useSite();
  const [openId, setOpenId] = useState<string|null>(null);
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const cats = useMemo(()=>['All', ...Array.from(new Set(data.faqs.map(f=>f.cat)))],[data.faqs]);
  const filtered = useMemo(()=>{
    let items = data.faqs;
    if(activeCat!=='All') items = items.filter(f=>f.cat===activeCat);
    if(search.trim()){ const q=search.toLowerCase(); items=items.filter(f=>f.q.toLowerCase().includes(q)||f.a.toLowerCase().includes(q)); }
    return items;
  },[data.faqs,activeCat,search]);
  return (
    <section id="faq" className="py-24 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent"><HelpCircle className="h-3.5 w-3.5"/>FAQ</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Frequently Asked Questions</h2>
        </motion.div>
        <div className="mt-8 relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search questions..." className="w-full rounded-xl border border-navy-200 dark:border-navy-700 bg-navy-50 dark:bg-navy-800 pl-11 pr-4 py-3.5 text-sm outline-none focus:border-accent"/></div>
        <div className="mt-4 flex flex-wrap gap-2">{cats.map(c=><button key={c} onClick={()=>setActiveCat(c)} className={`rounded-lg px-3.5 py-2 text-xs font-medium transition ${activeCat===c?'bg-navy-900 dark:bg-accent text-white':'bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-200'}`}>{c}</button>)}</div>
        <div className="mt-6 space-y-2.5">{filtered.map(faq=>(
          <div key={faq.id} className={`rounded-xl border transition-all ${openId===faq.id?'border-accent/30 bg-white dark:bg-navy-800 shadow-md':'border-navy-100 dark:border-navy-700 bg-navy-50/50 dark:bg-navy-800/50 hover:border-navy-200'}`}>
            <button onClick={()=>setOpenId(openId===faq.id?null:faq.id)} className="flex w-full items-center gap-3 p-5 text-left">
              <HelpCircle className={`h-5 w-5 shrink-0 ${openId===faq.id?'text-accent':'text-navy-400'}`}/>
              <span className="flex-1 text-sm font-semibold text-navy-900 dark:text-white">{faq.q}</span>
              <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform ${openId===faq.id?'rotate-180':''}`}/>
            </button>
            <AnimatePresence>{openId===faq.id&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
              <div className="px-5 pb-5 pl-13 text-sm text-navy-600 dark:text-navy-300 leading-relaxed">{faq.a}<span className="mt-2 inline-block rounded-full bg-navy-100 dark:bg-navy-700 px-2 py-0.5 text-[10px] text-navy-500 ml-2">{faq.cat}</span></div>
            </motion.div>}</AnimatePresence>
          </div>
        ))}</div>
      </div>
    </section>
  );
}
