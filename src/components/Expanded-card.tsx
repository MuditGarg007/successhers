import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { Badge } from "@/components/ui/badge";
import { MapPin, Users, BriefcaseBusiness, Crown, Globe, Twitter, Linkedin ,MapPinOff, Baby   } from "lucide-react";

export interface ExpandedCardProps {
  name: string;
  logoUrl: string;
  womenInLeadership: number;
  womenInBoard: number;
  womenEmployed: number;
  remote: boolean;
  maternity: boolean;
  recruiterEmails?: string[];
  socials?: {
    linkedin?: string;  
    twitter?: string;
    glassdoor?: string;
    };
  
}

export default function ExpandedCard({
  name,
  logoUrl,
  womenInLeadership,
  womenInBoard,
  womenEmployed,
  remote,
  maternity,
  recruiterEmails = [],
  socials = { linkedin: '', twitter: '', glassdoor: ''
  }
  
}: ExpandedCardProps) {

  return (
    <Card  className="bg-gradient-to-tr from-pink-400/30 to-transparent text-primary w-full h-full max-w-md rounded-2xl shadow-md border hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <CardHeader className="flex items-center gap-4">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-12 h-12 rounded-md object-cover"
        />
        <div>
          <CardTitle className="text-3xl">{name}</CardTitle>
    
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-md gap-2">
          <Crown className="w-4 h-4" />
        <span className="font-medium">{womenInLeadership}% Women in Leadership</span>
        </div>
        <div className="flex items-center text-md gap-2">
          <BriefcaseBusiness className="w-4 h-4"/>
          <span className="font-medium">{womenEmployed}% Women Employed</span>
        </div>
        <div className="flex items-center text-md gap-2 ">
          <Users className="w-4 h-4" />
          <span className="font-medium">{womenInBoard}% Women Board Members</span>
        </div>
        
         
          
        
         <div className="flex items-center gap-2 text-md">
            {remote ? (
                <>
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Remote Work Friendly</span>
                </>
                
            ) : ( 
                <>
                <MapPinOff className="w-4 h-4" />
                <span className="font-medium">On-site Only</span>
                </>
            )}
        </div>
        <div className="flex items-center gap-2 text-md">
       {maternity ? (
            <>
            <Baby className="w-4 h-4"/>
            <span className="font-medium">Maternity Leave: Better than legal minimum</span>
            </>
            ) : ( 
            <>
            <Baby className="w-4 h-4"/>
            <span className="font-medium">Maternity Leave: Below legal minimum</span>
            </>
            )}
       </div>


<div className="outline mt-4 p-4 rounded-md">
  <h3 className="mb-2 font-semibold text-lg">{`About ${name}`}</h3>
<p className="text-md">
  NextSphere AI is a mid-sized AI firm focused on predictive analytics and automation. While it offers remote flexibility, its maternity benefits are below industry standards.
</p>
</div>

        
  {/* Socials + Recruiter Emails */}
  <div className="w-full outline mt-4 px-4 py-1 rounded-md">
   
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="font-semibold text-lg">Recruiter Emails</AccordionTrigger>
    <AccordionContent>
      <ul className="list-disc list-inside text-md cursor-pointer">
      {recruiterEmails.map((mail: string, idx: number) => (
        <div key={idx} className="flex items-center justify-between mb-2">
             <li  className="list-none italic">{mail}</li>
             <button className="outline bg-gradient-to-tr from-blue-400/60 hover:from-blue-400/80 px-5 py-2 rounded-md cursor-pointer">Send Email</button>
             
        </div>
      ))}
    </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion>
 </div>


    <CardFooter className="p-0 mt-4">
                
     <div className="flex gap-3">
      <a href="https://linkedin.com/company/example" target="_blank" rel="noopener noreferrer">
        <Linkedin className="w-5 h-5 neon-icon"/>
      </a>
      <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
        <Twitter className="w-5 h-5 neon-icon" /> 
      </a>
      <a href="https://glassdoor.com/example" target="_blank" rel="noopener noreferrer">
        <Globe className="w-5 h-5 neon-icon"/>  
      </a>
    </div>

 
            </CardFooter>

      </CardContent>
    </Card>
  );
}