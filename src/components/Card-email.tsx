import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {  Globe, Twitter, Linkedin, Send } from 'lucide-react';

import { Company } from '@/store/companyStore';

type CardEmailProps = {
  company: Company;
};



export function CardEmail({company}: CardEmailProps) {


  return (

    <Card className="detailelCard-bg">
      <CardHeader>
        <CardTitle className="text-3xl">Recruiter's Emails</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full rounded-md">
   

      <ul className="list-disc list-inside text-md cursor-pointer">
      {company.recruiterEmails.map((mail: string, idx: number) => (
        <div key={idx} className="flex items-center justify-between mb-2">
             <li  className="list-none text-md mb-1">{mail}</li>
             <Send  className="w-5 h-5"/>
             {/* <button className="outline bg-gradient-to-tr from-blue-400/60 hover:from-blue-400/80 px-5 py-2 rounded-md cursor-pointer">Send Email</button> */}
             
        </div>
      ))}
    </ul>
   
 </div>
      </CardContent>
      <CardFooter className="">
       <div className="flex gap-3 ">
             <a href="https://linkedin.com/company/example" target="_blank" rel="noopener noreferrer">
               <Linkedin className="w-6 h-6 neon-icon"/>
             </a>
             <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
               <Twitter className="w-6 h-6 neon-icon" /> 
             </a>
             <a href="https://glassdoor.com/example" target="_blank" rel="noopener noreferrer">
               <Globe className="w-6 h-6 neon-icon"/>  
             </a>
           </div>
      </CardFooter>
</Card>

  )}