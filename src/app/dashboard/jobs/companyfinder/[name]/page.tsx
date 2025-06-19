"use client";

import React from "react";
import { useCompanyStore } from "@/store/companyStore";
import DetailedCard from "@/components/Detailed-card"; // or your details component

export default function ExpandedCard({ params }: { params: Promise<{ name: string }> }) {
  // Unwrap the params promise
  const { name } = React.use(params);

  const getCompanyByName = useCompanyStore((state) => state.getCompanyByName);
  const company = getCompanyByName(decodeURIComponent(name || ""));

  if (!company) {
    return <div className="p-4 text-red-500">Company not found or data not loaded yet.</div>;
  }

  return (
    <div className="flex h-full w-full">
      <DetailedCard company={company} />
    </div>
  );
}
