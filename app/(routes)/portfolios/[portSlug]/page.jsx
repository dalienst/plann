"use client";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import AddTask from "@/forms/projects/AddTask";
import { useFetchProjectDetail } from "@/hooks/projects/actions";
import { deleteProject } from "@/services/projects";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";

function PortfolioDetail({ params }) {
  const portSlug = use(params);
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    isLoading: isLoadingPortfolio,
    data: portfolio,
    refetch: refetchPortfolio,
  } = useFetchProjectDetail(portSlug?.portSlug);

  const handleDeletePortfolio = async (slug) => {
    setDeleting(true);
    try {
      await deleteProject(slug, axios);
      toast.success("Portfolio deleted successfully");
      router?.push("/portfolios");
    } catch (error) {
      toast.error("Error deleting Portfolio");
    } finally {
      setDeleting(false);
    }
  };

  if (isLoadingPortfolio) return <LoadingSpinner />;

  return (
    <>
      <div className="container px-4">
        <section className="d-flex justify-content-between align-items-center mt-3 mb-3">
          <div>
            <h1 className="h2 mb-1">{portfolio?.title}</h1>
          </div>

          <div>
            <button className="btn btn-dark btn-sm" onClick={handleShow}>
              <i className="bi bi-plus-lg"></i> New Task
            </button>

            <Modal
              show={show}
              onHide={handleClose}
              dialogClassName="modal-dialog modal-dialog-centered"
            >
              <div className="modal-header">
                <h5 className="modal-title">New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>

              <div className="modal-body">
                <AddTask
                  refetch={refetchPortfolio}
                  handleModal={handleClose}
                  projectSlug={portfolio?.slug}
                />
              </div>
            </Modal>

            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => handleDeletePortfolio(portfolio?.slug)}
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default PortfolioDetail;
