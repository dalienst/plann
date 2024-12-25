"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (response?.error === "CredentialsSignin") {
      toast.error("Invalid email or password");
    } else {
      toast.success("Login successful");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="auth-screen">
      <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
        <h2 className="text-center mb-4">Login</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control rounded-0"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Enter Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control rounded-0"
            required
          />
        </div>

        <div className="d-flex justify-content-center mb-3">
          <button
            type="submit"
            className="btn btn-dark rounded-0 w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <div className="text-center">
          <p>
            Forgot Password?{" "}
            <Link href="/auth/forgot-password" className="text-primary">
              Reset Password
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
