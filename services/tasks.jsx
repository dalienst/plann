"use client";
import { apiActions } from "@/tools/api";

export const createTask = async (values, axios) => {
  await apiActions?.post("/api/tasks/", values, axios);
};

export const getTasks = async (axios) => {
  const response = await apiActions?.get("/api/tasks/", axios);
  return response?.data?.results || [];
};

export const getTaskDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/tasks/${slug}/`, axios);
  return response?.data || {};
};

export const updateTask = async (slug, values, axios) => {
  await apiActions?.patch(`/api/tasks/${slug}/`, values, axios);
};

export const deleteTask = async (slug, axios) => {
  await apiActions?.delete(`/api/tasks/${slug}/`, axios);
};
