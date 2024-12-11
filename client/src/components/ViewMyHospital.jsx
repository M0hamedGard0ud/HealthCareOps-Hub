import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

import imgSmall from "./img/core-img/logo-small.png";
import imgBg from "./img/bg-img/9.png";
import Logout from "./Logout.jsx";
import Title from "./Title.jsx";

const ViewMyHospital = () => {
  ////////////////////////////////////////////////
  //////////////Navgation Code Start//////////////
  ////////////////////////////////////////////////

  // Update location on the server
  async function updateLocationOnServer(hId) {
    //  const hospitalId = "6576e6dcfa3350243c6af5b3"; // Replace with the actual hospital ID
    const url = `http://localhost:4000/api/v1/hospital/map/` + hId;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers, such as authentication token if needed
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        alert("Location updated successfully!");
        console.log("Location updated successfully!");
        window.location.reload();
      } else {
        console.error(`Error updating location: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error updating location: ${error.message}`);
    }
  }

  ////////////////////////////////////////////////
  //////////////Navgation Code End ///////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  //////////////Update Delete Code ///////////////
  ////////////////////////////////////////////////

  const navigate = useNavigate();

  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`http://localhost:4000/api/v1/hospital/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then(() => {
          setFilteredData((prevData) =>
            prevData.filter((item) => item._id !== id)
          );
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const LoadEdit = (id) => {
    navigate("/update_hospital/" + id);
  };

  const [hospitalData, setHospitalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/hospital/");
        const data = await response.json();

        // Assuming 'vendoremail' is the key in cookies
        const hospitalemail = decodeURIComponent(
          document.cookie.replace(
            /(?:(?:^|.*;\s*)hospitalemail\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
          )
        );
        // Filter hospital data based on vendoremail
        const filteredHospital = data.filter(
          (hospital) => hospital.hospitalemail === hospitalemail
        );
        setHospitalData(filteredHospital);
        setFilteredData(filteredHospital);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital data:", error.message);
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, []);

  // Filter data based on the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = hospitalData.filter((hospital) =>
      Object.values(hospital).some((field) =>
        field.toString().toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="header-area" id="headerArea">
          <div className="container h-100 d-flex align-hospitals-center justify-content-between">
            <div className="header-area" id="headerArea">
              <div className="container h-100 d-flex align-hospitals-center justify-content-between">
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
                  <div className="hospital-profile">
                    <img src={imgBg} alt="" />
                  </div>
                  <div className="hospital-info">
                    <h6 className="hospital-name mb-1">
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
              <div className="section-heading d-flex align-hospitals-center justify-content-between">
                <h6> My Hospital Details</h6>
              </div>
              <div className="row g-3">
                <div className="top-search-form">
                  <form>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <button type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>

              {/* Show if Null data in table */}

              {filteredData.length > 0 ? (
                <div className="row" style={{ marginTop: 10 }}>
                  {/* Get Details Map field and id */}
                  {filteredData.map((hospital) => (
                    <div key={hospital._id} className="col-12 col-md-6">
                      <div
                        className="card product-card"
                        style={{ marginBottom: 10 }}
                      >
                        <div className="card-body">
                          <a className="product-title d-block">
                            {" "}
                            Name: <b> {hospital.name} </b>
                          </a>
                          <a className="product-title d-block">
                            Doctor Name: <b> {hospital.doctor_name} </b>
                          </a>
                          <a className="product-title d-block">
                            Specialty: <b> {hospital.specialty} </b>
                          </a>

                          <a className="product-title d-block">
                            Timing: <b> {hospital.timing} </b>
                          </a>

                          <a className="product-title d-block">
                            Address: {hospital.address}{" "}
                          </a>
                          <a className="product-title d-block">
                            City: {hospital.city}{" "}
                          </a>

                          <a className="product-title d-block">
                            Phone: {hospital.phone}{" "}
                          </a>
                          <a className="product-title d-block">
                            Lat: {hospital.lat}{" "}
                          </a>
                          <a className="product-title d-block">
                            Long: {hospital.long}{" "}
                          </a>
                        </div>
                      </div>

                      <a
                        className="btn btn-danger"
                        onClick={() => {
                          LoadEdit(hospital._id);
                        }}
                      >
                        Edit
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={() => {
                          Removefunction(hospital._id);
                        }}
                      >
                        Delete
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={async () => {
                          await updateLocationOnServer(hospital._id);
                        }}
                      >
                        Geo Map
                      </a>

                      <a
                        rel="noreferrer"
                        className="btn btn-danger"
                        target="_blank"
                        href={`https://maps.google.com/?q=${hospital.lat},${hospital.long}`}
                      >
                        Show Map
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p>
                  No hospital details found for the specified vendor email or
                  search term.
                </p>
              )}

              {/* Show if Null data in table */}
            </div>
          </div>

          <div className="footer-nav-area" id="footerNav">
            <div className="container h-100 px-0">
              <div className="suha-footer-nav h-100">
                <ul className="h-100 d-flex align-hospitals-center justify-content-between ps-0">
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
    </div>
  );
};

export default ViewMyHospital;
