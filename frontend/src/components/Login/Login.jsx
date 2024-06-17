import React, { useState } from "react";
import axios from "axios";
import Myimg from "../../assets/centre.jpg";
import Loadingt from "../Loading/Loading";
import ToastNotification from "../../Modal/TopNotificaion";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [topModel, setTopModel] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/Login", {
          email,
          password,
      });
      setLoading(false);
      
      // Check if response status is successful
      if (response.status === 200) {
          const token = response.data.token;
          const user = response.data.user;
  
          // Store token and user data in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user)); // Store user data as JSON string
  
          // Redirect to dashboard
          navigate("/dashboard");
      

      // Store the token and user information in local storage
 


      // Redirect the user to the dashboard or display the user information
      // window.location.href = '/dashboard';
    }} catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      // Handle login failure
    }
  };

  return (
    <>
      {loading && <Loadingt />}
     
      <div className="container mx-auto px-2 ">
        <div className="hero min-h-screen relative">
          <img
            src={Myimg}
            alt="Background Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.5,
            }}
          />
          <div className="text-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-info">
            <div
              className="font-bold text-black p-2"
              style={{
                position: "relative",
                top: "-10.5em",
                fontSize: "18.5px",
                border: "1px solid transparent",
                borderRadius: "2px",
              }}
            >
              <div role="alert" className="alert alert-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Login Now !</span>
              </div>
            </div>
          </div>
          <div
            className="card shrink-0 w-full max-w-sm shadow-2xl bg-white"
            style={{ marginTop: "50px" }}
          >
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <label className="input bg-blue-100  flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow border-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input  bg-blue-100  flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    />
                  </svg>
                  <input
                    type="password"
                    className="grow border-none "
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary text-white">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
