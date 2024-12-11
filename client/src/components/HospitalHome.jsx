import { Link } from "react-router-dom";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/font-awesome.min.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";
import imgFeed from "./img/feedback.png";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import imgSearch from "./img/new.png";
import imgLab from "./img/lab.png";
import imgBill from "./img/bill.png";
import imgHis from "./img/clipboard.png";
import imgApp from "./img/appointment.png";
import imgAdd from "./img/hospital.png";
import imgPfl from "./img/pfl.png";
import imgClip from "./img/healthcare.png";
import imgProfile from "./img/man.png";
import Logout from "./Logout";
import Title from "./Title";

const HospitalHome = () => {
  return (
    <div>
      <div>
        <div className="header-area" id="headerArea">
          <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="header-area" id="headerArea">
              <div className="container h-100 d-flex align-items-center justify-content-between">
                <div className="logo-wrapper" style={{ color: "#020310" }}>
                  <img src={imgSmall} alt="" /> <Title />{" "}
                </div>

                <div
                  className="suha-navbar-toggler"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#suhaOffcanvas"
                  aria-controls="suhaOffcanvas"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>

            {/* tabindex="-1" */}
            <div
              className="offcanvas offcanvas-start suha-offcanvas-wrap"
              id="suhaOffcanvas"
              aria-labelledby="suhaOffcanvasLabel"
            >
              <button
                className="btn-close btn-close-white text-reset"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>

              <div className="offcanvas-body">
                <div className="sidenav-profile">
                  <div className="user-profile">
                    <img src={imgBg} alt="" />
                  </div>
                  <div className="user-info">
                    <h6 className="user-name mb-1">
                      HealthCare Operations System
                    </h6>
                  </div>
                </div>

                <ul className="sidenav-nav ps-0">
                  <li>
                    <Link to="/hospital_home">
                      <i className="lni lni-home"></i>Home
                    </Link>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="page-content-wrapper">
          <div className="top-products-area py-3">
            <div className="container">
              <div className="section-heading d-flex align-items-center justify-content-between">
                <h6>Hospital Home</h6>
              </div>

              <div className="row g-3">
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgAdd}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/post_hospital">
                          Post Hospital
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgClip}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_my_hospital">
                          View My Hospital
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgApp}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_appointment">
                          View Appointments{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgHis}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_prescription">
                          Patient's Treatment History{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgSearch}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/post_lab_reg">
                          Create Lab Register{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgPfl}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_lab_user">
                          View Lab Users{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgLab}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_labtest">
                          View Patient's Lab Reports{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgBill}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_billing">
                          View Billing Details{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgFeed}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/view_my_feedback">
                          View Feedbacks{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-6 col-md-6">
                  <div className="card horizontal-product-card">
                    <div className="card-body d-flex align-items-center">
                      <div className="card-body">
                        <img
                          src={imgProfile}
                          className="img-fluid"
                          style={{ width: 64, height: 64 }}
                        />
                        <Link className="text-success" to="/hospital_profile">
                          My Profile{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active">
                  {" "}
                  <Link to="/hospital_home">
                    <i className="lni lni-home"></i>Home{" "}
                  </Link>{" "}
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalHome;
