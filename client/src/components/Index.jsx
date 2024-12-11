import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style1.css";
import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";
import imgbg from "./img/bg.jpg";

const Index = ({ isStaff }) => {
  const [loading, setLoading] = useState(true);

  const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  };
  const handleLinkClick1 = () => {
    // Set a cookie named "user" with value "JohnDoe" that expires in 7 days
    setCookie("role", "Admin", 7);
    console.log("Cookie set!");
  };

  const handleLinkClick2 = () => {
    // Set a cookie named "user" with value "JohnDoe" that expires in 7 days
    setCookie("role", "Hospital", 7);
    console.log("Cookie set!");
  };

  const handleLinkClick3 = () => {
    // Set a cookie named "user" with value "JohnDoe" that expires in 7 days
    setCookie("role", "Patient", 7);
    console.log("Cookie set!");
  };

  const handleLinkClick4 = () => {
    // Set a cookie named "user" with value "JohnDoe" that expires in 7 days
    setCookie("role", "Lab", 7);
    console.log("Cookie set!");
  };
  // UseEffect to handle spinner timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Spinner will disappear after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Spinner */}
      {loading && (
        <div
          id="spinner"
          className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
        >
          <div
            className="spinner-border text-primary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="container-fluid header position-relative overflow-hidden p-0">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light px-4 px-lg-5 py-3 py-lg-0">
          <Link to="/" className="navbar-brand p-0">
            <h1 className="display-6 text-primary m-0">
              <i className="fas fa-book-medical me-3"></i>
              HealthCare Operations System
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <Link to="/" className="nav-item nav-link active">
                Home
              </Link>
              {!isStaff && (
                <div className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Register
                  </Link>
                  <div className="dropdown-menu m-0">
                    <Link to="/hospital_register" className="dropdown-item">
                      Hospital
                    </Link>
                    <Link to="/patient_register" className="dropdown-item">
                      Patient
                    </Link>
                  </div>
                </div>
              )}
              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Login
                </Link>
                <div className="dropdown-menu m-0">
                  {isStaff ? (
                    <>
                      <Link
                        to="/admin_login"
                        onClick={handleLinkClick1}
                        className="dropdown-item"
                      >
                        Admin
                      </Link>
                      <Link
                        to="/lab_login"
                        onClick={handleLinkClick4}
                        className="dropdown-item"
                      >
                        Lab
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={handleLinkClick2}
                        className="dropdown-item"
                      >
                        Hospital
                      </Link>
                      <Link
                        to="/login"
                        onClick={handleLinkClick3}
                        className="dropdown-item"
                      >
                        Patient
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="hero-header overflow-hidden px-5">
          <div className="rotate-img">
            <div className="rotate-sty-2"></div>
          </div>
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 wow fadeInLeft" data-wow-delay="1.6s">
              <h1
                className="display-4 text-dark mb-4 wow fadeInUp"
                data-wow-delay="1.8s"
              >
                Healthcare Booking{" "}
              </h1>
              <p
                className="fs-4 mb-4 wow fadeInUp"
                data-wow-delay="2.0s"
                style={{ color: "black" }}
              >
                The system aims to simplify the appointment booking process for
                patients within the healthcare sector.
              </p>
              <Link
                to="/login"
                className="btn btn-primary rounded-pill py-3 px-5 wow fadeInUp"
                data-wow-delay="2.2s"
              >
                Get Started
              </Link>
            </div>
            <div className="col-lg-6 wow fadeInRight" data-wow-delay="1.7s">
              <img
                src={imgbg}
                className="img-fluid w-100 h-100"
                alt="Hero Background"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container-fluid feature overflow-hidden py-5">
        <div className="container py-5">
          <div
            className="text-center mx-auto mb-5 wow fadeInUp"
            data-wow-delay="1.7s"
            style={{ maxWidth: "900px" }}
          >
            <h4 className="text-primary">Our Feature</h4>
            <p className="mb-0" style={{ color: "black" }}>
              This smart, web-based appointment booking system provides patients
              with an easy way to schedule doctor appointments online,
              efficiently managing bookings according to user preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
