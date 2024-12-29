"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteTask, updateTask } from "@/services/tasks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import UpdateTask from "@/forms/tasks/UpdateTask";

function DisplayTasks({ task, refetchTask, projects }) {
  const axios = useAxiosAuth();
  const [deleting, setDeleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task?.is_completed || false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingTask(null);
  };
  const handleEditModalShow = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  // Handle completion of task
  const handleCompleteTask = async (slug) => {
    try {
      await updateTask(slug, { is_completed: !isCompleted }, axios);
      setIsCompleted((prev) => !prev);
      refetchTask();
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
    <>
      <div
        key={task.id}
        className="d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded"
      >
        <div className="form-check form-switch">
          <input
            type="checkbox"
            role="switch"
            name="is_completed"
            id={`is_complete_${task.id}`}
            className="form-check-input"
            checked={isCompleted}
            onChange={() => handleCompleteTask(task.slug)}
          />
          <label
            htmlFor={`is_complete_${task.id}`}
            className="form-check-label"
          >
            {task.title}
          </label>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => handleEditModalShow(task)}
          >
            <i className="bi bi-pencil"></i>
          </button>

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
      {editingTask && (
        <Modal
          show={showEditModal}
          onHide={handleEditModalClose}
          dialogClassName="modal-dialog modal-dialog-centered"
        >
          <div className="modal-header">
            <h5 className="modal-title">Edit Task: {editingTask?.title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleEditModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <UpdateTask
              task={editingTask}
              refetch={refetchTask}
              closeModal={handleEditModalClose}
              projects={projects}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default DisplayTasks;
