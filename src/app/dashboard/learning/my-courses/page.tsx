"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

type Course = {
  title: string;
  provider: string;
  url: string;
  level: string;
  rationale: string;
};

type SkillCourses = {
  skill: string;
  courses: Course[];
};

function Page() {
  const { userSkills } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [skillCourses, setSkillCourses] = useState<SkillCourses[]>([]);

  const fetchCourses = async () => {
    if (!userSkills || userSkills.length === 0) {
      setError("No skills found. Complete the questionnaire first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: JSON.stringify({ skills: userSkills }) }),
      });
      const data = await res.json();

      // Try to parse the script as JSON
      let parsed: SkillCourses[] = [];
      try {
        parsed = JSON.parse(data.script);
      } catch {
        // Try to extract JSON from the string using RegExp
        const match = data.script.match(/\[[\s\S]*\]/);
        if (match) {
          parsed = JSON.parse(match[0]);
        } else {
          setError("Could not parse course recommendations.");
          setLoading(false);
          return;
        }
      }
      setSkillCourses(parsed);
    } catch (err) {
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-4"
        onClick={fetchCourses}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Fetch Recommended Courses"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && skillCourses.length > 0 && (
        <div className="mt-6">
          {skillCourses.map((skillBlock, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="font-bold text-lg mb-2">{skillBlock.skill}</h2>
              <ul className="ml-6 list-disc">
                {skillBlock.courses.map((course, cidx) => (
                  <li key={cidx} className="mb-2">
                    <a href={course.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                      {course.title}
                    </a>{" "}
                    <span className="text-sm text-gray-500">({course.provider}, {course.level})</span>
                    <div className="text-sm">{course.rationale}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && skillCourses.length === 0 && (
        <div className="mt-6 text-gray-500">No course recommendations found. Make sure you have suggested skills.</div>
      )}
    </div>
  );
}

export default Page;
