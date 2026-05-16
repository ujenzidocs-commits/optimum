import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { Lead } from '../data/siteData';
export default function Contact() {
  const { data, update } = useSite();
  const c = data.contact;
  const [ok, setOk] = useState(false);
  const [form, setForm] = useState({name:'',company:'',phone:'',email:'',businessType:'',demoDate:'',currentSoftware:'',message:''});
  const set = (k:string,v:string) => setForm({...form,[k]:v});
  const submit = (e:React.FormEvent) => {
    e.preventDefault();
    const lead:Lead = {...form,id:Date.now().toString(),createdAt:new Date().toISOString(),status:'New'};
    update({...data,leads:[...data.leads,lead]});
    setOk(true); setForm({name:'',company:'',phone:'',email:'',businessType:'',demoDate:'',currentSoftware:'',message:''});
    setTimeout(()=>setOk(false),5000);
  };
  const info = [{icon:MapPin,title:'Visit Us',lines:[c.location]},{icon:Phone,title:'Call Us',lines:c.phones},{icon:Mail,title:'Email Us',lines:c.emails},{icon:Clock,title:'Hours',lines:c.workingHours}];
  return (
    <section id="contact" className="py-24 bg-navy-50/50 dark:bg-navy-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">Contact Us</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Request a Demo or Get in Touch</h2>
        </motion.div>
        <div className="mt-16 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-5">
            {info.map(({icon:Ic,title,lines})=><div key={title} className="flex items-start gap-4"><div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Ic className="h-5 w-5 text-accent"/></div><div><h4 className="text-sm font-bold text-navy-900 dark:text-white">{title}</h4>{lines.map(l=><p key={l} className="text-sm text-navy-500 dark:text-navy-400">{l}</p>)}</div></div>)}
            <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition w-full"><MessageCircle className="h-4 w-4"/>Chat on WhatsApp</a>
            <div className="rounded-xl overflow-hidden border border-navy-200 dark:border-navy-700 h-48">
              <iframe src={c.mapUrl} width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy" title="Location" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 p-8">
              <h3 className="text-lg font-bold text-navy-900 dark:text-white">Demo Request Form</h3>
              {ok?<div className="mt-6 flex flex-col items-center py-12 text-center"><CheckCircle className="h-12 w-12 text-accent"/><h4 className="mt-4 text-lg font-bold text-navy-900 dark:text-white">Request Submitted!</h4><p className="mt-2 text-sm text-navy-500">Our team will contact you within 24 hours.</p></div>:(
              <form onSubmit={submit} className="mt-5 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[{k:'name',l:'Full Name *',t:'text',p:'John Doe'},{k:'company',l:'Company Name',t:'text',p:'Your Company'},{k:'phone',l:'Phone *',t:'tel',p:'+254 700 000 000'},{k:'email',l:'Email *',t:'email',p:'john@co.ke'},{k:'businessType',l:'Business Type',t:'text',p:'Retail / Manufacturing...'},{k:'demoDate',l:'Preferred Demo Date',t:'date',p:''},{k:'currentSoftware',l:'Current Software',t:'text',p:'Excel / QuickBooks...'}].map(f=>(
                    <div key={f.k}><label className="block text-xs font-medium text-navy-600 dark:text-navy-300 mb-1">{f.l}</label><input type={f.t} value={(form as Record<string,string>)[f.k]} onChange={e=>set(f.k,e.target.value)} placeholder={f.p} required={f.l.includes('*')} className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-3.5 py-2.5 text-sm outline-none focus:border-accent text-navy-900 dark:text-white"/></div>
                  ))}
                </div>
                <div><label className="block text-xs font-medium text-navy-600 dark:text-navy-300 mb-1">Message</label><textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={3} placeholder="Tell us about your needs..." className="w-full rounded-lg border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-700 px-3.5 py-2.5 text-sm outline-none focus:border-accent text-navy-900 dark:text-white"/></div>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition w-full sm:w-auto shadow-lg shadow-accent/25"><Send className="h-4 w-4"/>Submit Request</button>
              </form>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
