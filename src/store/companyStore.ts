import { create } from 'zustand'

export type Company = {
  name: string;
  womenInLeadership: number;
  womenInBoard: number;
  womenEmployed: number;
  about: string;
  remote: boolean;
  maternity: boolean;
  recruiterEmails: string[];
  socials: {
     [key: string]: string | undefined; // accepts keys like linkedin, twitter etc.
  };
}

type CompanyStore = {
  companies: Company[]
  setCompanies: (companyList: Company[]) => void
  getCompanyByName: (name: string) => Company | undefined
}

export const useCompanyStore = create<CompanyStore>((set, get) => ({
  companies: [],
  setCompanies: (companyList) => set({ companies: companyList }),
  getCompanyByName: (name) =>
    get().companies.find((company) => company.name === name),
}))
