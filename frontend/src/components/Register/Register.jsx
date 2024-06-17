import React, { useState } from "react";
import Myimg from "../../assets/centre.jpg";
import axios from "axios";
import Loadingt from "../Loading/Loading";
import ToastNotification from "../../Modal/TopNotificaion";
import avatarmen from "../../assets/avatar.jpg";
import avatarwomen from "../../assets/avatarwoemn.jpg";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [gender, setGender] = useState("");
  const [documentVerify, setDocumentVerify] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [codeErr, setCodeErr] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "repeatPassword":
        setRepeatPassword(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleDocumentChange = (e) => {
    setDocumentVerify(e.target.files[0]);
  };

  const fetchDefaultAvatar = async (gender) => {
    const avatarPath = gender === "male" ? avatarmen : avatarwomen;
    const response = await fetch(avatarPath);
    const blob = await response.blob();
    return new File([blob], `${gender === "male" ? "avatarMen" : "avatarWomen"}.jpg`, { type: "image/jpeg" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);

    try {
      const defaultAvatar = await fetchDefaultAvatar(gender);
      formData.append("imageProfile", defaultAvatar);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setSuccess(true);
      setCodeErr(false);

      if (response.status === 200) {
        const token = response.data.token;
        const user = response.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setLoading(false);
      setSuccess(false);
      setCodeErr(true);
    }
  };

  return (
    <>
      {loading && <Loadingt />}
      {success && (
        <ToastNotification message="Register is successful" type="success" />
      )}
      {codeErr && (
        <ToastNotification
          message="This email is already taken"
          type="error"
        />
      )}

      <div className="container mx-auto px-2">
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
                top: "-6.5em",
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
                <span>Register Now !</span>
              </div>
            </div>
          </div>
          <div className="card shrink-0 shadow-2xl bg-white" style={{marginTop:'-70px'}}>
            <form className="card-body"  onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div className="form-control" style={{ marginRight: "8px" }}>
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <label className="input input-bordered bg-slate-100 flex items-center gap-2">
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleInputChange}
                      className="grow border-none bg-slate-300"
                      placeholder="First Name"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <label className="input bg-slate-100 input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleInputChange}
                      className="grow border-none"
                      placeholder="Last Name"
                    />
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div className="form-control" style={{ marginRight: "8px" }}>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <label className="input input-bordered bg-slate-100 flex items-center gap-2">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleInputChange}
                      className="grow border-none"
                      placeholder="Email"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <label className="input bg-slate-100 input-bordered flex items-center gap-2">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleInputChange}
                      className="grow border-none"
                      placeholder="Password"
                    />
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginLeft: "-20px",
                }}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Repeat Password</span>
                  </label>
                  <label className="input input-bordered bg-slate-100 flex items-center gap-2">
                    <input
                      type="password"
                      name="repeatPassword"
                      value={repeatPassword}
                      onChange={handleInputChange}
                      className="grow border-none bg-#eee"
                      placeholder="Repeat Password"
                    />
                  </label>
                </div>
                <div className="form-control" style={{ marginTop: "35px" }}>
                  <select
                    className="select select-secondary w-full max-w-xs"
                    name="gender"
                    value={gender}
                    onChange={handleInputChange}
                  >
                    <option disabled value="">
                      What is your Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

            

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary text-white">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
