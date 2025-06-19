'use client';

import React, { useState } from "react";
import CompanyCard from "@/components/company-card";
import { useCompanyStore } from '@/store/companyStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState(0);

  const companies = useCompanyStore((state) => state.companies);
  const setCompanies = useCompanyStore((state) => state.setCompanies);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, [loading]);

  const parsePercent = (val: string | undefined): number => {
    if (typeof val !== "string") return 0;
    const trimmed = val.trim();
    if (!trimmed.endsWith("%")) return 0;
    const num = parseInt(trimmed);
    return isNaN(num) ? 0 : num;
  };

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/cfinder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();

      let parsed: any = {};
      try {
        const cleaned = data.script.replace(/```json|```/g, "").trim();
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = {};
      }

      const companyData = {
        name: parsed.company_name || prompt,
        womenInLeadership: parsePercent(parsed.women_in_leadership),
        womenInBoard: parsePercent(parsed.women_in_board),
        womenEmployed: parsePercent(parsed.women_employees),
        about: parsed.about || "",
        remote:
          parsed.remote_work_options &&
          parsed.remote_work_options.toLowerCase().startsWith("y"),
        maternity:
          parsed.maternity_leave_policies &&
          parsed.maternity_leave_policies.toLowerCase().startsWith("y"),
        recruiterEmails: Array.isArray(parsed.recruiter_emails)
          ? parsed.recruiter_emails
          : [],
        socials:
          typeof parsed.socials === "object" && parsed.socials !== null
            ? parsed.socials
            : {},
      };

      // Use functional update to always get the latest state!
      setCompanies((prev) => [
        companyData,
        ...prev.filter(
          (c) => c.name.toLowerCase() !== companyData.name.toLowerCase()
        ),
      ]);
    } catch (e) {
      // Optionally handle error
    }
    setLoading(false);
    setDots(0);
    setPrompt("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Company</h1>
      <div className="mb-4 flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter company name"
          className="w-full p-2 rounded border"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className={`px-4 py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Searching" + ".".repeat(dots) : "Find"}
        </button>
      </div>
      {loading && (
        <div className="mt-2 text-lime-400 font-semibold text-lg">
          Searching for company data{".".repeat(dots)}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {companies.length === 0 ? (
          <div className="p-4 text-gray-500">No companies found. Try searching!</div>
        ) : (
          companies.map((company) => (
            <CompanyCard
              {...company}
              onClick={() => router.push(`/dashboard/jobs/companyfinder/${encodeURIComponent(company.name)}`)}
              key={company.name}
            />
          ))
        )}
        <div className="absolute bottom-0 right-0 p-4 text-xs text-gray-900">
          <a href="https://logo.dev">Logos provided by Logo.dev</a>
        </div>
      </div>
    </div>
  );
}
