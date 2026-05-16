import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Smartphone } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { Lead } from '../data/siteData';

export default function Contact() {
  const { data, update } = useSite();
  const c = data.contact;
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    businessType: '',
    demoDate: '',
    currentSoftware: '',
    message: '',
  });

  const set = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead: Lead = {
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'New',
    };
    update({ ...data, leads: [...data.leads, lead] });
    setOk(true);
    setForm({
      name: '',
      company: '',
      phone: '',
      email: '',
      businessType: '',
      demoDate: '',
      currentSoftware: '',
      message: '',
    });
    setTimeout(() => setOk(false), 5000);
  };

  const info = [
    { icon: MapPin, title: 'Visit Us', lines: [c.location] },
    { icon: Phone, title: 'Call Us', lines: c.phones },
    { icon: Mail, title: 'Email Us', lines: c.emails },
    { icon: Clock, title: 'Hours', lines: c.workingHours },
  ];

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-navy-50 to-white dark:from-navy-900/50 dark:to-navy-950 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">Contact</span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-white leading-tight">
            Request a <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">Demo</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            {info.map(({ icon: Ic, title, lines }) => (
              <div key={title} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-navy-800/50 transition-all">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-blue-500/10 flex items-center justify-center shrink-0">
                  <Ic className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900 dark:text-white">{title}</h4>
                  {lines.map((l) => (
                    <p key={l} className="text-sm text-navy-600 dark:text-navy-400 mt-1">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition w-full">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <div className="rounded-2xl overflow-hidden border border-navy-200 dark:border-navy-700 h-48 shadow-lg">
              <iframe src={c.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <div className="rounded-2xl border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="h-6 w-6 text-accent" />
                <h3 className="text-2xl font-bold text-navy-900 dark:text-white">Demo Request</h3>
              </div>

              {ok ? (
                <div className="mt-6 flex flex-col items-center py-12 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                  <h4 className="mt-4 text-xl font-bold text-navy-900 dark:text-white">Request Submitted!</h4>
                  <p className="mt-2 text-navy-600 dark:text-navy-300">Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { k: 'name', l: 'Full Name *', t: 'text', p: 'John Doe' },
                      { k: 'company', l: 'Company Name', t: 'text', p: 'Your Company' },
                      { k: 'phone', l: 'Phone *', t: 'tel', p: '+254 700 000 000' },
                      { k: 'email', l: 'Email *', t: 'email', p: 'john@company.ke' },
                      { k: 'businessType', l: 'Business Type', t: 'text', p: 'Retail / Manufacturing' },
                      { k: 'demoDate', l: 'Preferred Date', t: 'date', p: '' },
                      { k: 'currentSoftware', l: 'Current Software', t: 'text', p: 'Excel / QuickBooks' },
                    ].map((f) => (
                      <div key={f.k}>
                        <label className="block text-xs font-semibold text-navy-700 dark:text-navy-300 mb-2">{f.l}</label>
                        <input
                          type={f.t}
                          value={(form as Record<string, string>)[f.k]}
                          onChange={(e) => set(f.k, e.target.value)}
                          placeholder={f.p}
                          required={f.l.includes('*')}
                          className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 text-navy-900 dark:text-white"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-700 dark:text-navy-300 mb-2">Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      rows={3}
                      placeholder="Tell us about your needs..."
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 text-navy-900 dark:text-white resize-none"
                    />
                  </div>

                  <button type="submit" className="w-full rounded-lg bg-gradient-to-r from-accent to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-accent/30 hover:shadow-xl transition flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Submit Request
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
