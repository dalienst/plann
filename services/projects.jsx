"use client";
import { apiActions } from "@/tools/api";

export const createProject = async (values, axios) => {
  await apiActions?.post("/api/projects/", values, axios);
};

export const getProjects = async (axios) => {
  const response = await apiActions?.get("/api/projects/", axios);
  return response?.data?.results || [];
};

export const getProjectDetail = async (slug, axios) => {
  const response = await apiActions?.get(`/api/projects/${slug}/`, axios);
  return response?.data || {};
};

export const updateProject = async (slug, formData, axios) => {
  await apiActions?.patch(`/api/projects/${slug}/`, formData, axios);
};

export const deleteProject = async (slug, axios) => {
  await apiActions?.delete(`/api/projects/${slug}/`, axios);
};
