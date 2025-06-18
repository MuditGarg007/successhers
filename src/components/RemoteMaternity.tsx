import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MapPin, MapPinOff, Baby } from "lucide-react";

import { Company } from '@/store/companyStore';

type RemoteMaternityProps = {
  company: Company;
};


export default function RemoteMaternity({company }: RemoteMaternityProps) {

    return (

        <Card className="detailelCard-bg">
            <CardHeader>
                <CardTitle className="text-3xl">Workplace Benefits</CardTitle>
                <CardDescription>See how this company supports remote work and maternity leave</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
               <div className="flex items-center gap-2 text-md">
                           {company.remote ? (
                               <>
                               <MapPin className="w-5 h-5" />
                               <span>Remote Work Friendly</span>
                               </>
                               
                           ) : ( 
                               <>
                               <MapPinOff className="w-5 h-5" />
                               <span>On-site Only</span>
                               </>
                           )}
                       </div>
                       <div className="flex items-center gap-2 text-md">
                      {company.maternity ? (
                           <>
                           <Baby className="w-5 h-5"/>
                           <span>Maternity Leave: Better than legal minimum</span>
                           </>
                           ) : ( 
                           <>
                           <Baby className="w-5 h-5"/>
                           <span>Maternity Leave: Below legal minimum</span>
                           </>
                           )}
                      </div>
            </CardContent>
        </Card>

    )
}