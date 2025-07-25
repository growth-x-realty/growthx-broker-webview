import type { Lead, Property } from '@/types/types';
import { create } from 'zustand'

//================== PROPERTY ============================

type proppertyStore = {
    data: Map<string, Property>;
    keys: string[];
    setProperties: (properties: Property[]) => void;
}
export const useStoreProperty = create<proppertyStore>((set) => ({
    data: new Map(),
    keys: [],
    setProperties: (properties) => {
        set(() => {
            const data = new Map(properties.map(p => [p._id, p]));
            const keys: string[] = [];
            data.forEach(({ _id }) => keys.push(_id))
            console.log("setProperties", { properties, data, keys })
            return { data, keys }
        })
    }
}))

//================== LEAD   ============================


type leadStore = {
    data: Map<string, Lead>;
    keys: string[];
    setLeads: (leads: Lead[]) => void;
    addLead: (lead: Lead) => void;
}
export const useStoreLead = create<leadStore>((set) => ({
    data: new Map(),
    keys: [],
    setLeads: (leads) => {
        set(() => {
            const data = new Map(leads.map(l => [l._id, l]));
            const keys: string[] = [];
            data.forEach(({ _id }) => keys.push(_id))
            console.log("setLeads", { leads, data, keys });
            return { data, keys }
        })
    },
    addLead: (lead) => {
        set((state) => {
            const data = new Map(state.data);
            data.set(lead._id, lead);
            const keys = [lead._id, ...state.keys]
            console.log('addLead', { lead, data, keys });
            return { data: data, keys };
        })
    }
}))

//================== PROPERTY_LEAD   ============================

type PLStore = {
    p_l: Map<string, string[]>,
    l_p: Map<string, string[]>,
    setPl: (list: { l_id: string, p_id: string }[]) => void;
    addPL: (p_id: string, l_id: string) => void;
}

export const useStorePL = create<PLStore>((set) => ({
    p_l: new Map(),
    l_p: new Map(),
    setPl: (list) => {
        set(() => {
            const p_l = new Map();
            const l_p = new Map();
            list.forEach(({ l_id, p_id }) => {
                p_l.set(p_id, [l_id, ...p_l.get(p_id) || []])
                l_p.set(l_id, [p_id, ...l_p.get(l_id) || []])
            })
            console.log('setPl', { list, p_l, l_p });
            return { p_l, l_p }
        })
    },
    addPL: (p_id, l_id) => {
        set((s) => {
            s.p_l.set(p_id, [l_id, ...s.p_l.get(p_id) || []]);
            s.l_p.set(l_id, [p_id, ...s.l_p.get(l_id) || []]);
            console.log('addPL', { p_id, l_id, p_l: s.p_l, l_p: s.l_p });
            return { p_l: new Map(s.p_l), l_p: new Map(s.l_p) };
        })
    },
}))

//================== INTERESTED   ============================

type Interested = {
    set: Set<string>;
    setIntersted: (list: string[]) => void;
    addInterested: (p_id: string) => void;
}

export const useStoreInterested = create<Interested>((set) => ({
    set: new Set(),
    addInterested: (p_id) => {
        set((s) => {
            s.set.add(p_id);
            console.log('addInterested', { p_id, set: s.set });
            return { set: new Set(s.set) };
        })
    },
    setIntersted: (list) => {
        set(() => {
            const set = new Set(list);
            console.log('setInterested', { list, set });
            return { set };
        })
    },
}))