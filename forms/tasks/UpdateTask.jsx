"use client";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { updateTask } from "@/services/tasks";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UpdateTask({ task, refetch, closeModal, projects }) {
  const axios = useAxiosAuth();
  const [loading, setLoading] = useState(false);
  return (
    <Formik
      initialValues={{
        title: task?.title || "",
        date: task?.date || "",
        is_completed: task?.is_completed || false,
        project: task?.project || null,
      }}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("date", values.date);
          formData.append("is_completed", values.is_completed);
          formData.append("project", values.project);

          await updateTask(task?.slug, formData, axios);
          toast?.success("Task updated successfully");
          refetch();
          closeModal();
        } catch (error) {
          toast?.error("Task update failed");
        } finally {
          setLoading(false);
          closeModal();
        }
      }}
    >
      {({ touched, setFieldValue }) => (
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
              placeholder={task?.date || ""}
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
              placeholder={task?.title || ""}
            />
          </div>

          <div className="form-check form-switch mb-3">
            <Field name="is_completed">
              {({ field, form }) => (
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="is_completed"
                  checked={field?.value}
                  onChange={(e) =>
                    form.setFieldValue("is_completed", e.target.checked)
                  }
                />
              )}
            </Field>
            <label className="form-check-label" htmlFor="is_completed">
              Completed
            </label>
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
              <option value="" disabled>
                Select a portfolio
              </option>
              {projects?.map((project) => (
                <option value={project?.slug} key={project?.id}>
                  {project?.title}
                </option>
              ))}
            </Field>
          </div>

          <button
            type="submit"
            className="btn btn-dark rounded-0 w-100"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateTask;
