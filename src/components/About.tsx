import { motion } from 'framer-motion';
import { Target, Eye, Zap, Users, Award, Shield } from 'lucide-react';
import { useSite } from '../context/SiteContext';
const icons = [Users, Award, Target, Shield];
const fade = { hidden:{opacity:0,y:30}, visible:(i:number)=>({opacity:1,y:0,transition:{delay:i*0.1}}) };
export default function About() {
  const { data } = useSite();
  const c = data.company;
  return (
    <section id="about" className="py-24 bg-white dark:bg-navy-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{once:true}} variants={{visible:{transition:{staggerChildren:0.15}}}}>
            <motion.span variants={fade} custom={0} className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">About Us</motion.span>
            <motion.h2 variants={fade} custom={1} className="mt-4 text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Kenya's Leading <span className="text-accent">Tally Prime</span> Partner</motion.h2>
            {c.about.map((p:string,i:number) => <motion.p key={i} variants={fade} custom={i+2} className="mt-4 text-navy-600 dark:text-navy-300 leading-relaxed">{p}</motion.p>)}
            <motion.div variants={fade} custom={4} className="mt-8 grid grid-cols-2 gap-5">
              {c.stats.map((s:{label:string;value:string},i:number)=>{const I=icons[i%icons.length];return(
                <div key={s.label} className="flex items-center gap-3"><div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0"><I className="h-5 w-5 text-accent"/></div><div><p className="text-sm font-bold text-navy-900 dark:text-white">{s.value}</p><p className="text-xs text-navy-500 dark:text-navy-400">{s.label}</p></div></div>
              );})}
            </motion.div>
          </motion.div>
          <motion.div initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="relative">
            <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-800 p-8 lg:p-10 shadow-2xl">
              <div className="space-y-7">
                {[{icon:Target,title:'Our Mission',text:c.mission},{icon:Eye,title:'Our Vision',text:c.vision},{icon:Zap,title:'Why Choose Us',text:'Certified Tally experts, rapid implementation, 24/7 support, and solutions customized for the Kenyan market.'}].map(({icon:Ic,title,text})=>(
                  <div key={title} className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-accent/20 flex items-center justify-center shrink-0"><Ic className="h-5 w-5 text-accent"/></div>
                    <div><h4 className="text-base font-bold text-white">{title}</h4><p className="mt-1 text-sm text-navy-300 leading-relaxed">{text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
