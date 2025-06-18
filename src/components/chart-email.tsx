import { ChartPieInteractive } from "@/components/ChartPieInteractive"
import { CardEmail } from "@/components/Card-email"

import { Company } from '@/store/companyStore';

type ChartEmailProps = {
  company: Company;
};


export default function ChartEmail({company}: ChartEmailProps) {
    return (

        <section className="w-full h-[700px] flex flex-col gap-6 p-0.5 md:p-1 lg:p-2">
              <div className="w-full">
                <ChartPieInteractive company={company}/>
              </div>
        
              <div className="w-full">
                <CardEmail company={company}/>
              </div>
            </section>

    )
}