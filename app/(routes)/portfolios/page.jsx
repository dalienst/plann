"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddProject from "@/forms/projects/AddProject";
import { useFetchProjects } from "@/hooks/projects/actions";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Portfolios() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    isLoading: isLoadingPortfolios,
    data: portfolios,
    refetch: refetchPortfolios,
  } = useFetchProjects();

  if (isLoadingPortfolios) return <LoadingSpinner />;

  return (
    <>
      <div className="container px-4">
        <section className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <h1 className="h2">Your Portfolios</h1>
          </div>

          <button className="btn btn-dark" onClick={handleShow}>
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
                refetch={refetchPortfolios}
              />
            </div>
          </Modal>
        </section>
      </div>
    </>
  );
}

export default Portfolios;
