'use client';

import { useEffect, useState } from "react";
import { fetchLogoUrl } from "@/lib/fetchLogoUrl";

type CompanyLogoProps = {
  name: string;
  className?: string;
};

export default function CompanyLogo({ name, className }: CompanyLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const company_name = name.toLowerCase().replace(/\s/g, '');

  useEffect(() => {
    async function getLogo() {
      const url = await fetchLogoUrl(company_name);
      setLogoUrl(url);
    }

    getLogo();
  }, [name]);

  return (
    <img
      src={logoUrl ?? undefined}
      alt="Company Logo"
      className={`rounded-md object-cover ${className ?? ""}`}
    />
  );
}
