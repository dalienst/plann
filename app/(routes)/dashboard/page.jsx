"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddProject from "@/forms/projects/AddProject";
import { useFetchProfile } from "@/hooks/accounts/actions";
import { useFetchProjects } from "@/hooks/projects/actions";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Dashboard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  console.log(profile);

  if (isLoadingProfile) return <LoadingSpinner />;

  return (
    <>
      <div className="container py-5 px-4">
        <section className="mb-3 py-5">
          {/* Greeting */}
          <div className="text-center mb-5">
            <h1 className="h4 mb-1">Welcome, {profile?.email || "User"}!</h1>
            <p className="text-muted small mb-0">
              {profile?.is_verified ? "Verified Account" : "Unverified Account"}
            </p>
          </div>

          {/* Search Bar and Buttons */}
          <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 p-md-4 p-3 bg-light rounded">
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
              <button className="btn btn-dark">New Task</button>
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
      </div>
    </>
  );
}

export default Dashboard;
