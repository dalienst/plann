"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import DisplayProjects from "@/components/projects/DisplayProjects";
import DisplayTasks from "@/components/tasks/DisplayTasks";
import AddProject from "@/forms/projects/AddProject";
import AddTask from "@/forms/tasks/AddTask";
import { useFetchProfile } from "@/hooks/accounts/actions";
import { useFetchProjects } from "@/hooks/projects/actions";
import { useFetchTasksByDate } from "@/hooks/tasks/actions";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Dashboard() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOpen = () => setOpen(true);
  const handleShut = () => setOpen(false);

  const date = new Date().toISOString().split("T")[0];
  const day = new Date().getDay();

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

  const {
    isLoading: isLoadingTasks,
    data: tasks,
    refetch: refetchTasks,
  } = useFetchTasksByDate(date);

  console.log(tasks);

  if (isLoadingProfile) return <LoadingSpinner />;

  return (
    <>
      <div className="container px-4">
        <section className="mb-3">
          <div className="mt-5">
            <h1 className="h2 mb-1">Hello, {profile?.name || "User"}!</h1>
            <p className="text-muted">{date}</p>
          </div>
        </section>

        <div className="row">
          {/* Tasks */}
          <section className="mb-3 col-md-9 col-sm-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold">Today's Tasks</h5>

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
                    projects={projects}
                  />
                </div>
              </Modal>
            </div>

            {isLoadingTasks ? (
              <LoadingSpinner />
            ) : tasks && tasks?.length > 0 ? (
              tasks.map((task) => (
                <DisplayTasks
                  key={task.id}
                  task={task}
                  refetchTask={refetchTasks}
                />
              ))
            ) : (
              <p className="p-2 bg-white rounded">
                You have no tasks for today
              </p>
            )}
          </section>

          {/* Portfolios */}
          <section className="mb-3 col-md-3 col-sm-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-semibold">Portfolios</h5>

              <button
                className="btn btn-outline-dark btn-sm"
                onClick={handleShow}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
              <Modal
                show={show}
                onHide={handleClose}
                dialogClassName="modal-dialog modal-dialog-centered"
              >
                <div className="modal-header">
                  <h5 className="modal-title">Create Portfolio</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                  ></button>
                </div>

                <div className="modal-body">
                  <AddProject
                    handleCloseModal={handleClose}
                    refetch={refetchProjects}
                  />
                </div>
              </Modal>
            </div>

            {isLoadingProjects ? (
              <LoadingSpinner />
            ) : projects && projects?.length > 0 ? (
              projects.map((project) => (
                <DisplayProjects
                  key={project.id}
                  project={project}
                  refetchProjects={refetchProjects}
                />
              ))
            ) : (
              <p className="p-2 bg-white rounded">You have no portfolios</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
