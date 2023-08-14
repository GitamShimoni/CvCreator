import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FirstTemplate from "./FirstTemplate";
import SecondTemplate from "./SecondTemplate";
import ThirdTemplate from "./ThirdTemplate";
import { Link } from "react-router-dom";
import "animate.css";
import "./MyCvs.css";
import Host from "../utils/routes";

const MyCvs = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/login");
  }
  const [refresh, setRefresh] = useState(0);
  const [user, setUser] = useState([]);
  const [infos, setInfos] = useState([]);
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
      .catch((err) => console.log(err));
  }, [refresh]);
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/info/fetchcvinfo",
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => setInfos(data))
      .catch((err) => console.log(err.message));
  }, [refresh]);
  return (
    <div className="animate__animated animate__fadeInUpBig">
      {infos.length == 0 && (
        <div className="nocvs-container">
          <h1 id="nocvs-header">{`You have no CV's Yet!`}</h1>
          <Link to={"/"}>
            <button id="tryforfree-button">Create now for Free!</button>
          </Link>
        </div>
      )}
      {infos &&
        infos.map((obj, index) => {
          if (obj.templateIndex == 1) {
            return (
              <FirstTemplate key={index} user={user} info={infos[index]} />
            );
          } else if (obj.templateIndex == 2) {
            return (
              <SecondTemplate key={index} user={user} info={infos[index]} />
            );
          } else if (obj.templateIndex == 3) {
            return (
              <ThirdTemplate key={index} user={user} info={infos[index]} />
            );
          }
        })}
    </div>
  );
};

export default MyCvs;
