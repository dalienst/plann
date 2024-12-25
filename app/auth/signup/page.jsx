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
    <div className="auth-screen">
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
        {({ touched }) => (
          <Form className="shadow p-4 bg-white">
            <h2 className="text-center mb-4">Sign Up</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter Email
              </label>
              <Field
                type="email"
                className="form-control rounded-0"
                id="email"
                name="email"
              />
              {touched.email && (
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-danger mt-2"
                />
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Enter Password
              </label>
              <Field
                type="password"
                className="form-control rounded-0"
                id="password"
                name="password"
              />
              {touched.password && (
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-danger mt-2"
                />
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Field
                type="password"
                className="form-control rounded-0"
                id="confirmPassword"
                name="confirmPassword"
              />
              {touched.confirmPassword && (
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-danger mt-2"
                />
              )}
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-dark btn-sm rounded-0 w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            </div>

            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <a href="/auth/login" className="text-primary">
                  Login
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUp;
