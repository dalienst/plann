"use client";
import { forgotPasswordRequest } from "@/services/accounts";
import { Form, Formik, Field } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="auth-screen">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await forgotPasswordRequest(values);
            toast.success("Email sent successfully");
            router.push("/auth/login");
          } catch (error) {
            console.log(error);
            toast.error("Email not sent");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ touched }) => (
          <Form className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Forgot Password</h2>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Enter your Email
              </label>
              <Field
                name="email"
                type="email"
                className="form-control rounded-0"
                placeholder="example@domain.com"
                required
              />
              {touched.email && (
                <p className="text-danger mt-2">Please enter a valid email.</p>
              )}
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

            <div className="text-center">
              <p>
                Remember your password?{" "}
                <Link href="/auth/login" className="text-primary">
                  Login
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ForgotPassword;
