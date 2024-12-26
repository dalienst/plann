"use client";
import { Formik } from "formik";
import React from "react";

function UpdateTask({ task }) {
  return (
    <Formik
      initialValues={{
        title: task?.title || "",
        date: task?.date || "",
        is_completed: task?.is_completed || false,
      }}
    ></Formik>
  );
}

export default UpdateTask;
