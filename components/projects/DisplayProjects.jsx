"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteProject } from "@/services/projects";
import React, { useState } from "react";
import toast from "react-hot-toast";

function DisplayProjects({ project, refetchProjects }) {
  const axios = useAxiosAuth();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteProject = async (slug) => {
    setDeleting((prev) => ({ ...prev, [slug]: true }));
    try {
      await deleteProject(slug, axios);
      toast.success("Project deleted successfully");
      refetchProjects();
    } catch (error) {
      toast.error("Error deleting project");
    } finally {
      setDeleting((prev) => ({ ...prev, [slug]: false }));
    }
  };

  return (
    <div
      key={project.id}
      className="mb-2 p-2 bg-white rounded d-flex justify-content-between align-items-center"
    >
      <div>
        <h6>
          {project?.title} ({project?.tasks?.length})
        </h6>
      </div>

      <div>
        <button
          className="btn btn-sm"
          onClick={() => handleDeleteProject(project.slug)}
          disabled={deleting[project.slug]}
        >
          {deleting[project.slug] ? (
            <div
              className="spinner-border spinner-border-sm text-danger"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <i className="bi bi-trash text-danger"></i>
          )}
        </button>
      </div>
    </div>
  );
}

export default DisplayProjects;
