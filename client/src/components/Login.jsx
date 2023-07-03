import "./Login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ clicked, setClicked }) => {
  const navigate = useNavigate();
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { target } = e;
    const username = target[0].value;
    const password = target[1].value;

    try {
      const data = await axios.post("http://localhost:5000/unauth/login", {
        username,
        password,
      });
      console.log("Success!");
      const token = data.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <>
      <div id="login-container">
        <div id="login-inner">
          <h1 id="login-tittle">Log in</h1>
          <form onSubmit={(e) => handleSubmitForm(e)}>
            <div className="username-login-container">
              <div className="login-div">
                <span className="user">Username</span>
                <input className="login-input" type="text" />
              </div>
            </div>
            <div className="password-login-container">
              <div className="login-div">
                <span className="user">Password</span>
                <input className="login-input" type="password" />
              </div>
              <div className="notregistered-container">
                <span>Not registered? </span>
                <span
                  onClick={() => setClicked(!clicked)}
                  id="signupnow-button"
                >
                  Sign up now!{" "}
                </span>
              </div>
            </div>

            <div id="divofsubmit-btn">
              <button id="login-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
