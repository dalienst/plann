"use client";
import Link from "next/link";
import React from "react";

function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: "var(--primary-bg)",
        color: "var(--dark-color)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Arial', sans-serif",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        Welcome to Plannit
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          textAlign: "center",
          maxWidth: "600px",
          marginBottom: "2rem",
        }}
      >
        Simplify your daily tasks and projects with a clean, intuitive, and
        efficient task management system.
      </p>
      <div>
        <Link
          href="/auth/login"
          style={{
            textDecoration: "none",
            backgroundColor: "var(--button-bg)",
            color: "var(--primary-color)",
            border: "none",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            marginRight: "10px",
            borderRadius: "5px",
          }}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = "var(--button-hover)")
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = "var(--button-bg)")
          }
        >
          Get Started
        </Link>
        <Link
          href="/auth/signup"
          style={{
            textDecoration: "none",
            backgroundColor: "transparent",
            color: "var(--dark-color)",
            border: "2px solid var(--dark-color)",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onMouseOver={(e) => (e.target.style.color = "var(--primary-color)")}
          onMouseOut={(e) => (e.target.style.color = "var(--dark-color)")}
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
