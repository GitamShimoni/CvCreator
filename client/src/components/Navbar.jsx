import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  function resetUser() {
    localStorage.setItem("token", "");
  }

  return (
    <div id="navbar-container">
      <div id="navbar-icon-container">
        <Link to={"/"}>
          <img
            id="navbar-icon"
            src="https://i.ibb.co/txDQyz5/cv-logo-removebg-preview.png"
            alt=""
          />
        </Link>
      </div>
      <div id="navbar-links-container">
        <Link to={"/"}>
          <h1 className="navbar-headers">{`Create CV`}</h1>
        </Link>
        <Link to={"/templates"}>
          <h1 className="navbar-headers">{`My CV'S`}</h1>
        </Link>
        <Link onClick={() => resetUser()} to={"/login"}>
          <img
            id="logout-icon"
            src="https://i.ibb.co/qgCbbk5/logout-icon.png"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
