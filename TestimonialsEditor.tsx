import { useState } from 'react';
import { Save, Plus, X, Star } from 'lucide-react';
import type { SiteData, TestimonialItem } from '../../data/siteData';

interface P { data: SiteData; onSave: (d: SiteData) => void }

export default function TestimonialsEditor({ data, onSave }: P) {
  const [items, setItems] = useState<TestimonialItem[]>(data.testimonials.map(t => ({ ...t })));

  const add = () => setItems([...items, { id: Date.now() + '', name: '', role: '', company: '', text: '', rating: 5 }]);
  const rm = (id: string) => { if (confirm('Remove?')) setItems(items.filter(t => t.id !== id)); };
  const upd = (id: string, u: Partial<TestimonialItem>) => setItems(items.map(t => t.id === id ? { ...t, ...u } : t));

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-navy-500">{items.length} testimonials</p>
        <button onClick={add}
          className="flex items-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-navy-800 transition">
          <Plus className="h-4 w-4" />Add Testimonial
        </button>
      </div>

      {items.map(t => (
        <div key={t.id} className="rounded-2xl border border-navy-200 bg-white p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-xs font-bold text-white">
                {t.name ? t.name.split(' ').map(n => n[0]).join('').substring(0, 2) : '?'}
              </div>
              <div>
                <p className="text-sm font-bold text-navy-900">{t.name || 'New Testimonial'}</p>
                <p className="text-xs text-navy-400">{t.role ? `${t.role}, ${t.company}` : 'Set details below'}</p>
              </div>
            </div>
            <button onClick={() => rm(t.id)} className="rounded-lg p-1.5 text-red-400 hover:bg-red-50"><X className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className="block text-xs font-semibold text-navy-600 mb-1.5">Name</label>
              <input value={t.name} onChange={e => upd(t.id, { name: e.target.value })} placeholder="John Doe"
                className="w-full rounded-lg border border-navy-200 px-3 py-2.5 text-sm outline-none focus:border-accent" /></div>
            <div><label className="block text-xs font-semibold text-navy-600 mb-1.5">Role</label>
              <input value={t.role} onChange={e => upd(t.id, { role: e.target.value })} placeholder="CEO"
                className="w-full rounded-lg border border-navy-200 px-3 py-2.5 text-sm outline-none focus:border-accent" /></div>
            <div><label className="block text-xs font-semibold text-navy-600 mb-1.5">Company</label>
              <input value={t.company} onChange={e => upd(t.id, { company: e.target.value })} placeholder="Company Ltd"
                className="w-full rounded-lg border border-navy-200 px-3 py-2.5 text-sm outline-none focus:border-accent" /></div>
          </div>
          <div><label className="block text-xs font-semibold text-navy-600 mb-1.5">Testimonial Text</label>
            <textarea value={t.text} onChange={e => upd(t.id, { text: e.target.value })} rows={3} placeholder="What the client said..."
              className="w-full rounded-lg border border-navy-200 px-4 py-2.5 text-sm outline-none focus:border-accent" /></div>
          <div><label className="block text-xs font-semibold text-navy-600 mb-2">Rating</label>
            <div className="flex gap-1">{[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => upd(t.id, { rating: s })}>
                <Star className={`h-5 w-5 transition ${s <= t.rating ? 'fill-amber-400 text-amber-400' : 'text-navy-200'}`} />
              </button>
            ))}</div></div>
        </div>
      ))}

      <button onClick={() => onSave({ ...data, testimonials: items })}
        className="flex items-center gap-2 rounded-xl bg-navy-900 px-7 py-3 text-sm font-semibold text-white shadow-lg hover:bg-navy-800 transition">
        <Save className="h-4 w-4" />Save Testimonials
      </button>
    </div>
  );
}
