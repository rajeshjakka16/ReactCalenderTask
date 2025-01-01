import { create } from 'zustand';
import { CommunicationMethod, Company, Communication } from '../types';
import { generateId } from '../lib/utils';

interface AppState {
  companies: Company[];
  communications: Communication[];
  communicationMethods: CommunicationMethod[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, company: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  addCommunication: (communication: Omit<Communication, 'id'>) => void;
  updateCommunicationMethod: (id: string, method: Partial<CommunicationMethod>) => void;
}

const defaultCommunicationMethods: CommunicationMethod[] = [
  {
    id: '1',
    name: 'LinkedIn Post',
    description: 'Post on company LinkedIn page',
    sequence: 1,
    isMandatory: true,
  },
  {
    id: '2',
    name: 'LinkedIn Message',
    description: 'Direct message on LinkedIn',
    sequence: 2,
    isMandatory: true,
  },
  {
    id: '3',
    name: 'Email',
    description: 'Email communication',
    sequence: 3,
    isMandatory: true,
  },
  {
    id: '4',
    name: 'Phone Call',
    description: 'Phone call communication',
    sequence: 4,
    isMandatory: true,
  },
  {
    id: '5',
    name: 'Other',
    description: 'Other forms of communication',
    sequence: 5,
    isMandatory: false,
  },
];

export const useAppStore = create<AppState>((set) => ({
  companies: [],
  communications: [],
  communicationMethods: defaultCommunicationMethods,
  
  addCompany: (company) =>
    set((state) => ({
      companies: [...state.companies, { ...company, id: generateId() }],
    })),
    
  updateCompany: (id, company) =>
    set((state) => ({
      companies: state.companies.map((c) =>
        c.id === id ? { ...c, ...company } : c
      ),
    })),
    
  deleteCompany: (id) =>
    set((state) => ({
      companies: state.companies.filter((c) => c.id !== id),
    })),
    
  addCommunication: (communication) =>
    set((state) => ({
      communications: [
        ...state.communications,
        { ...communication, id: generateId() },
      ],
    })),
    
  updateCommunicationMethod: (id, method) =>
    set((state) => ({
      communicationMethods: state.communicationMethods.map((m) =>
        m.id === id ? { ...m, ...method } : m
      ),
    })),
}));