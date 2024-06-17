import React, { useState, useEffect } from "react";
import axios from "axios";
import InputManageAccount from "./InputManageAccount";
import MyDefaultAvatar from "../assets/avatar.jpg";

function ManageAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(MyDefaultAvatar);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/api/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        setId(userData.id);
        setEmail(userData.email);
        if (userData.imageProfile) {
          setAvatarPreview(`http://127.0.0.1:8000/storage/${userData.imageProfile}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("email", email);
      if (password) {
        formData.append("password", password);
      }
    

      const response = await axios.put(`http://127.0.0.1:8000/api/updateuser/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedUser = response.data.user;
      setEmail(updatedUser.email);
      if (updatedUser.imageProfile) {
        setAvatarPreview(`http://127.0.0.1:8000/storage/${updatedUser.imageProfile}`);
      }

      // Optionally, show a success message or notification
      console.log("User updated successfully:", updatedUser);
    } catch (error) {
      console.error("Error updating user:", error.response ? error.response.data : error.message);
      // Handle the error appropriately, e.g., show error notification
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2 style={{ fontSize: "45px" }}>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={{ width: "50%" }}>
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            overflow: "hidden",
            margin: "0 auto 20px",
            position: "relative",
          }}
        >
          <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
            <img
              src={avatarPreview}
              alt="Profile Image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                opacity: 0,
                cursor: "pointer",
              }}
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <InputManageAccount
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <InputManageAccount
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 mx-auto bg-blue-500 text-white rounded-md mb-2 hover:bg-green-700"
          style={{ marginLeft: "161px" }}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default ManageAccount;
