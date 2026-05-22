export interface ServiceItem { id:string; title:string; desc:string; icon:string; features:string[]; link?:string }
export interface ProductItem { id:string; name:string; edition:string; price:string; period:string; features:string[]; popular?:boolean; cta:string }
export interface TestimonialItem { id:string; name:string; role:string; company:string; text:string; rating:number }
export interface FaqItem { id:string; q:string; a:string; cat:string }
export interface IndustryItem { id:string; name:string; icon:string; desc:string }
export interface BlogPost { id:string; title:string; excerpt:string; date:string; category:string; readTime:string; content:string; youtubeUrl?:string }
export interface Lead { id:string; name:string; company:string; phone:string; email:string; businessType:string; demoDate:string; currentSoftware:string; message:string; createdAt:string; status:string }
export interface ContactInfo { location:string; phones:string[]; emails:string[]; workingHours:string[]; whatsapp:string; mapUrl:string }
export interface CompanyInfo { name:string; tagline:string; mission:string; vision:string; about:string[]; stats:{label:string;value:string}[] }

export interface SiteData {
  company: CompanyInfo; contact: ContactInfo; services: ServiceItem[]; products: ProductItem[];
  testimonials: TestimonialItem[]; faqs: FaqItem[]; industries: IndustryItem[];
  blogs: BlogPost[]; leads: Lead[];
}

