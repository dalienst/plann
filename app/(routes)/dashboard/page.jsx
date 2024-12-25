"use client";
import { useFetchProfile } from "@/hooks/accounts/actions";
import { useFetchProjects } from "@/hooks/projects/actions";
import React from "react";

function Dashboard() {
  const {
    isLoading: isLoadingProfile,
    data: profile,
    refetch: refetchProfile,
  } = useFetchProfile();

  const {
    isLoading: isLoadingProjects,
    data: projects,
    refetch: refetchProjects,
  } = useFetchProjects();

  console.log(profile)

  return <div>Dashboard</div>;
}

export default Dashboard;
