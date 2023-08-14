import "./Login.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";
import Host from "../utils/routes";

const Register = () => {
  const [registers, setRegisters] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const { target } = e;
    const username = target[0].value;
    const password = target[1].value;
    const fullname = target[2].value;
    const email = target[3].value;
    const birthdate = target[4].value;
    console.log(username, password, fullname, email, birthdate);

    try {
      const { data: newRegister } = await axios.post(
        `${Host}/unauth/register`,
        { username, password, fullname, email, birthdate }
      );
      setRefresh((obj) => obj + 1);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <>
      <div
        id="register-container"
        className="animate__animated animate__fadeInDownBig"
      >
        <div id="register-inner">
          <h1 id="login-tittle">Register</h1>
          <form onSubmit={(e) => handleSubmitForm(e)}>
            <div className="username-login-container">
              <div className="login-div">
                <span className="user-register">Username</span>
                <input className="register-input" type="text" />
              </div>
            </div>
            <div className="username-login-container">
              <div className="login-div">
                <span className="user-register">Password</span>
                <input className="register-input" type="password" />
              </div>
            </div>
            <div className="username-login-container">
              <div className="login-div">
                <span className="user-register">Full Name</span>
                <input className="register-input" type="String" />
              </div>
            </div>
            <div className="username-login-container">
              <div className="login-div">
                <span className="user-register">Email</span>
                <input className="register-input" type="email" />
              </div>
            </div>
            <div className="username-login-container">
              <div className="login-div">
                <span className="user-register">Birthdate</span>
                <input className="register-input" type="date" />
              </div>
            </div>
            <div id="divofsubmit-registerbtn">
              <button id="login-btn" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
