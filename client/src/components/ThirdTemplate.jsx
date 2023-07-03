import axios from "axios";
import { useState, useEffect } from "react";
import "./ThirdTemplate.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../App.css";
const ThirdTemplate = ({ user, info }) => {
  // const [info, setInfo] = useState([]);
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
    const input = document.getElementById("template2-container");
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
      <div className="template3-container">
        <div className="template3-top-container">
          <div className="template3-img-container">
            <img
              className="template3-personal-img"
              src={`${info?.userImg}`}
              alt="Personal-Image"
            />
            <div className="template3-nameinfo-container">
              <div className="template3-name-container">
                <h1 className="template3-firstname-header">
                  {user[zeroIndex]?.fullname?.split(" ")[0]}
                </h1>
                <h1 className="template3-lastname-header">
                  {user[zeroIndex]?.fullname?.split(" ")[1]}
                </h1>
              </div>
              <h2 className="template3-personalinfo-properties">{`${info?.summary}`}</h2>
            </div>
          </div>
        </div>
        <div className="template3-bottom-container">
          <div className="template3-bottomleft-container">
            <div className="template3-educationheader-div">
              <h2 className="template3-education-header">{`Education`}</h2>
            </div>
            {info?.education?.map((obj, index) => {
              return (
                <div className="template3-education-container" key={index}>
                  <div className="template3-orange-box"></div>
                  <div className="template3-education-titledate">
                    <h3 className="template3-educationDate-h3">{`${obj.dates}`}</h3>
                    <h3 className="template3-educationDate-h3">{`${obj.title}`}</h3>
                  </div>
                  <h3 className="template2-educationdetails-h3">{`${obj.description}`}</h3>
                </div>
              );
            })}
            <div className="template3-educationheader-div">
              <h2 className="template3-education-header">{`Experience`}</h2>
            </div>
            {info?.experience?.map((obj, index) => {
              return (
                <div className="template3-education-container" key={index}>
                  <div className="template3-orange-box"></div>
                  <div className="template3-education-titledate">
                    <h3 className="template3-educationDate-h3">{`${obj.dates}`}</h3>
                    <h3 className="template3-educationDate-h3">{`${obj.title}`}</h3>
                  </div>
                  <h3 className="template2-educationdetails-h3">{`${obj.description}`}</h3>
                </div>
              );
            })}
          </div>
          <div className="template3-bottomright-container">
            <h1 className="template3-subheader">{`Contact Me`}</h1>
            <h2 className="template3-personalinfos-properties">{`✉️ ${user[zeroIndex]?.email}`}</h2>
            <h2 className="template3-personalinfos-properties">{`📞 ${info?.phone}`}</h2>
            <h1 className="template3-subheader">{`Hobbies`}</h1>
            <h2 className="template3-personalinfos-properties">{`${info?.hobbies}`}</h2>
            <h1 className="template3-subheader">{`Languages`}</h1>
            <h2 className="template3-personalinfos-properties">{`${info?.languages}`}</h2>
            <div>
              <h1 className="template3-subheader">{`Skills`}</h1>
              <ul>
                {info?.skillHighLights?.map((obj, index) => {
                  return (
                    <li className="template3-skills-list" key={index}>
                      <h3 className="template-skills-header">{`${obj}`}</h3>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThirdTemplate;
