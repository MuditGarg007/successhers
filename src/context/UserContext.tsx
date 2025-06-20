"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type QuestionnaireData = {
  name: string;
  email: string;
  education: string;
  experience: string;
  interest: string;
  skills: string;
  hours: string;
  goal: string;
  jobInterests: string[];
  otherJobInterest?: string;
  hoursPerWeek: string;
  currentGoal: string;
};

type UserContextType = {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  questionnaire: QuestionnaireData | null;
  setQuestionnaire: (data: QuestionnaireData) => void;
  userSkills: string[];
  setUserSkills: (skills: string[]) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [questionnaire, setQuestionnaire] = useState<QuestionnaireData | null>(null);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedQuestionnaire = localStorage.getItem("userQuestionnaire");
    const storedSkills = localStorage.getItem("userSkills");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedQuestionnaire) setQuestionnaire(JSON.parse(storedQuestionnaire));
    if (storedSkills) setUserSkills(JSON.parse(storedSkills));
  }, []);

  // Save to localStorage on change
  const handleSetName = (newName: string) => {
    setName(newName);
    localStorage.setItem("userName", newName);
  };
  const handleSetEmail = (newEmail: string) => {
    setEmail(newEmail);
    localStorage.setItem("userEmail", newEmail);
  };
  const handleSetQuestionnaire = (data: QuestionnaireData) => {
    setQuestionnaire(data);
    localStorage.setItem("userQuestionnaire", JSON.stringify(data));
  };
  const handleSetUserSkills = (skills: string[]) => {
    setUserSkills(skills);
    localStorage.setItem("userSkills", JSON.stringify(skills));
  };

  return (
    <UserContext.Provider
      value={{
        name,
        setName: handleSetName,
        email,
        setEmail: handleSetEmail,
        questionnaire,
        setQuestionnaire: handleSetQuestionnaire,
        userSkills,
        setUserSkills: handleSetUserSkills,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}