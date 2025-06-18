"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type UserContextType = {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
};

const UserContext = createContext<UserContextType>({
  name: "Ananya",
  email: "ananya.slayqueen@gmail.com",
  setName: () => {},
  setEmail: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setNameState] = useState("Ananya");
  const [email, setEmailState] = useState("ananya.slayqueen@gmail.com");

  // Load from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    if (storedName) setNameState(storedName);
    if (storedEmail) setEmailState(storedEmail);
  }, []);

  // Save to localStorage on change
  const setName = (newName: string) => {
    setNameState(newName);
    localStorage.setItem("userName", newName);
  };
  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
    localStorage.setItem("userEmail", newEmail);
  };

  return (
    <UserContext.Provider value={{ name, setName, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};