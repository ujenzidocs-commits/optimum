import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, Smartphone, AlertCircle, Loader } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useOnlineStatus } from './OfflineBanner';
import { validateForm, getFieldError, type FormData, type ValidationError } from '../utils/validation';
import type { Lead } from '../data/siteData';

export default function Contact() {
  const { data, update } = useSite();
  const c = data.contact;
  const isOnline = useOnlineStatus();
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [form, setForm] = useState<FormData>({
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

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setServerError(null);

    // Validate form
    const validation = validateForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Check online status
    if (!isOnline) {
      setServerError('You are offline. Please check your internet connection before submitting.');
      return;
    }

    setLoading(true);

    try {
      // Save locally
      const lead: Lead = {
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'New',
      };
      update({ ...data, leads: [...data.leads, lead] });

      // Send email via Formspree
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('email', form.email);
      formData.append('phone', form.phone);
      formData.append('company', form.company);
      formData.append('businessType', form.businessType);
      formData.append('demoDate', form.demoDate);
      formData.append('currentSoftware', form.currentSoftware);
      formData.append('message', form.message);

      const response = await fetch('https://formspree.io/f/mvzyoyzz', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send email. Please try again.');
      }

      // Send confirmation email to user
      await sendConfirmationEmail(form.email, form.name);

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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred';
      setServerError(message);
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendConfirmationEmail = async (email: string, name: string) => {
    try {
      await fetch('https://formspree.io/f/mvzyoyzz', {
        method: 'POST',
        body: new FormData(
          Object.assign(document.createElement('form'), {
            innerHTML: `
              <input type="hidden" name="email_subject" value="Demo Request Confirmation" />
              <input type="hidden" name="to" value="${email}" />
              <input type="hidden" name="message" value="Hi ${name},\n\nThank you for requesting a demo! We've received your request and will contact you within 24 hours.\n\nBest regards,\nOptimum Prime Solutions Team" />
            `,
          })
        ),
      });
    } catch {
      // Confirmation email failed silently - main request was sent
      console.warn('Failed to send confirmation email');
    }
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
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block rounded-full bg-yellow-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-yellow-600">Contact</span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-extrabold text-navy-900 dark:text-navy-900 leading-tight">
            Request a <span className="bg-gradient-to-r from-yellow-400 to-blue-600 bg-clip-text text-transparent">Demo</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-4">
            {info.map(({ icon: Ic, title, lines }) => (
              <div key={title} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-white dark:hover:bg-navy-800/50 transition-all touch-target">
                <div className="h-12 w-12 min-h-12 min-w-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-blue-500/10 flex items-center justify-center shrink-0">
                  <Ic className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900 dark:text-white">{title}</h4>
                  {lines.map((l) => (
                    <p key={l} className="text-xs sm:text-sm text-navy-600 dark:text-navy-600 mt-1">
                      {l}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition w-full touch-target min-h-12">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>

            <div className="rounded-2xl overflow-hidden border border-navy-200 dark:border-navy-700 h-48 shadow-lg">
              <iframe src={c.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Location" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            <div className="rounded-2xl border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Smartphone className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-navy-900 dark:text-white">Demo Request</h3>
              </div>

              {!isOnline && (
                <div className="mb-4 flex items-start gap-3 rounded-lg border border-orange-500/20 bg-orange-500/10 p-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-orange-900 dark:text-orange-100">Offline Mode</h4>
                    <p className="text-xs text-orange-800 dark:text-orange-200">You are offline. Your request will be saved locally.</p>
                  </div>
                </div>
              )}

              {serverError && (
                <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">Error</h4>
                    <p className="text-xs text-red-800 dark:text-red-200">{serverError}</p>
                  </div>
                </div>
              )}

              {ok ? (
                <div className="mt-6 flex flex-col items-center py-12 text-center">
                  <CheckCircle className="h-14 sm:h-16 w-14 sm:w-16 text-green-500" />
                  <h4 className="mt-4 text-lg sm:text-xl font-bold text-navy-900 dark:text-white">Request Submitted!</h4>
                  <p className="mt-2 text-sm text-navy-600 dark:text-navy-300">We've sent you a confirmation email. Our team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { k: 'name', l: 'Full Name *', t: 'text', p: 'John Doe' },
                      { k: 'company', l: 'Company Name', t: 'text', p: 'Your Company' },
                      { k: 'phone', l: 'Phone *', t: 'tel', p: '+254 700 000 000' },
                      { k: 'email', l: 'Email *', t: 'email', p: 'john@company.ke' },
                      { k: 'businessType', l: 'Business Type', t: 'text', p: 'Retail / Manufacturing' },
                      { k: 'demoDate', l: 'Preferred Date', t: 'date', p: '' },
                      { k: 'currentSoftware', l: 'Current Software', t: 'text', p: 'Excel / QuickBooks' },
                    ].map((f) => {
                      const error = getFieldError(errors, f.k);
                      return (
                        <div key={f.k}>
                          <label className="block text-xs font-semibold text-navy-700 dark:text-navy-300 mb-2">
                            {f.l}
                            {error && <span className="text-red-500 ml-1">✗</span>}
                          </label>
                          <input
                            type={f.t}
                            value={(form as Record<string, string>)[f.k]}
                            onChange={(e) => set(f.k, e.target.value)}
                            placeholder={f.p}
                            required={f.l.includes('*')}
                            className={`w-full rounded-lg border px-3 sm:px-4 py-2.5 text-sm outline-none transition min-h-12 ${
                              error
                                ? 'border-red-500 bg-red-50 dark:bg-red-500/10 focus:ring-2 focus:ring-red-400'
                                : 'border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 focus:border-yellow-300 focus:ring-2 focus:ring-accent/30'
                            } text-navy-900 dark:text-white`}
                          />
                          {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Message
                      {getFieldError(errors, 'message') && <span className="text-red-500 ml-1">✗</span>}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      rows={3}
                      placeholder="Tell us about your needs... (optional)"
                      className={`w-full rounded-lg border px-3 sm:px-4 py-2.5 text-sm outline-none transition resize-none ${
                        getFieldError(errors, 'message')
                          ? 'border-red-500 bg-red-50 dark:bg-red-500/10 focus:ring-2 focus:ring-red-400'
                          : 'border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 focus:border-yellow-300 focus:ring-2 focus:ring-accent/30'
                      } text-navy-900 dark:text-white`}
                    />
                    {getFieldError(errors, 'message') && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{getFieldError(errors, 'message')}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isOnline}
                    className="w-full rounded-lg bg-gradient-to-r from-yellow-400 to-blue-600 px-4 sm:px-6 py-3 text-sm font-bold text-white shadow-lg shadow-yellow-400/30 hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-12 touch-target"
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Submit Request
                      </>
                    )}
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
