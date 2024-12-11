import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

// CSS Imports
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";

// Image Imports
import imgfolder from "./img/core-img/logo-white.png";

const AdminLogin = () => {
  ////////////////////////////////////////////////
  /////////////// State and Cookies //////////////
  ////////////////////////////////////////////////

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["email"]); // Using cookies to store the email
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  ////////////////////////////////////////////////
  /////////////// Handlers ///////////////////////
  ////////////////////////////////////////////////

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Login submission handler
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Store token in localStorage and set up authorization header
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["x-auth-token"] = response.data.token;

        // Set cookie and redirect to admin home page
        setCookie("adminemail", email, { path: "/", sameSite: "strict" });
        alert("Login Successful!");
        window.location.href = "/admin_home";
        setError("");
      } else {
        setError("Login failed. Please check your credentials.");
        alert("Login Unsuccessful!");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Internal Server Error. Please try again later.");
      alert("Login Unsuccessful!");
    }
  };

  ////////////////////////////////////////////////
  /////////////// Render Component ///////////////
  ////////////////////////////////////////////////

  return (
    <div>
      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
              <img className="big-logo" src={imgfolder} alt="App Logo" />
              <div className="row justify-content-center">
                <b>Admin</b>
              </div>
              <div className="register-form mt-5 px-4">
                <form onSubmit={handleLogin}>
                  {/* Email Input */}
                  <div className="form-group text-start mb-4">
                    <span>Email</span>
                    <label htmlFor="email">
                      <i className="lni lni-user"></i>
                    </label>
                    <input
                      className="form-control"
                      name="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      type="text"
                      placeholder="info@example.com"
                    />
                  </div>
                  {/* Password Input */}
                  <div className="form-group text-start mb-4">
                    <span>Password</span>
                    <label htmlFor="password">
                      <i className="lni lni-lock"></i>
                    </label>
                    <input
                      className="form-control"
                      name="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      type="password"
                      placeholder="password"
                    />
                  </div>
                  <button
                    className="btn btn-warning btn-lg w-100"
                    type="submit"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
