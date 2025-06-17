import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Company } from '@/store/companyStore';

type CompanyAboutProps = {
  company: Company;
};


export default function CompanyAbout({company}: CompanyAboutProps) {

    return (
        <Card className="detailelCard-bg">
            <CardHeader>
                <CardTitle className="text-3xl">About {company.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{company.about}</p>
            </CardContent>
            
        </Card>
    )
}