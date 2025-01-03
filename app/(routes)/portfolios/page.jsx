"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import DisplayProjects from "@/components/projects/DisplayProjects";
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
        <section className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <div>
            <h1 className="h2 mb-1">Your Portfolios</h1>
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

        <section>
          {portfolios?.length > 0 ? (
            <>
              {portfolios?.map((portfolio) => (
                <DisplayProjects
                  key={portfolio.id}
                  portfolio={portfolio}
                  refetchPortfolios={refetchPortfolios}
                />
              ))}
            </>
          ) : (
            <p className="p-2 bg-white rounded">You have no portfolios</p>
          )}
        </section>
      </div>
    </>
  );
}

export default Portfolios;
