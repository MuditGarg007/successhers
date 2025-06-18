'use client';

import CompanyCard from "@/components/company-card";
import { CompanyCardProps } from "@/components/company-card";
import { useCompanyStore } from '@/store/companyStore'



import { useRouter } from 'next/navigation';

function Page() {

  const companies = useCompanyStore((state) => state.companies)
  const router = useRouter();

if (companies.length === 0) {
  return <div className="p-4 text-gray-500">Loading companies...</div>;
}

  return (

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {companies.map((company : CompanyCardProps) => (
          <CompanyCard 
            onClick={() => router.push(`/dashboard/jobs/matched/${company.name}`)}
            key={company.name}
            name={company.name}
            womenInLeadership={company.womenInLeadership} 
            womenInBoard={company.womenInBoard}
            womenEmployed={company.womenEmployed}
            remote={company.remote} 
            maternity={company.maternity} />
        ))}
        <div className="absolute bottom-0 right-0 p-4 text-xs text-gray-900">
        <a href="https://logo.dev">Logos provided by Logo.dev</a>
      </div>
      </div>
 



  
  );

}


export default Page;
