"use client";
import { useFetchProfile } from "@/hooks/accounts/actions";
import React from "react";

function Dashboard() {
  const { isLoading: isLoadingProfile, data: profile } = useFetchProfile();

  return (
    <>
      <div className="container py-5 px-4">
        <section className="mb-3 py-5">
          {/* Greeting */}
          <div className="text-center mb-5">
            <h1 className="h4 mb-1">Welcome, {profile?.email || "User"}!</h1>
            <p className="text-muted small mb-0">
              {profile?.is_verified ? "Verified Account" : "Unverified Account"}
            </p>
          </div>

          {/* Search Bar and Buttons */}
          <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-md-4 p-3 bg-light rounded">
            {/* Search Bar */}
            <div>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search Tasks"
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              <button className="btn btn-dark">New Task</button>
              <button className="btn btn-outline-dark">New Project</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
