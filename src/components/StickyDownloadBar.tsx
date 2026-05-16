import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, ArrowRight } from 'lucide-react';

export default function StickyDownloadBar() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (dismissed) return;
      setShow(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          className="fixed top-0 inset-x-0 z-[60] bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-b border-white/10 shadow-xl"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-11">
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-accent/20 flex items-center justify-center">
                    <Download className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <span className="text-xs font-medium text-white/80">
                    Try TallyPrime free — Education Mode, no license needed
                  </span>
                </div>
                <span className="sm:hidden text-xs font-medium text-white/80">
                  Try TallyPrime free
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://tallysolutions.com/ssa/download/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-[11px] font-bold text-white hover:bg-accent-dark transition"
                >
                  Download Now
                  <ArrowRight className="h-3 w-3" />
                </a>
                <button
                  onClick={() => setDismissed(true)}
                  className="p-1 text-white/40 hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
