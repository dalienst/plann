"use client";
import { resetPassword } from "@/services/accounts";
import { ResetPassword } from "@/validation";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="auth-screen">
      <Formik
        initialValues={{
          code: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={ResetPassword}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await resetPassword(values);
            toast?.success("Password reset successfully");
            // router.push("/auth/login");
          } catch (error) {
            if (error?.response?.data?.non_field_errors[0]) {
              toast?.error("Invalid or expired verification code!");
            } else {
              toast?.error("Password reset failed");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ touched }) => (
          <Form className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Reset Your Password</h2>
            <p className="text-center mb-4">
              A code has been sent to your email to reset your password.
            </p>

            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Enter Reset Code
              </label>
              <Field
                name="code"
                type="text"
                className="form-control rounded-0"
                placeholder="Enter the code"
                required
              />
              {touched.code && (
                <p className="text-danger mt-2">{touched.code}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <Field
                name="password"
                type="password"
                className="form-control rounded-0"
                placeholder="Enter your new password"
                required
              />
              {touched.password && (
                <p className="text-danger mt-2">{touched.password}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control rounded-0"
                placeholder="Confirm your new password"
                required
              />
              {touched.confirmPassword && (
                <p className="text-danger mt-2">{touched.confirmPassword}</p>
              )}
            </div>

            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn btn-dark rounded-0 w-100"
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset Password"}
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

export default PasswordReset;
