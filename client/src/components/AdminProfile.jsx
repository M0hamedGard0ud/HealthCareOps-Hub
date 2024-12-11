import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import "./js/jquery.min.js";
import "./js/bootstrap.bundle.min.js";
import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState([]);

  const EditProfile = (id) => {
    navigate(`/edit_adminprofile/${id}`);
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/users/");
        const data = await response.json();
        
        const adminemail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)adminemail\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );

        const filteredAdmin = data.filter((admin) => admin.email === adminemail);
        if (response.status === 200) {
          setAdminData(filteredAdmin);
        } else {
          console.error("Error fetching admin data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      {/* Header Area */}
      <div className="header-area" id="headerArea">
        <div className="container h-100 d-flex align-items-center justify-content-between">
          <div className="container h-100 d-flex align-items-center justify-content-between">
            <div className="logo-wrapper" style={{ color: "#020310" }}>
              <img src={imgSmall} alt="Logo" /> <Title />
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

          {/* Offcanvas Sidebar */}
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
                <div className="admin-profile">
                  <img src={imgBg} alt="Admin Background" />
                </div>
                <div className="admin-info">
                  <h6 className="admin-name mb-1">
                    HealthCare Operations System
                  </h6>
                </div>
              </div>
              <ul className="sidenav-nav ps-0">
                <li>
                  <Link to="/admin_home">
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

      {/* Page Content */}
      <div className="page-content-wrapper">
        <div className="top-products-area py-3">
          <div className="container">
            <div className="section-heading d-flex align-items-center justify-content-between">
              <h6>My Profile</h6>
            </div>

            {/* Profile Information */}
            <div className="row" style={{ marginTop: 10 }}>
              {adminData.map((admin) => (
                <div key={admin._id} className="col-12 col-md-6">
                  <div className="card product-card" style={{ marginBottom: 10 }}>
                    <div className="card-body">
                      <a className="product-title d-block">
                        Email: <b>{admin.email}</b>
                      </a>
                      <a className="product-title d-block">
                        Phone: {admin.phone}
                      </a>
                    </div>
                  </div>

                  <a
                    className="btn btn-danger"
                    onClick={() => EditProfile(admin._id)}
                  >
                    Edit Profile
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="footer-nav-area" id="footerNav">
          <div className="container h-100 px-0">
            <div className="suha-footer-nav h-100">
              <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
                <li className="active">
                  <Link to="/admin_home">
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
    </div>
  );
};

export default AdminProfile;
