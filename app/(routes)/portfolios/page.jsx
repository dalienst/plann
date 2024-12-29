"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddProject from "@/forms/projects/AddProject";
import { useFetchProjects } from "@/hooks/projects/actions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteProject } from "@/services/projects";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

function Portfolios() {
  const axios = useAxiosAuth();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleting, setDeleting] = useState(false);

  const handleDeletePortfolio = async (slug) => {
    setDeleting((prev) => ({ ...prev, [slug]: true }));
    try {
      await deleteProject(slug, axios);
      toast.success("Portfolio deleted successfully");
      refetchPortfolios();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting Portfolio");
    } finally {
      setDeleting((prev) => ({ ...prev, [slug]: false }));
    }
  };

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
                <div
                  key={portfolio?.id}
                  className="mb-2 p-2 bg-white rounded d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h6>
                      {portfolio?.title} ({portfolio?.tasks?.length})
                    </h6>
                  </div>

                  <div>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleDeletePortfolio(portfolio.slug)}
                      disabled={deleting[portfolio.slug]}
                    >
                      {deleting[portfolio.slug] ? (
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
