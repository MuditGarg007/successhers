"use client";

import DetailedCard from "@/components/Detailed-card";
import { useCompanyStore } from '@/store/companyStore';

export default function ExpandedCard({ params }: { params: { name: string } }) {
  const getCompanyByName = useCompanyStore((state) => state.getCompanyByName);

  const company = getCompanyByName(decodeURIComponent(params.name || '')); // Decode the name parameter to handle URL encoding
  console.log("Company data:", company);


  if (!company) {
    return <div className="p-4 text-red-500">Company not found or data not loaded yet.</div>;
  }

  return ( 
    <div className="flex h-full w-full">
      <DetailedCard company={company} />
    </div>
  );
}
