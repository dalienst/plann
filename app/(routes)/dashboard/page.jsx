"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
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
          {/* <Image
            src="/nature.svg"
            className="img-fluid mb-1"
            alt="logo"
            width={200}
            height={100}
            style={{
              margin: "0 auto",
              width: "100%",
              height: "400px",
              objectFit: "contain",
            }}
          /> */}
          {/* Greeting */}
          {/* <div className="text-center mb-5">
            <h1 className="h4 mb-1">Welcome, {profile?.email || "User"}!</h1>
            <p className="text-muted small mb-0">
              {profile?.is_verified ? "Verified Account" : "Unverified Account"}
            </p>
            <p>{date}</p>
          </div> */}

          <div className="mt-5">
            <h1 className="h2 mb-1">Hello, {profile?.email || "User"}!</h1>
            <p className="text-muted">{date}</p>
          </div>

          {/* Search Bar and Buttons */}
          <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-md-2 p-2 bg-light rounded">
            {/* Search Bar */}
            <div>
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search Tasks"
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              <button onClick={handleOpen} className="btn btn-dark">
                New Task
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
                    refetch={refetchProjects}
                    projects={projects}
                  />
                </div>
              </Modal>

              <button className="btn btn-outline-dark" onClick={handleShow}>
                New Portfolio
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
          </div>
        </section>

        <section className="mb-3">
          <h5 className="fw-semibold mb-3">Today's Tasks</h5>

          {tasks?.map((task) => (
            <div
              key={task.id}
              className="d-flex justify-content-between align-items-center mb-2 p-2 bg-white rounded"
            >
              <div className="form-check">
                <input
                  type="checkbox"
                  name="is_completed"
                  id="is_complete"
                  className="form-check-input"
                />

                <label htmlFor="is_complete" className="form-check-label">
                  {task.title}
                </label>
              </div>

              <div className="d-flex gap-2">
                <i className="bi bi-pencil cursor-pointer"></i>
                <i className="bi bi-trash text-danger cursor-pointer"></i>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default Dashboard;
