import { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  companyPhone: string;
  companyEmail: string;
  companyWhatsapp: string;
}

export default function DemoRequestModal({ isOpen, onClose, companyPhone, companyEmail, companyWhatsapp }: Props) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', demoDate: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!form.name || !form.email || !form.phone) {
      setError('Please fill in required fields');
      return;
    }

    setSubmitting(true);
    
    try {
      // Send email via Formspree
      const formspreeEndpoint = 'https://formspree.io/f/mzzbqqbk'; // Replace with your Formspree endpoint
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          demoDate: form.demoDate,
          message: form.message || 'No message',
        }),
      });

      if (response.ok) {
        // Send WhatsApp message
        const waText = `Hi Optimum Prime Solutions,\n\nI'm ${form.name} from ${form.company || 'my company'}.\n\nI'd like to request a demo for Tally Prime.\n\nPhone: ${form.phone}\nEmail: ${form.email}\nPreferred Date: ${form.demoDate || 'Any time'}\n\n${form.message ? `Details: ${form.message}` : ''}`;
        
        const waLink = `https://wa.me/${companyWhatsapp}?text=${encodeURIComponent(waText)}`;
        window.open(waLink, '_blank');

        setSuccess(true);
        setForm({ name: '', email: '', phone: '', company: '', demoDate: '', message: '' });
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 3000);
      } else {
        setError('Failed to send request. Please try again.');
      }
    } catch (err) {
      setError('Error sending request. Please contact us directly.');
      console.error('Error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white dark:bg-navy-800 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Request a Demo</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-700 transition"
              >
                <X className="h-5 w-5 text-navy-600 dark:text-navy-400" />
              </button>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">
                  Demo Request Submitted!
                </h3>
                <p className="text-navy-600 dark:text-navy-300">
                  We've sent your details to our team and opened WhatsApp. Our team will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-red-700 dark:text-red-400"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.ke"
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Your Company Ltd"
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                    Preferred Demo Date
                  </label>
                  <input
                    type="date"
                    name="demoDate"
                    value={form.demoDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-navy-900 dark:text-white outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your needs..."
                    rows={3}
                    className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-navy-900 dark:text-white placeholder-navy-400 dark:placeholder-navy-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full rounded-lg bg-gradient-to-r from-accent to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? 'Sending...' : 'Request Demo'}
                </motion.button>

                <p className="text-xs text-navy-500 dark:text-navy-400 text-center">
                  We'll send you a confirmation email and contact you via WhatsApp within 24 hours.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
