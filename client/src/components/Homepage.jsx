import { useState, useEffect } from "react";
import axios from "axios";
import CreateCv from "./CreateCv";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import "animate.css";

function Homepage() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/users/getUser",
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => setUser([data]))
      .catch((err) => console.log(err.message));
  }, [refresh]);
  return (
    <>
      <div id="welcoming-header-div">
        <h1
          className="animate__animated animate__fadeInUp"
          id="ultimateresume-header"
        >
          The Ultimate Resume Builder
        </h1>
        <h3
          className="animate__animated animate__fadeInUp"
          id="ultimateresume-description"
        >
          Build beautiful, recruiter-tested resumes in a few clicks! My resume
          builder is powerful and easy to use, with a range of amazing
          functions. Custom-tailor resumes for any job within minutes. Increase
          your interview chances and rise above the competition.
        </h3>
        <img
          className="mainpage-welcome-img animate__animated animate__fadeInLeft"
          src="https://i.ibb.co/pnrZhTq/Website-Welcome-Page.png"
          alt=""
        />
        <button
          onClick={() => setButtonClicked(!buttonClicked)}
          id="tryforfree-button"
        >
          Try Now For Free!
        </button>
      </div>
      {buttonClicked && (
        <div className="animate__animated animate__bounceInLeft">
          <CreateCv refresh={refresh} setRefresh={setRefresh} user={user} />
        </div>
      )}
    </>
  );
}

export default Homepage;
