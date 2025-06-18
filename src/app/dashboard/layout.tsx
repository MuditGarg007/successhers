'use client';

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from 'react'
import { useCompanyStore } from '@/store/companyStore'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const setCompanies = useCompanyStore((state) => state.setCompanies)
    
      useEffect(() => {
        // Dummy data
        
        const dummyCompanies = [
  {
    name: "Google",
    womenInLeadership: 32,
    womenInBoard: 28,
    womenEmployed: 42,
    about: `Google, a subsidiary of Alphabet Inc., is a global leader in internet services and products. Known for its pioneering work in search engines, cloud computing, and artificial intelligence, Google continues to shape the future of technology. 
    
    Google is considered a progressive workplace for women, with programs like Women Techmakers, generous parental leave policies, and leadership training initiatives focused on female empowerment. It has also published diversity reports annually to increase transparency and accountability.`,
    remote: true,
    maternity: true,
    recruiterEmails: ["careers@google.com"],
    socials: {
      linkedin: "https://linkedin.com/company/google",
      twitter: "https://twitter.com/google",
      instagram: "https://instagram.com/google"
    }
  },
  {
    name: "Microsoft",
    womenInLeadership: 35,
    womenInBoard: 40,
    womenEmployed: 44,
    about: `Microsoft is a multinational technology corporation known for its software products like Windows, Office, and Azure. Committed to empowering every person and organization on the planet to achieve more, Microsoft invests heavily in AI, cloud computing, and enterprise software.

    The company has consistently ranked high for gender equality, with female leadership programs, internal communities like Women at Microsoft, and a strong commitment to pay equity. Flexible work options and comprehensive parental benefits make it a top choice for women in tech.`,
    remote: true,
    maternity: true,
    recruiterEmails: ["jobs@microsoft.com"],
    socials: {
      linkedin: "https://linkedin.com/company/microsoft",
      twitter: "https://twitter.com/microsoft"
    }
  },
  {
    name: "Netflix",
    womenInLeadership: 48,
    womenInBoard: 38,
    womenEmployed: 51,
    about: `Netflix is the world's leading streaming entertainment service with over 200 million subscribers in more than 190 countries. It produces and distributes original content globally, often pushing creative and cultural boundaries.

    Netflix is praised for its inclusive and open culture. The company provides strong parental leave regardless of gender, supports women in creative and executive roles, and publicly reports on representation data. Many women employees cite high autonomy and career growth as key strengths.`,
    remote: true,
    maternity: true,
    recruiterEmails: ["talent@netflix.com"],
    socials: {
      linkedin: "https://linkedin.com/company/netflix",
      twitter: "https://twitter.com/netflix"
    }
  },
  {
    name: "Adobe",
    womenInLeadership: 40,
    womenInBoard: 33,
    womenEmployed: 46,
    about: `Adobe is a global software company best known for its creative tools like Photoshop, Illustrator, and Premiere Pro. It also offers industry-leading digital marketing solutions and document workflows through Adobe Acrobat and Experience Cloud.

    Adobe has received accolades for being a supportive employer for women, offering mentorship opportunities, unconscious bias training, and flexible work arrangements. Their Equal Pay Pledge and high representation of women in senior roles set them apart in the tech industry.`,
    remote: true,
    maternity: true,
    recruiterEmails: ["careers@adobe.com"],
    socials: {
      linkedin: "https://linkedin.com/company/adobe",
      twitter: "https://twitter.com/adobe"
    }
  },
  {
    name: "Amazon",
    womenInLeadership: 29,
    womenInBoard: 24,
    womenEmployed: 37,
    about: `Amazon is one of the world's largest e-commerce and cloud computing companies. Its services range from online retail and smart devices to AWS cloud infrastructure and AI-based logistics.

    While Amazon has been working to improve workplace conditions, it remains a mixed bag for women. The company has increased hiring of women in tech roles, expanded maternity benefits, and introduced return-to-work programs, but its fast-paced environment can be demanding.`,
    remote: false,
    maternity: true,
    recruiterEmails: ["recruit@amazon.com"],
    socials: {
      linkedin: "https://linkedin.com/company/amazon",
      twitter: "https://twitter.com/amazon"
    }
  }
];

    
        setCompanies(dummyCompanies)
      }, [setCompanies])
    
  

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
            {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
