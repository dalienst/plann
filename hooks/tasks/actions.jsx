"use client";
import { useQuery } from "@tanstack/react-query";
import useAxiosAuth from "../useAxiosAuth";
import { getTaskDetail, getTasks, getTasksByDate } from "@/services/tasks";

export function useFetchTasks() {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(axios),
  });
}

export function useFetchTasksByDate(date) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["tasks", date],
    queryFn: () => getTasksByDate(axios, date),
  });
}

export function useFetchTaskDetail(slug) {
  const axios = useAxiosAuth();

  return useQuery({
    queryKey: ["task", slug],
    queryFn: () => getTaskDetail(slug, axios),
    enabled: !!slug,
  });
}