export const defaultData: SiteData = {
  company: {
    name:'Optimum Prime Solutions',
    tagline:'Cloud Simplified, Business Amplified',
    mission:'To empower Kenyan businesses with world-class Tally Prime solutions that streamline operations, ensure compliance, and drive sustainable growth.',
    vision:'To be the leading Tally Prime & ERP solutions provider in East Africa, transforming how businesses manage their finances and operations.',
    about:[
      'Optimum Prime Solutions is Kenya\'s premier Tally Prime partner, delivering end-to-end business automation solutions. With over 15 years of combined experience, our certified team has helped 500+ businesses across East Africa transform their operations.',
      'We specialize in Tally Prime implementation, customization, and support — from inventory management and payroll to manufacturing and KRA compliance. Our mission is to simplify technology so you can focus on growing your business.',
    ],
    stats:[{label:'Clients Served',value:'500+'},{label:'Years Experience',value:'15+'},{label:'Uptime Guarantee',value:'99.9%'},{label:'Support Response',value:'< 1hr'}],
  },
  contact: {
    location:'Ruiru, Kenya',
    phones:['+254 116 246 074','+254 727 209 720'],
    emails:['optimumprimesolutionsltd@gmail.com','Info@optimumprimesolutionsltd.co.ke'],
    workingHours:['Mon – Fri: 8:00 AM – 6:00 PM','Sat: 9:00 AM – 1:00 PM'],
    whatsapp:'254116246074',
    mapUrl:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.37!2d36.96!3d-1.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRuiru!5e0!3m2!1sen!2ske!4v1',
  },
  services: [
    {id:'1',title:'Tally Prime Installation & Setup',desc:'Complete installation, configuration, and data migration for Tally Prime Silver & Gold editions. Get up and running in 24 hours.',icon:'Download',features:['License activation','Data migration','Multi-user setup','Initial training'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'2',title:'Inventory Management',desc:'Real-time stock tracking, batch management, reorder alerts, and multi-location inventory control powered by Tally Prime.',icon:'Package',features:['Real-time tracking','Batch & expiry management','Reorder alerts','Multi-location support'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'3',title:'Payroll Systems',desc:'Automated payroll processing fully configured for Kenyan statutory requirements — PAYE, NHIF, NSSF, Housing Levy.',icon:'Wallet',features:['Auto salary processing','PAYE/NHIF/NSSF','Payslip generation','Leave management'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'4',title:'Manufacturing Solutions',desc:'Streamline production with Bill of Materials, production orders, work-in-progress tracking, and cost analysis.',icon:'Factory',features:['BOM management','Production orders','Cost tracking','Quality control'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'5',title:'KRA Compliance',desc:'Stay 100% compliant with KRA. Automated VAT, income tax, PAYE calculations, and e-filing integration.',icon:'FileCheck',features:['VAT management','e-Filing integration','Tax reports','Audit trail'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'6',title:'TDL Customization',desc:'Custom Tally Definition Language development to tailor Tally Prime to your exact business workflows.',icon:'Code',features:['Custom reports','Workflow automation','Integration APIs','Module extensions'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'7',title:'Remote & On-site Support',desc:'24/7 remote assistance plus scheduled on-site visits. Average response time under 1 hour.',icon:'Headphones',features:['24/7 remote support','On-site visits','Software updates','Troubleshooting'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
    {id:'8',title:'ERP & Business Consulting',desc:'Strategic consulting to optimize your business processes, select the right ERP modules, and plan digital transformation.',icon:'BarChart3',features:['Process mapping','ERP selection','Digital strategy','Change management'],link:'https://tallysolutions.com/ssa/download/?srsltid=AfmBOooMSwVbv50rP24g8n8IKqi92cdz3NFhSuqpfprrxIcgj7DZLXym'},
  ],
  products: [
    {id:'1',name:'TallyPrime',edition:'Silver',price:'KES 57,600 +vat',period:'one-time',features:['Single user license','Full accounting and invoicing','Inventory and stock reports','Payroll configuration','KRA VAT and eTIMS ready','Free updates for 1 year','Email and remote support'],cta:'Get Silver'},
    {id:'2',name:'TallyPrime',edition:'Gold',price:'KES 172,800 +vat',period:'one-time',popular:true,features:['Unlimited multi-user access','All Silver features','Remote data access setup','Advanced user security','Multi-location inventory','Priority implementation support','On-site team training'],cta:'Get Gold'},
    {id:'3',name:'TallyPrime',edition:'Plus',price:'Contact for Quote',period:'annual plan',features:['Cloud-ready access','Automated data backup guidance','Dedicated support plan','Periodic system health checks','KRA compliance review','Management reporting pack','License renewal reminders'],cta:'Ask About Plus'},
    {id:'4',name:'TallyPrime',edition:'Server / Enterprise',price:'Custom Quote',period:'per deployment',features:['High-performance multi-user setup','Branch and warehouse configuration','Role-based controls','Audit readiness checks','Advanced backup planning','Implementation project manager','Enterprise SLA support'],cta:'Plan Enterprise'},
    {id:'5',name:'TDL Custom',edition:'Solutions',price:'From KES 25,000',period:'per project',features:['Custom report builder','Invoice and voucher customization','Workflow automation','Third-party integrations','API development','Source code delivery','6 months support'],cta:'Get Quote'},
  ],
  testimonials: [
    {id:'1',name:'James Mwangi',role:'CEO',company:'Mwangi Enterprises Ltd',text:'Optimum Prime Solutions transformed our accounting. The KRA compliance module alone has saved us countless hours. Their team is professional and responsive.',rating:5},
    {id:'2',name:'Grace Wanjiku',role:'Finance Director',company:'Wanjiku Manufacturing',text:'The manufacturing module is a game-changer. Real-time production cost tracking and BOM management have improved our margins by 18%.',rating:5},
    {id:'3',name:'Peter Ochieng',role:'Managing Director',company:'Ochieng Trading Co.',text:'Complete visibility of stock across 5 locations. Inventory discrepancies dropped by 95% after implementing their solution.',rating:5},
    {id:'4',name:'Mary Njeri',role:'HR Manager',company:'Njeri Group',text:'Payroll processing that used to take 3 days now takes 2 hours. The PAYE, NHIF, and NSSF calculations are always accurate.',rating:5},
    {id:'5',name:'David Kamau',role:'Owner',company:'Kamau Pharmacy',text:'From POS to inventory to KRA returns — everything runs on Tally Prime now. Best investment we\'ve made for our pharmacy chain.',rating:5},
    {id:'6',name:'Sarah Achieng',role:'Operations Manager',company:'Lake Victoria SACCO',text:'Their SACCO solution handles member accounts, loan tracking, and dividends seamlessly. Support response time is incredible.',rating:5},
  ],
  faqs: [
    {id:'1',q:'What is Tally Prime?',a:'Tally Prime is a complete business management software for accounting, inventory, payroll, manufacturing, taxation, and more. It\'s used by millions of businesses worldwide and is the leading ERP solution in East Africa.',cat:'General'},
    {id:'2',q:'How much does Tally Prime cost?',a:'Tally Prime Silver (single user) costs KES 54,000 and Tally Prime Gold (multi-user) costs KES 162,000. Both are one-time purchases with 1 year of free updates. Contact us for volume discounts.',cat:'Pricing'},
    {id:'3',q:'Do you provide training?',a:'Yes! We provide comprehensive training covering all Tally Prime modules — accounting, inventory, payroll, manufacturing, and KRA compliance. Training can be on-site or remote.',cat:'Services'},
    {id:'4',q:'How does Tally handle KRA compliance?',a:'Tally Prime is fully configured for KRA including VAT computation, PAYE calculations, income tax reports, and supports e-filing integration for iTax returns.',cat:'KRA & Tax'},
    {id:'5',q:'Can I access Tally Prime remotely?',a:'Yes! Tally Prime Gold supports remote access. With our cloud setup, you can access your data from anywhere — perfect for teams working across multiple locations.',cat:'General'},
    {id:'6',q:'How long does implementation take?',a:'Basic setup takes 1-2 days. Full enterprise implementation with data migration and training typically takes 1-2 weeks, depending on complexity.',cat:'Services'},
    {id:'7',q:'Do you offer after-sales support?',a:'Absolutely. We provide 24/7 remote support with average response under 1 hour, plus scheduled on-site visits. Support plans start from KES 5,000/month.',cat:'Support'},
    {id:'8',q:'Can I migrate from Excel or other software?',a:'Yes, we handle full data migration from Excel, spreadsheets, and other systems. All historical data is accurately transferred with zero downtime, ensuring no loss of critical information.',cat:'Services'},
    {id:'9',q:'Is my data secure?',a:'Tally Prime provides enterprise-grade security with role-based access, audit trails, encrypted storage, and automated backups. We also set up disaster recovery plans.',cat:'Security'},
    {id:'10',q:'Do you serve businesses outside Nairobi?',a:'Yes! We serve clients across Kenya and East Africa. Remote support is available nationwide, and we schedule on-site visits for implementation anywhere in the region.',cat:'General'},
  ],
  industries: [
    {id:'1',name:'Retail & Shops',icon:'ShoppingBag',desc:'POS integration, stock management, and multi-branch retail solutions.'},
    {id:'2',name:'Wholesale & Distribution',icon:'Truck',desc:'Bulk inventory, supplier management, and order processing systems.'},
    {id:'3',name:'Manufacturing',icon:'Factory',desc:'BOM, production orders, quality control, and cost tracking.'},
    {id:'4',name:'SACCOs & MFIs',icon:'Landmark',desc:'Member management, loans, dividends, and regulatory compliance.'},
    {id:'5',name:'Hardware & Construction',icon:'Wrench',desc:'Project costing, material tracking, and contractor management.'},
    {id:'6',name:'Pharmacies & Healthcare',icon:'Heart',desc:'Drug inventory, expiry tracking, and PPOA compliance.'},
    {id:'7',name:'Supermarkets',icon:'ShoppingCart',desc:'Multi-POS, barcode scanning, and real-time stock updates.'},
    {id:'8',name:'Education & NGOs',icon:'GraduationCap',desc:'Fee management, donor tracking, and grant accounting.'},
  ],
  blogs: [
    {id:'1',title:'Why Every Kenyan Business Needs Tally Prime in 2025',excerpt:'Discover how Tally Prime is transforming business operations across Kenya with automated accounting, KRA compliance, and real-time reporting.',date:'2025-01-15',category:'Insights',readTime:'5 min',content:'Tally Prime has become the backbone of business operations in Kenya...'},
    {id:'2',title:'Complete Guide to KRA e-Filing with Tally Prime',excerpt:'Step-by-step guide to setting up and filing your KRA returns directly from Tally Prime. Save time and avoid penalties.',date:'2025-02-01',category:'Tutorial',readTime:'8 min',content:'Filing KRA returns can be complex, but Tally Prime simplifies the entire process...'},
    {id:'3',title:'Tally Prime Silver vs Gold: Which Edition Is Right for You?',excerpt:'A detailed comparison of Tally Prime Silver and Gold editions to help you choose the perfect solution for your business size.',date:'2025-02-15',category:'Comparison',readTime:'6 min',content:'Choosing between Tally Prime Silver and Gold depends on your business needs...'},
  ],
  leads: [],
};

const KEY = 'ops_site_v2';
export const load = (): SiteData => { try { const r=localStorage.getItem(KEY); if(r){ const p=JSON.parse(r); return {...defaultData,...p, leads:p.leads||[]}; } } catch{} return defaultData; };
export const save = (d: SiteData) => localStorage.setItem(KEY, JSON.stringify(d));
