"use client";
import { forgotPasswordRequest } from "@/services/accounts";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
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
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field name="email" type="email" className="form-control" />
          </div>

          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPassword;
