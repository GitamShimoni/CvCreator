import axios from "axios";
import { useState, useEffect } from "react";
import "./FirstTemplate.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../App.css";
const FirstTemplate = ({ user, info }) => {
  // const [info, setInfo] = useState([]);
  const [index, setIndex] = useState(0);
  const [zeroIndex, setZeroIndex] = useState(0);
  // console.log(user, "This is the user");

  // useEffect(() => {
  //   const tempinfo = user[zeroIndex]?.info;
  //   user &&
  //     axios
  //       .post(
  //         "http://localhost:5000/info/fetchinfo",
  //         {
  //           _id: user[zeroIndex]?.info[tempinfo.length - 1],
  //         },
  //         {
  //           headers: {
  //             token: localStorage.getItem("token"),
  //           },
  //         }
  //       )
  //       .then(({ data }) => setInfo(data[0]))
  //       .catch((err) => console.log(err.message));
  // }, [user]);
  //   console.log(info);

  const convertHtmlToPdf = () => {
    const input = document.getElementById("template1-container");
    const pxWidth = input.offsetWidth;
    const pxHeight = input.offsetHeight;

    html2canvas(input, {
      width: pxWidth,
      height: pxHeight,
      scale: 1.8,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "px", [pxWidth, pxHeight]);
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("my-resume.pdf");
    });
  };

  return (
    <div className="alltemplate-container">
      <button className="alltemplate-button" onClick={convertHtmlToPdf}>
        Convert to PDF
      </button>
      <div id="template1-container">
        <div className="template-name-header-div">
          <div>
            <h1 className="template-name-header">{user[index]?.fullname}</h1>
            <h2 className="template-personalinfo-properties">{`Email: ${user[index]?.email}`}</h2>
            <h2 className="template-personalinfo-properties">{`Summary: ${info?.summary}`}</h2>
          </div>
          <img
            className="template-personal-img"
            src={`${info?.userImg}`}
            alt="Personal-Image"
          />
        </div>
        <div className="all-info-template-container">
          <div className="template-info-container">
            <div className="unordered-list">
              <h2 className="template-personalinfo-header">{`Skills`}</h2>
              <ul>
                {info?.skillHighLights?.map((obj, index) => {
                  return (
                    <li key={index}>
                      <h3 className="template-skills-header">{`${obj}`}</h3>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="template-phonehobbies-div">
              <div id="template-phonehobbies-container">
                <h2 className="template-personalinfo-header">{`Hobbies:`}</h2>
                <h2 className="template-skills-header">{`${info?.hobbies}`}</h2>
                <h2 className="template-personalinfo-header">{`Phone Number:`}</h2>
                <h2 className="template-skills-header">{`${info?.phone}`}</h2>
                <h2 className="template-personalinfo-header">{`Languages:`}</h2>
                <h2 className="template-personalinfo-info">{`${info?.languages}`}</h2>
              </div>
            </div>
          </div>
          <div className="template-personalinfo-div">
            <h2 className="template-personalinfo-header">{`Education`}</h2>
            <div className="template-education-container">
              <ul>
                {info?.education?.map((obj, index) => {
                  return (
                    <li key={index}>
                      <div className="template-education-div">
                        <div className="template-titledate-container">
                          <h3 className="template-education-h3">{`${obj.title}`}</h3>
                          <h3 className="template-educationDate-h3">{`${obj.dates}`}</h3>
                        </div>
                        <h3 className="template-education-h3">{`${obj.description}`}</h3>
                        {/* <div className="hr-div"></div> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <h2 className="template-personalinfo-header">{`Experience`}</h2>
            <ul>
              {info?.experience?.map((obj, index) => {
                return (
                  <li key={index}>
                    <div className="template-education-div">
                      <div className="template-titledate-container">
                        <h3 className="template-education-h3">{`${obj.title}`}</h3>
                        <h3 className="template-educationDate-h3">{`${obj.dates}`}</h3>
                      </div>
                      <h3 className="template-education-h3">{`${obj.description}`}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTemplate;
