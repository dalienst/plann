"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/dashboard">
          Planova
        </Link>

        <button
          className="navbar-toggler border-0  "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
          aria-controls="collapsibleNavbar"
        >
          <i className="bi bi-list"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                href="/dashboard"
                className={`${
                  pathname === "/dashboard" ? "nav-link nav-active" : "nav-link"
                }`}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
