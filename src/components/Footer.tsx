import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useSite } from '../context/SiteContext';
const links = [{l:'Home',h:'#home'},{l:'About',h:'#about'},{l:'Services',h:'#services'},{l:'Products',h:'#products'},{l:'Industries',h:'#industries'},{l:'Blog',h:'#blog'},{l:'FAQ',h:'#faq'},{l:'Contact',h:'#contact'}];
export default function Footer() {
  const { data } = useSite();
  const c = data.contact;
  return (
    <footer className="bg-navy-950 text-navy-300">
      <div className="border-b border-navy-800 bg-gradient-to-r from-accent/10 to-navy-900"><div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div><h3 className="text-xl font-bold text-white">Ready to transform your business?</h3><p className="mt-1 text-sm text-navy-400">Get a free Tally Prime demo today.</p></div>
        <a href="#contact" className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white hover:bg-accent-dark transition shadow-lg">Request Free Demo</a>
      </div></div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div><div className="flex items-center gap-2.5"><div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center font-black text-sm text-white">OP</div><div><p className="font-bold text-white">Optimum Prime</p><p className="text-[9px] uppercase tracking-[.2em] text-accent">Solutions</p></div></div><p className="mt-4 text-sm leading-relaxed text-navy-400">{data.company.tagline}. Your trusted Tally Prime partner in Kenya.</p>
            <div className="mt-5 space-y-2"><a href={`tel:${c.phones[0]?.replace(/\s/g,'')}`} className="flex items-center gap-2 text-sm hover:text-accent transition"><Phone className="h-3.5 w-3.5"/>{c.phones[0]}</a><a href={`mailto:${c.emails[0]}`} className="flex items-center gap-2 text-sm hover:text-accent transition"><Mail className="h-3.5 w-3.5"/>{c.emails[0]}</a><div className="flex items-center gap-2 text-sm"><MapPin className="h-3.5 w-3.5"/>{c.location}</div></div>
          </div>
          <div><h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Quick Links</h4><ul className="space-y-2.5">{links.map(l=><li key={l.h}><a href={l.h} className="text-sm hover:text-accent transition">{l.l}</a></li>)}</ul></div>
          <div><h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Services</h4><ul className="space-y-2.5">{data.services.slice(0,6).map(s=><li key={s.id}><a href="#services" className="text-sm hover:text-accent transition">{s.title}</a></li>)}</ul></div>
          <div><h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">Newsletter</h4><p className="text-sm text-navy-400 mb-4">Tally tips & business insights.</p><form onSubmit={e=>e.preventDefault()} className="flex gap-2"><input type="email" placeholder="Your email" className="flex-1 rounded-lg border border-navy-700 bg-navy-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-accent"/><button className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white hover:bg-accent-dark transition">Join</button></form></div>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"/>
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-xs text-navy-500">© {new Date().getFullYear()} {data.company.name}. All rights reserved.</p>
        <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} className="flex items-center gap-2 rounded-lg border border-navy-700 px-4 py-2 text-xs text-navy-400 hover:border-accent hover:text-accent transition"><ArrowUp className="h-3.5 w-3.5"/>Back to Top</button>
      </div>
    </footer>
  );
}
