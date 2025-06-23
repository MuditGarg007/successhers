"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1a1a1a 60%, #2d0036 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Image
          src="/images/logo.png"
          alt="SuccessHers Logo"
          width={90}
          height={90}
          style={{ margin: "0 auto", borderRadius: "50%" }}
        />
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "#ff69b4",
            margin: "1.5rem 0 0.5rem",
            letterSpacing: 1,
          }}
        >
          SuccessHers
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#ffe0f7",
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          Empowering women in India to discover their strengths, upskill, and
          connect with meaningful job opportunities. Your journey to success
          starts here.
        </p>
      </div>
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <button
          style={{
            padding: "1rem 2.5rem",
            fontSize: "1.1rem",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(90deg, #ff69b4 60%, #ffb6e6 100%)",
            color: "#fff",
            fontWeight: 600,
            boxShadow: "0 2px 12px #ff69b422",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onClick={() => router.push("/questionnare")}
        >
          Get Started
        </button>
      </div>
      <div
        style={{
          marginTop: "3rem",
          color: "#ffe0f7",
          fontSize: "1rem",
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <span>
          SuccessHers is your digital mentor and companion, supporting you from
          self-discovery to landing your dream job.
        </span>
      </div>
    </div>
  );
};

export default WelcomePage;
