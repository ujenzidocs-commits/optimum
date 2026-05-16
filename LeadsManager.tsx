import { useState } from 'react';
import { Search, Trash2, Mail, Phone, Building2, Calendar, ChevronDown, Download } from 'lucide-react';
import type { SiteData } from '../../data/siteData';

interface P { data: SiteData; onSave: (d: SiteData) => void }

const statusColors: Record<string, string> = {
  'New': 'bg-accent/10 text-accent',
  'Contacted': 'bg-blue-50 text-blue-600',
  'Qualified': 'bg-purple-50 text-purple-600',
  'Demo Scheduled': 'bg-amber-50 text-amber-600',
  'Closed Won': 'bg-green-50 text-green-700',
  'Closed Lost': 'bg-red-50 text-red-600',
};
const statuses = Object.keys(statusColors);

export default function LeadsManager({ data, onSave }: P) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = data.leads
    .filter(l => filterStatus === 'All' || l.status === filterStatus)
    .filter(l => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.company.toLowerCase().includes(q) || l.phone.includes(q);
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const updateStatus = (id: string, status: string) => {
    onSave({ ...data, leads: data.leads.map(l => l.id === id ? { ...l, status } : l) });
  };

  const removeLead = (id: string) => {
    if (confirm('Delete this lead permanently?')) {
      onSave({ ...data, leads: data.leads.filter(l => l.id !== id) });
    }
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Company', 'Business Type', 'Demo Date', 'Current Software', 'Message', 'Status', 'Date'];
    const rows = data.leads.map(l => [l.name, l.email, l.phone, l.company, l.businessType, l.demoDate, l.currentSoftware, l.message, l.status, l.createdAt]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${(c || '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'leads.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const newCount = data.leads.filter(l => l.status === 'New').length;

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Stats Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {[
          { label: 'Total', value: data.leads.length, color: 'bg-navy-50 text-navy-700' },
          { label: 'New', value: newCount, color: 'bg-accent/10 text-accent' },
          { label: 'Contacted', value: data.leads.filter(l => l.status === 'Contacted').length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Qualified', value: data.leads.filter(l => l.status === 'Qualified').length, color: 'bg-purple-50 text-purple-600' },
          { label: 'Demo Set', value: data.leads.filter(l => l.status === 'Demo Scheduled').length, color: 'bg-amber-50 text-amber-600' },
          { label: 'Won', value: data.leads.filter(l => l.status === 'Closed Won').length, color: 'bg-green-50 text-green-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl p-3 text-center ${s.color}`}>
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-[10px] font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search leads by name, email, phone..."
            className="w-full rounded-lg border border-navy-200 bg-white pl-10 pr-4 py-2.5 text-sm outline-none focus:border-accent" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="rounded-lg border border-navy-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-accent">
          <option value="All">All Status</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={exportCSV} disabled={data.leads.length === 0}
          className="flex items-center gap-2 rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50 transition disabled:opacity-40">
          <Download className="h-4 w-4" />Export CSV
        </button>
      </div>

      {/* Leads List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-navy-200 bg-white py-16 text-center">
          <Users className="mx-auto h-10 w-10 text-navy-300" />
          <p className="mt-3 text-sm font-medium text-navy-500">{data.leads.length === 0 ? 'No leads yet' : 'No leads match your filters'}</p>
          <p className="mt-1 text-xs text-navy-400">{data.leads.length === 0 ? 'Demo requests from the contact form will appear here.' : 'Try a different search or status filter.'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(l => (
            <div key={l.id} className={`rounded-2xl border bg-white overflow-hidden transition ${expandedId === l.id ? 'border-accent/30 shadow-md' : 'border-navy-200'}`}>
              <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === l.id ? null : l.id)}>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-navy-700 to-navy-900 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {l.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-900 truncate">{l.name}</p>
                    {l.status === 'New' && <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />}
                  </div>
                  <p className="text-xs text-navy-500 truncate">{l.email} · {l.company || 'No company'}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${statusColors[l.status] || 'bg-navy-100 text-navy-600'}`}>
                  {l.status}
                </span>
                <span className="text-[10px] text-navy-400 hidden sm:block whitespace-nowrap">
                  {new Date(l.createdAt).toLocaleDateString()}
                </span>
                <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform shrink-0 ${expandedId === l.id ? 'rotate-180' : ''}`} />
              </div>

              {expandedId === l.id && (
                <div className="border-t border-navy-100 p-5 space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="flex items-start gap-2"><Mail className="h-4 w-4 text-navy-400 mt-0.5 shrink-0" /><div><p className="text-[10px] text-navy-500 font-medium">Email</p><p className="text-sm text-navy-900">{l.email}</p></div></div>
                    <div className="flex items-start gap-2"><Phone className="h-4 w-4 text-navy-400 mt-0.5 shrink-0" /><div><p className="text-[10px] text-navy-500 font-medium">Phone</p><p className="text-sm text-navy-900">{l.phone}</p></div></div>
                    <div className="flex items-start gap-2"><Building2 className="h-4 w-4 text-navy-400 mt-0.5 shrink-0" /><div><p className="text-[10px] text-navy-500 font-medium">Company</p><p className="text-sm text-navy-900">{l.company || 'N/A'}</p></div></div>
                    <div className="flex items-start gap-2"><Calendar className="h-4 w-4 text-navy-400 mt-0.5 shrink-0" /><div><p className="text-[10px] text-navy-500 font-medium">Demo Date</p><p className="text-sm text-navy-900">{l.demoDate || 'Flexible'}</p></div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[10px] text-navy-500 font-medium mb-0.5">Business Type</p><p className="text-sm text-navy-900">{l.businessType || 'Not specified'}</p></div>
                    <div><p className="text-[10px] text-navy-500 font-medium mb-0.5">Current Software</p><p className="text-sm text-navy-900">{l.currentSoftware || 'Not specified'}</p></div>
                  </div>
                  {l.message && (
                    <div><p className="text-[10px] text-navy-500 font-medium mb-1">Message</p>
                      <p className="text-sm text-navy-700 bg-navy-50 rounded-xl p-3 leading-relaxed">{l.message}</p></div>
                  )}
                  <div className="flex items-center justify-between border-t border-navy-100 pt-4">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-navy-600">Status:</label>
                      <select value={l.status} onChange={e => updateStatus(l.id, e.target.value)}
                        className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm font-medium outline-none focus:border-accent">
                        {statuses.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`mailto:${l.email}`} className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent/20 transition">
                        Send Email
                      </a>
                      <button onClick={() => removeLead(l.id)}
                        className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 transition"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <p className="text-[10px] text-navy-400">Submitted: {new Date(l.createdAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
