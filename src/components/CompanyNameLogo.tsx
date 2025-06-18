import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import CompanyLogo from "@/components/CompanyLogo";

import { Company } from '@/store/companyStore';

type CompanyNameLogoProps = {
  company: Company;
};

export default function CompanyNameLogo({company}: CompanyNameLogoProps) {


    return (

        <Card className="detailelCard-bg ">

        <CardContent className="flex items-center gap-4">

        <CompanyLogo name={company.name} className="h-20 w-20"/>

        <div>
          <CardTitle className="text-5xl">{company.name}</CardTitle>
        </div>
        </CardContent>

        </Card>


    )

}