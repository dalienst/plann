"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteTask, updateTask } from "@/services/tasks"; // Ensure updateTask is correctly imported
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

function DisplayTasks({ task, refetchTask }) {
  const [deleting, setDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task?.is_completed || false); // Set initial state based on task completion
  const axios = useAxiosAuth();

  // Handle completion of task
  const handleCompleteTask = async (slug) => {
    try {
      await updateTask(slug, { is_completed: !isCompleted }, axios); // Toggle completion
      setIsCompleted((prev) => !prev); // Update local state
      refetchTask(); // Refetch tasks to update UI
    } catch (error) {
      toast.error("Error updating task");
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (slug) => {
    setDeleting((prev) => ({ ...prev, [slug]: true }));
    try {
      await deleteTask(slug, axios);
      toast.success("Task deleted successfully");
      refetchTask();
    } catch (error) {
      toast.error("Error deleting task");
    } finally {
      setDeleting((prev) => ({ ...prev, [slug]: false }));
    }
  };

  return (
    <div
      key={task.id}
      className="d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded"
    >
      <div className="form-check">
        <input
          type="checkbox"
          name="is_completed"
          id={`is_complete_${task.id}`} // Ensure unique id for each task
          className="form-check-input"
          checked={isCompleted} // Use state to control the checkbox
          onChange={() => handleCompleteTask(task.slug)} // Toggle completion on click
        />
        <label htmlFor={`is_complete_${task.id}`} className="form-check-label">
          {task.title}
        </label>
      </div>

      <div className="d-flex gap-2">
        <i className="bi bi-pencil cursor-pointer"></i>

        <button
          className="btn btn-sm"
          onClick={() => handleDeleteTask(task?.slug)}
          disabled={deleting[task?.slug]}
        >
          {deleting[task.slug] ? (
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

export default DisplayTasks;
