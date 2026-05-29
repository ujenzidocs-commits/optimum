import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useSiteContent } from "../lib/useSiteContent";

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAH0AfQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9OKKKKsgKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAopGZVUszAKBkk9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FABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/2Q==";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useSiteContent();

  const phone = content?.contact?.phone || "+254 116 246 074";
  const logoUrl = content?.branding?.logoUrl || LOGO_SRC;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-navy-900/10 border-b border-gray-100"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center gap-2 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logoUrl}
              alt="Optimum Prime Solutions"
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-yellow-400 rounded-full transition-all duration-300 group-hover:w-3/4" />
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors"
            >
              <Phone size={14} />
              {phone}
            </a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-navy-900 font-semibold text-sm rounded-lg shadow-md shadow-yellow-400/30 transition-all duration-200"
              style={{ color: "#1f3a5f" }}
            >
              Get a Demo
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600">
                  <Phone size={14} /> {phone}
                </a>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 bg-yellow-400 text-center font-semibold rounded-lg"
                  style={{ color: "#1f3a5f" }}
                >
                  Get a Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
