"use client";

import { getProjectDetail, getProjects } from "@/services/projects";
import useAxiosAuth from "../useAxiosAuth";
import { useQuery } from "@tanstack/react-query";

export function useFetchProjects() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(axios),
  });
}

export function useFetchProjectDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProjectDetail(slug, axios),
    enabled: !!slug,
  });
}
