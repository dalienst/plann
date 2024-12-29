"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { deleteProject } from "@/services/projects";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import UpdateProject from "@/forms/projects/UpdateProject";
import Link from "next/link";

function DisplayProjects({ portfolio, refetchPortfolios }) {
  const axios = useAxiosAuth();
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState(null);

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditingPortfolio(null);
  };
  const handleEditModalShow = (portfolio) => {
    setEditingPortfolio(portfolio);
    setShowEditModal(true);
  };

  const handleDeletePortfolio = async (slug) => {
    setDeleting((prev) => ({ ...prev, [slug]: true }));
    try {
      await deleteProject(slug, axios);
      toast.success("Portfolio deleted successfully");
      refetchPortfolios();
    } catch (error) {
      toast.error("Error deleting Portfolio");
    } finally {
      setDeleting((prev) => ({ ...prev, [slug]: false }));
    }
  };

  return (
    <>
      <div
        key={portfolio?.id}
        className="mb-2 p-2 bg-white rounded d-flex justify-content-between align-items-center"
      >
        <div>
          <h6 className="text-decoration-none">
            <Link
              href={`/portfolios/${portfolio.slug}`}
              className="text-decoration-none"
            >
              {portfolio?.title} ({portfolio?.tasks?.length})
            </Link>
          </h6>
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-sm"
            onClick={() => handleEditModalShow(portfolio)}
          >
            <i className="bi bi-pencil"></i>
          </button>

          {/* Delete Button */}
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

      {editingPortfolio && (
        <Modal
          show={showEditModal}
          onHide={handleEditModalClose}
          dialogClassName="modal-dialog modal-dialog-centered"
        >
          <div className="modal-header">
            <h5 className="modal-title">
              Edit Portfolio: {editingPortfolio.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleEditModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <UpdateProject
              portfolio={editingPortfolio}
              refetchPortfolios={refetchPortfolios}
              closeModal={handleEditModalClose}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default DisplayProjects;
