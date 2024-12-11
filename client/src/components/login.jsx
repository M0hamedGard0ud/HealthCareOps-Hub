import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/bootstrap.min.css";
import "./css/owl.carousel.min.css";
import "./css/font-awesome.min.css";
import "./css/animate.css";
import "./css/lineicons.min.css";
import "./css/magnific-popup.css";
import "./css/style.css";
import imgfolder from "./img/login.png";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [cookies, setCookie] = useCookies(["email"]);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const role = decodeURIComponent(
    document.cookie.replace(/(?:(?:^|.*;\s*)role\s*=\s*([^;]*).*$)|^.*$/, "$1")
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        {
          email,
          password,
          role,
        }
      );

      if (response.status === 200) {
        const { token, role, status } = response.data;

        // Use HTTP-only cookie instead of localStorage (if implemented)
        // document.cookie = `token=${token}; HttpOnly`;

        // Navigate based on role and status
        switch (role) {
          case "Hospital":
            setCookie("hospitalemail", email, {
              path: "/",
              sameSite: "strict",
            });

            navigate(status === "Approved" ? "/hospital_home" : "/login");
            break;
          case "Patient":
            setCookie("patemail", email, { path: "/", sameSite: "strict" });

            navigate(status === "Pending" ? "/patient_home" : "/login");
            break;

          default:
            setError("Invalid role.");
        }
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <title>HealthCare Operations System</title>

      <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
        <div className="background-shape"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
              <img className="big-logo" src={imgfolder} alt="Logo" />
              <div className="register-form mt-5 px-4">
                <form onSubmit={handleLogin}>
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
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="info@example.com"
                      aria-required="true"
                    />
                  </div>

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
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="password"
                      aria-required="true"
                    />
                  </div>

                  <button
                    className="btn btn-warning btn-lg w-100"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Log In"}
                  </button>

                  {error && <p style={{ color: "white" }}>{error}</p>}
                </form>
              </div>

              <div className="login-meta-data">
                <a
                  className="forgot-password d-block mt-3 mb-1"
                  href="/reset_password"
                >
                  Forgot Password?
                </a>
                <p className="mb-0">
                  {" "}
                  <Link to="/" className="ms-1">
                    Back Home
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
