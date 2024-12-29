"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updateProject } from "@/services/projects";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateProject({ portfolio, refetchPortfolios, closeModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          title: portfolio?.title || "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            const formData = new FormData();
            formData.append("title", values.title);
            await updateProject(portfolio?.slug, formData, axios);
            toast?.success("Portfolio updated successfully");
            closeModal();
            refetchPortfolios();
            setLoading(false);
          } catch (error) {
            toast?.error("Portfolio update failed");
            setLoading(false);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Enter Portfolio Title
              </label>
              <Field
                name="title"
                type="text"
                className="form-control"
                placeholder={portfolio?.title || "Enter Portfolio Title"}
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark rounded-0 w-100"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default UpdateProject;
