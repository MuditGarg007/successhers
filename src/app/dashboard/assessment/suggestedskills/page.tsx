"use client";
import { useEffect, useState } from "react";

type Evaluation = {
  category?: string;
  rationale?: string;
  skills?: string[] | string;
};

function Page() {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  useEffect(() => {
    // Get the evaluation from localStorage
    const script = localStorage.getItem("skillsEvaluation");
    if (script) {
      try {
        const parsed = JSON.parse(script);
        // If skills is a string, try to parse it as JSON array or split by comma
        let skills: string[] = [];
        if (parsed.skills) {
          if (Array.isArray(parsed.skills)) {
            skills = parsed.skills;
          } else if (typeof parsed.skills === "string") {
            try {
              // Try to parse as JSON array
              const arr = JSON.parse(parsed.skills);
              if (Array.isArray(arr)) {
                skills = arr;
              } else {
                // Fallback: split by comma
                skills = parsed.skills.split(",").map((s: string) => s.trim());
              }
            } catch {
              // Fallback: split by comma
              skills = parsed.skills.split(",").map((s: string) => s.trim());
            }
          }
        }
        setEvaluation({ ...parsed, skills });
      } catch {
        setEvaluation({ category: "Error", rationale: "Could not parse evaluation result." });
      }
    }
  }, []);

  return (
    <div>
      <h1>Suggested Skills</h1>
      {evaluation ? (
        <div className="mt-6">
          <div>
            <strong>Category:</strong> {evaluation.category}
          </div>
          <div>
            <strong>Rationale:</strong> {evaluation.rationale}
          </div>
          <div>
            <strong>Recommended Skills:</strong>
            {evaluation.skills && Array.isArray(evaluation.skills) && evaluation.skills.length > 0 ? (
              <ul className="list-disc ml-6">
                {evaluation.skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            ) : (
              <span> None</span>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6 text-gray-500">No evaluation found. Please complete the questionnaire.</div>
      )}
    </div>
  );
}

export default Page;
