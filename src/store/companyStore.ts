import { create } from 'zustand';

export type Company = {
  name: string;
  womenInLeadership: number;
  womenInBoard: number;
  womenEmployed: number;
  about: string;
  remote: boolean;
  maternity: boolean;
  recruiterEmails: string[];
  socials: { [key: string]: string | undefined };
};

type CompanyStore = {
  companies: Company[];
  setCompanies: (updater: Company[] | ((prev: Company[]) => Company[])) => void;
  getCompanyByName: (name: string) => Company | undefined;
};

export const useCompanyStore = create<CompanyStore>((set, get) => ({
  companies: [],
  setCompanies: (updater) =>
    set((state) => ({
      companies:
        typeof updater === "function" ? updater(state.companies) : updater,
    })),
  getCompanyByName: (name) =>
    get().companies.find((company) => company.name === name),
}));
