import React, { useState } from "react";
import "./LoginSignUp.css";
import email_icon from "../Assets/mail.png";
import user_icon from "../Assets/user.png";
import password_icon from "../Assets/padlock.png";
import hide_icon from "../Assets/hide.png";
import show_icon from "../Assets/show.png";
import axios from "axios";
import { ThreeDot } from "react-loading-indicators";

const LoginSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [user, setUser] = useState(null);

  const login = async () => {
    console.log(email); //emilys
    console.log(password); //emilyspass
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response.data);
      setLoading(false);
      const fetchedUser = {
        id: response.data["id"],
        username: response.data["username"],
        email: response.data["email"],
        firstName: response.data["firstName"],
        lastName: response.data["lastName"],
        gender: response.data["gender"],
        image: response.data["image"],
        accessToken: response.data["accessToken"],
        refreshToken: response.data["refreshToken"],
      };
      setUser(fetchedUser);
    } catch (error) {
      console.log("Failed to login");
      setLoading(false);
      if (error.response?.status === 400) {
        setErrorMessage(
          "The username or password is wrong, try to change either of them, check then try again."
        );
      } else {
        setErrorMessage(
          "Something went wrong that has nothing to do with the email or password. Please do try agian later."
        );
      }
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <img className="show-hide" src={hide_icon}></img>
            ) : (
              <img className="show-hide" src={show_icon}></img>
            )}
          </button>
        </div>
      </div>
      <div className="forgot-password">
        Lost Password? <span>Click Here</span>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={() => login()}>
          Login
        </div>
      </div>
      {/* Loading Popup */}
      {(errorMessage || user) && <div className="overlay"></div>}
      {loading && (
        <div className="popup loading-popup">
          <ThreeDot color="#fff" size="large" />
        </div>
      )}
      {errorMessage && (
        <div className="popup error-popup">
          <h3>AN ERROR OCURRED</h3>
          <p>{errorMessage}</p>
          <div className="submit confirm" onClick={() => setErrorMessage("")}>
            OK
          </div>
        </div>
      )}
      {user && (
        <div className="popup success-popup">
          <img src={user.image} alt="" />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <h4>{user.email}</h4>
          <div className="submit confirm" onClick={() => setUser(null)}>
            OK
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignUp;
