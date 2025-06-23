"use client";

import { useUser } from "@/context/UserContext";

const experienceLabels: Record<string, string> = {
  "0": "No experience",
  "1": "Less than 1 year",
  "2": "1–3 years",
  "3": "3+ years",
};

const jobInterestLabels: Record<string, string> = {
  technology: "Technology / IT",
  design: "Design / Creativity",
  teaching: "Teaching / Training",
  business: "Business / Marketing",
  health: "Health / Wellness",
  other: "Other (please specify)",
};

// const hoursPerWeekLabels: Record<string, string> = {
//   lt5: "Less than 5 hours",
//   "5to10": "5–10 hours",
//   gt10: "10+ hours",
// };

const goalLabels: Record<string, string> = {
  first_job: "Get my first job",
  upskill: "Change my field / upskill",
  restart: "Restart my career after a break",
};

function Page() {
  const { questionnaire } = useUser();

  if (!questionnaire) {
    return <div>No questionnaire data found for this session.</div>;
  }

  return (
    <div className="max-w-xl p-6 border border-pink-700 rounded-2xl mx-3">
      <h1 className="text-2xl font-bold mb-4">Report</h1>
      <dl>
        <div className="py-2 border-b border-gray-900">
          <dt className="font-medium text-pink-700">Full Name</dt>
          <dd>{questionnaire.name}</dd>
        </div>
        <div className="py-2 border-b border-gray-900">
          <dt className="font-medium text-pink-700">Email Address</dt>
          <dd>{questionnaire.email}</dd>
        </div>
        <div className="py-2 border-b border-gray-900">
          <dt className="font-medium text-pink-700">Highest Level of Education</dt>
          <dd>{questionnaire.education}</dd>
        </div>
        <div className="py-2 border-b border-gray-900">
          <dt className="font-medium text-pink-700">Work Experience</dt>
          <dd>{experienceLabels[questionnaire.experience] || "Not specified"}</dd>
        </div>
        <div className="py-2 border-b border-gray-900">
          <dt className="font-medium text-pink-700">Job Interests</dt>
          <dd>
            {questionnaire.jobInterests
              .map((id) =>
                id === "other" && questionnaire.otherJobInterest
                  ? `Other: ${questionnaire.otherJobInterest}`
                  : jobInterestLabels[id] || id
              )
              .join(", ")}
          </dd>
        </div>
        <div className="py-2 border-b border-gray-900">
          <dt className="font-medium text-pink-700">Hours Per Week</dt>
          <dd>{questionnaire.hoursPerWeek || "Not specified"}</dd>
        </div>
        <div className="py-2 ">
          <dt className="font-medium text-pink-700">Current Goal</dt>
          <dd>{goalLabels[questionnaire.currentGoal] || "Not specified"}</dd>
        </div>
      </dl>
    </div>
  );

}

export default Page;
