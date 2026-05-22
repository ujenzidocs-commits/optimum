import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Moon, Sun } from 'lucide-react';
import Logo from './Logo';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Blog', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl shadow-lg shadow-navy-900/5' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          <motion.a href="#home" whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            <Logo className="h-10 w-auto" variant="full" />
          </motion.a>

          <div className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <motion.a
                key={l.href}
                href={l.href}
                whileHover={{ y: -2 }}
                className={`px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  scrolled
                    ? 'text-navy-600 hover:text-navy-900 hover:bg-navy-50 dark:text-navy-300 dark:hover:text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-lg transition ${scrolled ? 'text-navy-500 hover:bg-navy-50' : 'text-white/70 hover:bg-white/10'}`}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-yellow-400/25 hover:bg-yellow-500-dark transition-all"
            >
              <Phone className="h-3.5 w-3.5" />
              Request Demo
            </motion.a>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setOpen(!open)}
            className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-navy-700' : 'text-white'}`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-navy-950 border-t border-navy-100 dark:border-navy-800 shadow-xl"
          >
            <div className="px-4 py-4 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block mt-2 text-center rounded-lg bg-yellow-500 px-4 py-3 text-sm font-semibold text-white"
              >
                Request Demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
