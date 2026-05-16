import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { load, save, type SiteData } from '../data/siteData';
interface Ctx { data: SiteData; update: (d: SiteData) => void }
const C = createContext<Ctx | undefined>(undefined);
export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => load());
  const update = useCallback((d: SiteData) => { setData(d); save(d); }, []);
  return <C.Provider value={{ data, update }}>{children}</C.Provider>;
}
export function useSite() { const c = useContext(C); if (!c) throw new Error('wrap in SiteProvider'); return c; }
