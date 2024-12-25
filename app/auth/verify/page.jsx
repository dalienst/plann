"use client";
import { verifyAccount } from "@/services/accounts";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function VerifyAccount() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="auth-screen">
      <Formik
        initialValues={{ code: "" }}
        onSubmit={async (values) => {
          setLoading(true);
          try {
            await verifyAccount(values);
            toast.success("Account verified successfully");
            router.push("/auth/login");
          } catch (error) {
            if (error?.response?.data?.non_field_errors[0]) {
              toast?.error("Invalid or expired verification code!");
            } else {
              toast?.error("Verification failed");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ touched }) => (
          <Form className="shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Verify Your Account</h2>
            <p className="text-center mb-4">
              A verification code has been sent to your email.
            </p>

            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                Enter Verification Code
              </label>
              <Field
                name="code"
                type="text"
                className="form-control rounded-0"
                placeholder="Enter the verification code"
                required
              />
              {touched.code && (
                <p className="text-danger mt-2">{touched.code}</p>
              )}
            </div>

            <div className="d-flex justify-content-center mb-3">
              <button
                type="submit"
                className="btn btn-dark rounded-0 w-100"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>
            </div>

            {/* <div className="text-center">
              <p>
                Didn’t receive the code?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0 text-primary"
                  onClick={() => toast.info("Resend code feature coming soon!")}
                >
                  Resend Code
                </button>
              </p>
            </div> */}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default VerifyAccount;
