import CompanyNameLogo from "./CompanyNameLogo";
import CompanyAbout from "./CompanyAbout";
import RemoteMaternity from "./RemoteMaternity";

import { Company } from '@/store/companyStore';

type CompanyInfoProps = {
  company: Company;
};

export function CompanyInfo({ company }: CompanyInfoProps) {
  return (
    <section className="w-full flex flex-col gap-6 p-0.5 md:p-1 lg:p-2 ">
      <div className="w-full">
        <CompanyNameLogo company={company}/>
      </div>

      <div className="w-full">
        <CompanyAbout company={company} />
      </div>

      <div className="w-full">
        <RemoteMaternity company={company}/>
      </div>
    </section>
  );
}
