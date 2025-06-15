'use client';

import CompanyCard from "@/components/company-card";
import ExpandedCard from "@/components/Expanded-card";
import { useState } from "react";
import { ExpandedCardProps } from "@/components/Expanded-card";
import { CompanyCardProps } from "@/components/company-card";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";




function Page() {

  const [expandedCompany, setExpandedCompany] = useState<ExpandedCardProps | null>(null);


  console.log(expandedCompany)

  const companies: ExpandedCardProps[] = [
  {
    name: "TechNova Solutions",
    logoUrl: "https://logo.clearbit.com/technova.com",
    womenInLeadership: 32,
    womenInBoard: 25,
    womenEmployed: 48,
    remote: true,
    maternity: true,
    recruiterEmails: ["hr@technova.com", "careers@technova.com"],
    socials: {
      linkedin: "https://linkedin.com/company/technova-solutions",
      twitter: "https://twitter.com/technovasol",
      glassdoor: "https://glassdoor.com/TechNova-Solutions"
    }
  },
  {
    name: "BrightCore Labs",
    logoUrl: "https://logo.clearbit.com/brightcorelabs.com",
    womenInLeadership: 18,
    womenInBoard: 12,
    womenEmployed: 37,
    remote: false,
    maternity: false,
    recruiterEmails: ["jobs@brightcorelabs.com"],
    socials: {
      linkedin: "https://linkedin.com/company/brightcorelabs",
      twitter: "https://twitter.com/brightcorelabs"
    }
  },
  {
    name: "FemWorks Inc.",
    logoUrl: "https://logo.clearbit.com/femworks.com",
    womenInLeadership: 50,
    womenInBoard: 40,
    womenEmployed: 70,
    remote: true,
    maternity: true,
    recruiterEmails: ["talent@femworks.com", "apply@femworks.com"],
    socials: {
      linkedin: "https://linkedin.com/company/femworks",
      twitter: "https://twitter.com/femworks",
      glassdoor: "https://glassdoor.com/FemWorks"
    }
  },
  {
    name: "NextSphere AI",
    logoUrl: "https://logo.clearbit.com/nextsphere.ai",
    womenInLeadership: 22,
    womenInBoard: 10,
    womenEmployed: 29,
    remote: true,
    maternity: false,
    recruiterEmails: ["recruit@nextsphere.ai"],
    socials: {
      linkedin: "https://linkedin.com/company/nextsphere-ai",
      glassdoor: "https://glassdoor.com/NextSphereAI"
    }
  },
  {
    name: "EcoCrest Ventures",
    logoUrl: "https://logo.clearbit.com/ecocrest.com",
    womenInLeadership: 35,
    womenInBoard: 28,
    womenEmployed: 55,
    remote: false,
    maternity: true,
    socials: {
      linkedin: "https://linkedin.com/company/ecocrest-ventures",
      twitter: "https://twitter.com/ecocrest"
    }
  }
];


  return (



 <div className="relative">
      {/* Normal Card Grid */}
      { !expandedCompany && 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {companies.map((company : CompanyCardProps) => (
          <CompanyCard 
            onClick={() => {setExpandedCompany(company) 
              console.log(company)}}
            key={company.name}
            name={company.name}
            logoUrl={company.logoUrl}
            womenInLeadership={company.womenInLeadership} 
            womenInBoard={company.womenInBoard}
            womenEmployed={company.womenEmployed}
            remote={company.remote} 
            maternity={company.maternity} />
        ))}
      </div>
      }
 {/* Fullscreen Expanded Card */}
      {expandedCompany && (
        <div className="fixed inset-0 z-50 p-6 overflow-y-auto transition-all duration-300">
          <div  className="max-w-4xl mx-auto">
            <ExpandedCard 
              name={expandedCompany.name}
              logoUrl={expandedCompany.logoUrl}
              womenInLeadership={expandedCompany.womenInLeadership}
              womenInBoard={expandedCompany.womenInBoard}
              womenEmployed={expandedCompany.womenEmployed} 
              remote={expandedCompany.remote}
              maternity={expandedCompany.maternity}
              socials={expandedCompany.socials}
              recruiterEmails={expandedCompany.recruiterEmails}
            />
            <button onClick={() => setExpandedCompany(null)} className="rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200">
              Close
            </button>
        </div>
    </div>
      )}
  </div>
  );







}


export default Page;
