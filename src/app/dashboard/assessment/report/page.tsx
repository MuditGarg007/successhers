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

const hoursPerWeekLabels: Record<string, string> = {
  lt5: "Less than 5 hours",
  "5to10": "5–10 hours",
  gt10: "10+ hours",
};

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
    <div>
      <div>
        <strong>Full Name:</strong> {questionnaire.name}
      </div>
      <div>
        <strong>Email Address:</strong> {questionnaire.email}
      </div>
      <div>
        <strong>Highest Level of Education:</strong> {questionnaire.education}
      </div>
      <div>
        <strong>Work Experience:</strong>{" "}
        {experienceLabels[questionnaire.experience] || "Not specified"}
      </div>
      <div>
        <strong>Job Interests:</strong>{" "}
        {questionnaire.jobInterests
          .map((id) =>
            id === "other" && questionnaire.otherJobInterest
              ? `Other: ${questionnaire.otherJobInterest}`
              : jobInterestLabels[id] || id
          )
          .join(", ")}
      </div>
      <div>
        <strong>Hours Per Week:</strong>{" "}
        {hoursPerWeekLabels[questionnaire.hoursPerWeek] || "Not specified"}
      </div>
      <div>
        <strong>Current Goal:</strong>{" "}
        {goalLabels[questionnaire.currentGoal] || "Not specified"}
      </div>
    </div>
  );
}

export default Page;
