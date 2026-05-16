import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { SiteData } from '../data/siteData';
interface Msg { id:string; role:'bot'|'user'; text:string; time:string }
const ts = () => new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
function respond(q:string, d:SiteData):string {
  const lc = q.toLowerCase();
  if(/^(hi|hello|hey|jambo|habari|sasa)/.test(lc)) return `Hello! 👋 Welcome to ${d.company.name}. How can I help you today?\n\n• Our services & pricing\n• Request a demo\n• KRA compliance\n• Support & training`;
  if(/demo|trial|test/.test(lc)) return `🎯 Great! I can help you schedule a demo.\n\nPlease scroll down to our **Contact section** and fill the Demo Request Form, or:\n\n📞 Call: ${d.contact.phones[0]}\n📧 Email: ${d.contact.emails[0]}\n💬 WhatsApp: wa.me/${d.contact.whatsapp}`;
  if(/price|cost|how much|silver|gold/.test(lc)){ const ps=d.products.map(p=>`• **${p.name} ${p.edition}**: ${p.price} (${p.period})`).join('\n'); return `💎 **Tally Prime Pricing:**\n\n${ps}\n\nContact us for volume discounts!`; }
  if(/service|what (do|can) you/.test(lc)){ const sl=d.services.map(s=>`• **${s.title}**`).join('\n'); return `We offer:\n\n${sl}\n\nWhich service interests you?`; }
  if(/kra|tax|vat|compliance/.test(lc)) return `📋 **KRA Compliance**\n\nWe configure Tally Prime for full KRA compliance:\n• VAT computation & filing\n• PAYE calculations\n• Income tax reports\n• iTax e-Filing integration\n\nNever miss a deadline again!`;
  if(/payroll|salary|paye|nhif|nssf/.test(lc)) return `💰 **Payroll Management**\n\nOur payroll module handles:\n• Auto salary processing\n• PAYE, NHIF, NSSF, Housing Levy\n• Payslip generation\n• Leave management\n\nFully configured for Kenyan statutory requirements!`;
  if(/inventor/.test(lc)) return `📦 **Inventory Management**\n\nReal-time stock tracking with:\n• Batch & expiry management\n• Reorder alerts\n• Multi-location support\n• Barcode integration\n\nPerfect for retail, wholesale & manufacturing!`;
  if(/contact|reach|phone|call|email|where/.test(lc)) return `📞 **Contact Us:**\n\n${d.contact.phones.map(p=>`📱 ${p}`).join('\n')}\n${d.contact.emails.map(e=>`📧 ${e}`).join('\n')}\n📍 ${d.contact.location}\n\n🕐 ${d.contact.workingHours.join(' | ')}`;
  if(/support|help|troubleshoot/.test(lc)) return `🔧 We provide 24/7 support:\n• Remote assistance\n• On-site visits\n• Software updates\n• Average response: < 1 hour\n\n📞 ${d.contact.phones[0]}`;
  if(/tdl|custom/.test(lc)) return `⚙️ **TDL Customization**\n\nCustom Tally Definition Language development:\n• Custom reports & invoices\n• Workflow automation\n• Third-party integrations\n• API development\n\nPricing starts from KES 25,000 per project.`;
  if(/about|company|who/.test(lc)) return `🏢 **${d.company.name}**\n\n${d.company.about[0]}\n\n${d.company.stats.map(s=>`${s.label}: ${s.value}`).join(' | ')}`;
  if(/thank|bye|asante/.test(lc)) return `You're welcome! 😊 Feel free to reach out anytime.\n\n📞 ${d.contact.phones[0]}\n💬 wa.me/${d.contact.whatsapp}`;
  const faq = d.faqs.find(f=>{ const w=lc.split(/\s+/).filter(x=>x.length>3); return w.filter(x=>f.q.toLowerCase().includes(x)||f.a.toLowerCase().includes(x)).length>=2; });
  if(faq) return `📋 **${faq.q}**\n\n${faq.a}`;
  return `Thanks for your question! Our team can help you directly:\n\n📞 ${d.contact.phones[0]}\n📧 ${d.contact.emails[0]}\n💬 wa.me/${d.contact.whatsapp}\n\nOr ask about: services, pricing, KRA, payroll, demo`;
}
function Fmt({text}:{text:string}){return<>{text.split('\n').map((l,i)=>{const parts=l.split(/(\*\*[^*]+\*\*)/g);const c=parts.map((p,j)=>p.startsWith('**')&&p.endsWith('**')?<strong key={j} className="font-semibold">{p.slice(2,-2)}</strong>:<span key={j}>{p}</span>);if(!l.trim())return<br key={i}/>;if(l.trim().startsWith('•'))return<div key={i} className="ml-1 flex gap-1.5"><span className="text-accent">•</span><span>{c.slice(1)}</span></div>;return<div key={i}>{c}</div>;})}</>}
export default function Chatbot(){
  const {data}=useSite();
  const [open,setOpen]=useState(false);const [min,setMin]=useState(false);const [input,setInput]=useState('');const [typing,setTyping]=useState(false);
  const [msgs,setMsgs]=useState<Msg[]>([{id:'0',role:'bot',text:`Hello! 👋 I'm the Optimum Prime assistant. I can help with Tally Prime solutions, pricing, demos & more.\n\nHow can I help you today?`,time:ts()}]);
  const endRef=useRef<HTMLDivElement>(null);
  const scroll=useCallback(()=>setTimeout(()=>endRef.current?.scrollIntoView({behavior:'smooth'}),50),[]);
  useEffect(()=>{scroll();},[msgs,typing,scroll]);
  const send=(txt:string)=>{if(!txt.trim())return;setMsgs(p=>[...p,{id:Date.now()+'',role:'user',text:txt.trim(),time:ts()}]);setInput('');setTyping(true);setTimeout(()=>{setMsgs(p=>[...p,{id:(Date.now()+1)+'',role:'bot',text:respond(txt,data),time:ts()}]);setTyping(false);},600+Math.random()*800);};
  return<>
    {!open&&<button onClick={()=>setOpen(true)} className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-br from-accent to-navy-800 text-white shadow-2xl shadow-accent/30 hover:scale-110 transition-all flex items-center justify-center" aria-label="Chat"><MessageCircle className="h-6 w-6"/><span className="absolute -top-1 -right-1 flex h-4 w-4"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"/><span className="relative h-4 w-4 rounded-full bg-accent"/></span></button>}
    {open&&<div className={`fixed z-50 transition-all duration-300 ${min?'bottom-6 right-6 h-14 w-72':'bottom-0 right-0 sm:bottom-6 sm:right-6 h-[100dvh] w-full sm:h-[560px] sm:w-[380px]'} flex flex-col overflow-hidden border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-900 shadow-2xl sm:rounded-2xl`}>
      <div className="flex items-center justify-between bg-gradient-to-r from-navy-900 to-navy-800 px-4 py-3 shrink-0">
        <div className="flex items-center gap-2.5"><div className="relative h-8 w-8 rounded-full bg-white/10 flex items-center justify-center"><Bot className="h-4 w-4 text-accent"/><span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-navy-900 bg-green-400"/></div>{!min&&<div><p className="text-sm font-semibold text-white">Optimum Assistant</p><p className="text-[10px] text-green-300">● Online</p></div>}{min&&<p className="text-sm font-semibold text-white">Optimum Assistant</p>}</div>
        <div className="flex gap-1"><button onClick={()=>setMin(!min)} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg"><Minimize2 className="h-3.5 w-3.5"/></button><button onClick={()=>{setOpen(false);setMin(false);}} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg"><X className="h-3.5 w-3.5"/></button></div>
      </div>
      {!min&&<><div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-navy-50 dark:bg-navy-950">
        {msgs.map(m=><div key={m.id} className={`flex gap-2 ${m.role==='user'?'flex-row-reverse':''}`}><div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${m.role==='bot'?'bg-navy-800':'bg-accent'}`}>{m.role==='bot'?<Bot className="h-3.5 w-3.5 text-accent"/>:<User className="h-3.5 w-3.5 text-white"/>}</div><div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${m.role==='bot'?'rounded-tl-sm bg-white dark:bg-navy-800 text-navy-700 dark:text-navy-200 shadow-sm border border-navy-100 dark:border-navy-700':'rounded-tr-sm bg-navy-800 text-white'}`}><Fmt text={m.text}/><p className={`mt-1 text-[9px] ${m.role==='bot'?'text-navy-400':'text-white/40'}`}>{m.time}</p></div></div>)}
        {typing&&<div className="flex gap-2"><div className="h-7 w-7 rounded-full bg-navy-800 flex items-center justify-center"><Bot className="h-3.5 w-3.5 text-accent"/></div><div className="rounded-2xl rounded-tl-sm bg-white dark:bg-navy-800 px-4 py-3 shadow-sm border border-navy-100 dark:border-navy-700"><div className="flex gap-1"><span className="h-1.5 w-1.5 rounded-full bg-navy-400 animate-bounce [animation-delay:0ms]"/><span className="h-1.5 w-1.5 rounded-full bg-navy-400 animate-bounce [animation-delay:150ms]"/><span className="h-1.5 w-1.5 rounded-full bg-navy-400 animate-bounce [animation-delay:300ms]"/></div></div></div>}
        <div ref={endRef}/>
      </div>
      {msgs.length<=2&&<div className="border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900 px-3 py-2 shrink-0"><p className="mb-1.5 text-[9px] font-medium uppercase tracking-wider text-navy-400">Quick questions</p><div className="flex flex-wrap gap-1">{['Services & pricing','Request a demo','KRA compliance','Contact info','Payroll setup'].map(s=><button key={s} onClick={()=>send(s)} className="rounded-full border border-accent/20 bg-accent/5 px-2.5 py-1 text-[10px] font-medium text-accent hover:bg-accent/10 transition">{s}</button>)}</div></div>}
      <form onSubmit={e=>{e.preventDefault();send(input);}} className="flex items-center gap-2 border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-900 px-3 py-2.5 shrink-0"><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a message..." className="flex-1 rounded-xl border border-navy-200 dark:border-navy-700 bg-navy-50 dark:bg-navy-800 px-3.5 py-2 text-sm outline-none focus:border-accent text-navy-900 dark:text-white"/><button type="submit" disabled={!input.trim()} className="h-9 w-9 rounded-xl bg-accent text-white flex items-center justify-center hover:bg-accent-dark transition disabled:opacity-40"><Send className="h-3.5 w-3.5"/></button></form>
      </>}
    </div>}
  </>;
}
