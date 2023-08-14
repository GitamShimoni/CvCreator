import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreateCv from "./CreateCv";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import "animate.css";
import Host from "../utils/routes";

function Homepage() {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const createCvRef = useRef(null); // Ref to the CreateCv component
  useEffect(() => {
    axios
      .post(
        `${Host}/users/getUser`,
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

  const handleButtonClick = () => {
    if (createCvRef.current) {
      createCvRef.current.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setShowButton(true);
    }, 800);
  };

  return (
    <>
      <div id="welcoming-header-div">
        <h1
          className="animate__animated animate__fadeInUp"
          id="ultimateresume-header"
        >
          The Ultimate Resume Builder
        </h1>
        <button
          className="animate__animated animate__fadeInUp"
          onClick={handleButtonClick}
        >
          Create Now!
        </button>
        <h3
          className="animate__animated animate__fadeInUp"
          id="ultimateresume-description"
        >
          {` Build beautiful, recruiter-tested resumes in a few clicks! My resume
          builder is powerful and easy to use, with a range of amazing
          functions. Custom-tailor resumes for any job within minutes. Increase
          your interview chances and rise above the competition.`}
        </h3>
        <img
          className="mainpage-welcome-img animate__animated animate__fadeInLeft"
          src="https://i.ibb.co/pnrZhTq/Website-Welcome-Page.png"
          alt=""
        />
        <div id="button-andarrow-container">
          <button
            className={showButton && "animate__animated animate__rubberBand"}
            onClick={() => setButtonClicked(!buttonClicked)}
            id="tryforfree-button"
          >
            Try Now For Free!
          </button>
          {buttonClicked && (
            <img
              id="down-pointing-arrow"
              src="https://clipart-library.com/new_gallery/14-149930_arrow-pointing-to-down-comments-arrow-pointing-down.png"
              alt="pointing arrow"
            />
          )}
        </div>
      </div>
      <div
        ref={createCvRef}
        className="animate__animated animate__bounceInLeft"
      >
        {buttonClicked && (
          <CreateCv refresh={refresh} setRefresh={setRefresh} user={user} />
        )}
      </div>
    </>
  );
}

export default Homepage;
