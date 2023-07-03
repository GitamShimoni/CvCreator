import axios from "axios";
import { useState, useEffect } from "react";
import "./SecondTemplate.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../App.css";
const SecondTemplate = ({ user, info }) => {
  // const [info, setInfo] = useState([]);
  const [zeroIndex, setZeroIndex] = useState(0);

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
      <div className="template2-container">
        <div className="template2-left-part">
          <div className="template2-topleft-part">
            <div className="template2-img-container">
              <img
                className="template2-personal-img"
                src={`${info?.userImg}`}
                alt="Personal-Image"
              />
            </div>
            <div className="template2-namesummary-container">
              <h1 className="template2-firstname-header">
                {user[zeroIndex]?.fullname?.split(" ")[0]}
              </h1>
              <h1 className="template2-lastname-header">
                {user[zeroIndex]?.fullname?.split(" ")[1]}
              </h1>
              <h2 className="template2-personalinfo-properties">{`${info?.summary}`}</h2>
            </div>
          </div>
          <div className="template2-aboutme-container">
            <h1 className="template2-subheader">{`• Contact Info`}</h1>
            <h2 className="template2-personalinfos-properties">{`✉️ ${user[zeroIndex]?.email}`}</h2>
            <h2 className="template2-personalinfos-properties">{`📞 ${info?.phone}`}</h2>
          </div>
          <div className="template2-hobbies-container">
            <h2 className="template2-subheader">{`• Hobbies`}</h2>
            <h2 className="template2-personalinfos-properties">{`${info?.hobbies}`}</h2>
            <h2 className="template2-subheader">{`• Languages`}</h2>
            <h2 className="template2-personalinfos-properties">{`${info?.languages}`}</h2>
          </div>
        </div>
        <div className="template2-right-part">
          <div className="template2-education-container">
            <h2 className="template2-aboutme-header">{`Education`}</h2>
            {info?.education?.map((obj, index) => {
              return (
                <div className="template2-education-container" key={index}>
                  <div className="template2-educationtop-container">
                    <h3 className="template2-education-h3">{`• ${obj.title}`}</h3>
                    <h3 className="template2-educationDate-h3">{`${obj.dates}`}</h3>
                  </div>
                  <div className="template2-educationbottom-container">
                    <h3 className="template2-educationdetails-h3">{`${obj.description}`}</h3>
                  </div>
                  {/* <div className="hr-div"></div> */}
                </div>
              );
            })}
          </div>
          <h2 className="template2-aboutme-header">{`Experience`}</h2>
          {info?.experience?.map((obj, index) => {
            return (
              <div className="template2-education-container" key={index}>
                <div className="template2-educationtop-container">
                  <h3 className="template2-education-h3">{`• ${obj.title}`}</h3>
                  <h3 className="template2-educationDate-h3">{`${obj.dates}`}</h3>
                </div>
                <div className="template2-educationbottom-container">
                  <h3 className="template2-educationdetails-h3">{`${obj.description}`}</h3>
                </div>
              </div>
            );
          })}
          <div>
            <h2 className="template2-aboutme-header">{`Skills`}</h2>
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
        </div>
      </div>
    </div>
  );
};
export default SecondTemplate;
