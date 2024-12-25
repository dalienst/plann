"use client";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createProject } from "@/services/projects";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddProject({ refetch, handleCloseModal }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          title: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createProject(values, axios);
            refetch();
            handleCloseModal();
            toast.success("Project created successfully");
          } catch (error) {
            toast.error("Project creation failed");
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
              <Field name="title" type="text" className="form-control" />
            </div>

            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn btn-dark rounded-0 w-100"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AddProject;
