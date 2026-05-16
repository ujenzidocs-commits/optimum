import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Moon, Sun } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const links = [
  { label: 'Home', href: '#home' },{ label: 'About', href: '#about' },{ label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },{ label: 'Industries', href: '#industries' },
  { label: 'Blog', href: '#blog' },{ label: 'FAQ', href: '#faq' },{ label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { data } = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { document.body.classList.toggle('dark', dark); }, [dark]);

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl shadow-lg shadow-navy-900/5' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-black text-sm ${scrolled ? 'bg-navy-900 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>OP</div>
            <div className="flex flex-col"><span className={`text-base font-bold leading-tight ${scrolled ? 'text-navy-900 dark:text-white' : 'text-white'}`}>{data.company.name.split(' ')[0]}</span><span className="text-[9px] font-semibold uppercase tracking-[.2em] text-accent">Prime Solutions</span></div>
          </a>
          <div className="hidden lg:flex items-center gap-0.5">
            {links.map(l => (
              <a key={l.href} href={l.href} className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${scrolled ? 'text-navy-600 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-300 dark:hover:text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>{l.label}</a>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setDark(!dark)} className={`p-2 rounded-lg transition ${scrolled ? 'text-navy-500 hover:bg-navy-50' : 'text-white/70 hover:bg-white/10'}`}>{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
            <a href="#contact" className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-dark transition-all"><Phone className="h-3.5 w-3.5" />Request Demo</a>
          </div>
          <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy-700' : 'text-white'}`}>{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white dark:bg-navy-950 border-t border-navy-100 dark:border-navy-800 shadow-xl">
            <div className="px-4 py-4 space-y-1">
              {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block px-4 py-3 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800">{l.label}</a>)}
              <a href="#contact" onClick={() => setOpen(false)} className="block mt-2 text-center rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white">Request Demo</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
