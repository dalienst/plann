"use client";

import { signUp } from "@/tools/api";
import { RegistrationSchema } from "@/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegistrationSchema}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          await signUp(values);
          toast.success("Account created successfully");
          router.push("/auth/verify");
        } catch (error) {
          if (
            error?.response?.data?.email[0] ||
            error?.response?.data?.username[0]
          ) {
            toast.error("User already exists");
          } else {
            toast.error("Registration Failed");
          }
        } finally {
          setIsLoading(false);
        }
      }}
    >
      {({ values }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <Field
              type="email"
              className="form-control"
              id="email"
              name="email"
            />
            <ErrorMessage name="email" component="p" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter Password
            </label>
            <Field
              type="password"
              className="form-control"
              id="password"
              name="password"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <Field
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
            />
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="text-danger"
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-sm"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default SignUp;
