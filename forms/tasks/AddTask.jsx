"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { createTask } from "@/services/tasks";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function AddTask({ refetch, handleModal, projects, refetchProjects }) {
  const [loading, setLoading] = useState(false);
  const axios = useAxiosAuth();

  return (
    <>
      <Formik
        initialValues={{
          project: "",
          title: "",
          date: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await createTask(values, axios);
            refetch();
            refetchProjects();
            handleModal();
            toast?.success("Task created successfully");
          } catch (error) {
            if (error?.response?.data?.date[0]) {
              toast?.error(error?.response?.data?.date[0]);
            } else {
              toast?.error("Task creation failed");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ touched }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Task Date
              </label>
              <Field
                name="date"
                type="date"
                className="form-control"
                required
                placeholder="yyyy-mm-dd"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Task Title
              </label>
              <Field
                name="title"
                type="text"
                className="form-control"
                required
                placeholder="Enter task title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="project" className="form-label">
                Task Portfolio
              </label>
              <Field
                as="select"
                name="project"
                id="project"
                className="form-select"
              >
                <option value="">Select Portfolio</option>
                {projects?.map((project) => (
                  <option
                    value={project?.slug}
                    id={project?.slug}
                    key={project?.id}
                  >
                    {project?.title}
                  </option>
                ))}
              </Field>
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

export default AddTask;
