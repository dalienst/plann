"use client";
import { resetPassword } from "@/services/accounts";
import { ResetPassword } from "@/validation";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
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
          toast.success("Password reset successfully");
          router.push("/auth/login");
        } catch (error) {
          // Add error messages
          toast.error("Password reset failed");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ touched }) => (
        <Form>
          <h5>Reset Your Password</h5>
          <p>A code has been sent to your email to reset your password</p>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Enter Code
            </label>
            <Field name="code" type="text" className="form-control" />
            {touched.code && <div className="text-danger">{touched.code}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <Field name="password" type="password" className="form-control" />
            {touched.password && (
              <div className="text-danger">{touched.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <Field
              name="confirmPassword"
              type="password"
              className="form-control"
            />
            {touched.confirmPassword && (
              <div className="text-danger">{touched.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Reset Password"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default PasswordReset;
