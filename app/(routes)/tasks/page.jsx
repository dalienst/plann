"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import DisplayTasks from "@/components/tasks/DisplayTasks";
import AddTask from "@/forms/tasks/AddTask";
import { useFetchProjects } from "@/hooks/projects/actions";
import { useFetchTasks } from "@/hooks/tasks/actions";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Tasks() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleShut = () => setOpen(false);

  const {
    isLoading: isLoadingTasks,
    data: tasks,
    refetch: refetchTasks,
  } = useFetchTasks();

  const {
    isLoading: isLoadingProjects,
    data: projects,
    refetch: refetchProjects,
  } = useFetchProjects();

  const filteredTasks = tasks?.filter((task) =>
    task?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoadingTasks) return <LoadingSpinner />;

  return (
    <div className="container px-4">
      <section className="d-flex justify-content-between align-items-center mt-3 mb-3">
        <div>
          <h1 className="h2 mb-1">Your Portfolios</h1>
        </div>

        <button onClick={handleOpen} className="btn btn-dark btn-sm">
          <i className="bi bi-plus-lg"></i>
        </button>

        <Modal
          show={open}
          onHide={handleShut}
          dialogClassName="modal-dialog modal-dialog-centered"
        >
          <div className="modal-header">
            <h5 className="modal-title">Create Task</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleShut}
            ></button>
          </div>

          <div className="modal-body">
            <AddTask
              handleModal={handleShut}
              refetch={refetchTasks}
              refetchProjects={refetchProjects}
              projects={projects}
            />
          </div>
        </Modal>
      </section>

      <section className="mb-3 col-md-3">
        <input
          type="search"
          name="search"
          id="search"
          className="form-control"
          placeholder="Search Tasks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

      <section className="mb-3">
        {filteredTasks?.length > 0 ? (
          filteredTasks?.map((task) => (
            <DisplayTasks
              key={task.id}
              task={task}
              refetchTask={refetchTasks}
              projects={projects}
            />
          ))
        ) : (
          <p className="p-2 bg-white rounded">You have no tasks yet</p>
        )}
      </section>
    </div>
  );
}

export default Tasks;
