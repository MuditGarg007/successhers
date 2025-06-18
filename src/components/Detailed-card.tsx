import  ChartEmail  from "@/components/chart-email";
import { CompanyInfo } from "./Company-info";

import { Company } from '@/store/companyStore';

type DetailedCardProps = {
  company: Company;
};

export default function DetailedCard({ company }: DetailedCardProps) {

  return (
    <section className="w-full max-w-6xl mx-auto relative">
      <div className="flex flex-col lg:flex-row gap-7">
        <div className="w-full lg:w-1/2">
          <CompanyInfo company={company}/>
        </div>
        <div className="w-full lg:w-1/2">
          <ChartEmail company={company}/>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-4 text-xs text-gray-900">
        <a href="https://logo.dev">Logos provided by Logo.dev</a>
      </div>
    </section>
  );
}
       

