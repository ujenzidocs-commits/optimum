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
    <section id="faq" className="py-24 bg-blue-950 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="grid grid-cols-1 gap-10 md:grid-cols-3 items-start">
          <div className="md:col-span-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-200"><HelpCircle className="h-4 w-4 text-blue-200"/> FAQ</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="mt-4 text-sm text-slate-300">Answers to common questions about our services, implementation approach and compliance. Use the search or filter by category to find what you need.</p>
          </div>

          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-500"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search questions..." className="w-full rounded-xl border border-blue-700 bg-slate-950/90 pl-11 pr-4 py-3.5 text-sm text-white outline-none shadow-sm focus:ring-2 focus:ring-blue-300"/>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">{cats.map(c=>{
              const active = activeCat===c;
              return (
                <button key={c} onClick={()=>setActiveCat(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition ${active?'bg-blue-600 text-white shadow-blue-900/20 shadow':'bg-blue-900/20 text-blue-100 hover:bg-blue-800'}`}>
                  {c}
                </button>
              );
            })}</div>

            <div className="mt-6 grid gap-4">
              {filtered.length===0 && <div className="rounded-lg border border-blue-700 bg-blue-900/80 p-6 text-center text-sm text-slate-300">No matching questions. Try a different keyword or category.</div>}
              {filtered.map(faq=> (
                <div key={faq.id} className={`rounded-2xl border bg-blue-900/80 p-4 transition-transform ${openId===faq.id?'shadow-lg scale-100 border-blue-700':'shadow-sm hover:shadow-md hover:-translate-y-1'} `}>
                  <button onClick={()=>setOpenId(openId===faq.id?null:faq.id)} className="flex w-full items-start gap-3 text-left">
                    <HelpCircle className={`h-5 w-5 shrink-0 ${openId===faq.id?'text-blue-300':'text-slate-400'}`}/>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold text-white">{faq.q}</span>
                        <ChevronDown className={`h-4 w-4 text-navy-500 transition-transform ${openId===faq.id?'rotate-180':''}`}/>
                      </div>
                      <AnimatePresence>{openId===faq.id&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                        <div className="mt-3 text-sm text-slate-300 leading-relaxed">{faq.a}</div>
                        <div className="mt-3"><span className="inline-block rounded-full bg-navy-50 px-3 py-1 text-[11px] text-navy-700">{faq.cat}</span></div>
                      </motion.div>}</AnimatePresence>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
