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
    <Formik
      initialValues={{ code: "" }}
      onSubmit={async (values) => {
        setLoading(true);
        try {
          await verifyAccount(values);
          toast.success("Account verified successfully");
          router.push("/auth/login");
        } catch (error) {
          // Add error messages
          toast.error("Verification Failed");
        } finally {
          setLoading(false);
        }
      }}
    >
      {({ touched }) => (
        <Form>
          <h5>Verify Your Account</h5>
          <p>A code has been sent to your email to verify your account</p>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Enter Code
            </label>
            <Field name="code" type="text" className="form-control" />
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-sm"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default VerifyAccount;
