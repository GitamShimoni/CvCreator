import Register from "./Register";
import Login from "./Login";
import "./Login.css";
import { useState } from "react";

const LoginPage = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div id="login-register-page">
        <Login clicked={clicked} setClicked={setClicked} />
        {clicked && <Register />}
      </div>
    </>
  );
};

export default LoginPage;
