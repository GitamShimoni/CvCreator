import axios from "axios";
import { useEffect, useState } from "react";
import "./CreateCv.css";
import FirstTemplate from "./FirstTemplate";
import Host from "../utils/routes";
function CreateCv({ user, refresh, setRefresh }) {
  // const [refresh, setRefresh] = useState(0);
  const [info, setInfo] = useState([]);
  // const [highlightState, sethighlightState] = useState([]);
  const [skillsTitle, setSkillsTitle] = useState([""]);
  const [education, setEducation] = useState([
    { title: "", dates: "", description: "" },
  ]);
  const [experience, setExperience] = useState([
    { title: "", dates: "", description: "" },
  ]);
  const [zeroIndex, setZeroIndex] = useState(0);
  const [templateIndex, setTemplateIndex] = useState(0);

  useEffect(() => {
    const tempinfo = user[zeroIndex]?.info;
    user &&
      axios
        .post(
          `${Host}/info/fetchinfo`,
          {
            _id: user[zeroIndex]?.info[tempinfo.length - 1],
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        )
        .then(({ data }) => setInfo(data[0]))
        .catch((err) => console.log(err.message));
  }, [user]);

  useEffect(() => {
    if (info?.skillHighLights) {
      setSkillsTitle(info?.skillHighLights);
      setEducation(info?.education);
      setExperience(info?.experience);
    }
  }, [info]);
  const CreateInfo = async (e) => {
    if (templateIndex == 0) {
      alert("A template must be selected!");
    } else {
      e.preventDefault();
      const UserImg = e.target[0].value;
      const Phone = e.target[1].value;
      const Address = e.target[2].value;
      const Summary = e.target[3].value;
      const languages = e.target[4].value;
      const hobbies = e.target[5].value;
      const skillHighLights = skillsTitle;
      const experiences = experience;
      const educations = education;
      const userId = user[0]._id;
      // console.log(
      //   UserImg,
      //   Phone,
      //   Address,
      //   Summary,
      //   languages,
      //   hobbies,
      //   skillHighLights,
      //   experiences,
      //   educations,
      //   userId
      // );
      try {
        const register = await axios.post(
          `${Host}/info/createinfo`,
          {
            id: userId,
            userImg: UserImg,
            phone: Phone,
            address: Address,
            summary: Summary,
            skillHighLights: skillHighLights,
            experience: experiences,
            education: educations,
            languages: languages,
            hobbies: hobbies,
            templateIndex: templateIndex,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        setRefresh((prev) => prev + 1);
        console.log(register);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  //THESE ARE THE FUNCTIONS FOR THE SKILL

  const handleAddSkill = () => {
    const newArray = [...skillsTitle, ""];
    setSkillsTitle(newArray);
  };
  const handleDeleteSkill = (index) => {
    if (skillsTitle.length > 0) {
      setSkillsTitle((prev) => prev.filter((item, i) => i != index));
    }
    // let newArray = [...skillsTitle]
    // newArray = newArray.filter((_, i) => i!==index)
    // const newArray = [...experience]
    // newArray.splice(index, 1)
    // setSkillsTitle(newArray)
  };
  const handleSkillTitle = (e, index) => {
    const newArray = [...skillsTitle];
    newArray[index] = e.target.value;
    setSkillsTitle(newArray);
  };

  //THESE ARE THE FUNCTIONS FOR THE EXPERIENCE

  const handleAddExperience = () => {
    const newArray = [...experience, { title: "", dates: "", description: "" }];
    setExperience(newArray);
  };
  const handleDeleteExperience = (index) => {
    if (index > 0) {
      setExperience((prev) => prev.filter((item, i) => i != index));
    }
  };
  const handleExperienceTitle = (e, index) => {
    const newArray = [...experience];
    newArray[index].title = e.target.value;
    setExperience(newArray);
  };
  const handleExperienceDate = (e, index) => {
    const newArray = [...experience];
    newArray[index].dates = e.target.value;
    setExperience(newArray);
  };
  const handleExperienceDescription = (e, index) => {
    const newArray = [...experience];
    newArray[index].description = e.target.value;
    setExperience(newArray);
  };

  //THESE ARE THE FUNCTIONS FOR THE EDUCATION

  const handleAddEducation = () => {
    const newArray = [...education, { title: "", dates: "", description: "" }];
    setEducation(newArray);
  };
  const handleDeleteEducation = (index) => {
    if (index > 0) {
      const newArray = [...education];
      newArray.splice(index, 1);
      setEducation(newArray);
    }
  };
  const handleEducationTitle = (e, index) => {
    const newArray = [...education];
    newArray[index].title = e.target.value;
    setEducation(newArray);
  };
  const handleEducationDate = (e, index) => {
    const newArray = [...education];
    newArray[index].dates = e.target.value;
    setEducation(newArray);
  };
  const handleEducationDescription = (e, index) => {
    const newArray = [...education];
    newArray[index].description = e.target.value;
    setEducation(newArray);
  };
  return (
    <div>
      <div className="template-select-image-div">
        <h1 className="cv-form-headers">Select a Template:</h1>
      </div>
      <div className="template-select-image-div">
        <img
          onClick={() => setTemplateIndex(1)}
          className={`template-select-image ${
            templateIndex == 1 && "template-select-image-selected"
          } `}
          src="https://i.ibb.co/0jZ1p8L/template1.png"
          alt="Template 1 - picture"
        />
        <img
          onClick={() => setTemplateIndex(2)}
          className={`template-select-image ${
            templateIndex == 2 && "template-select-image-selected"
          } `}
          src="https://i.ibb.co/y85bfX5/template2.png"
          alt="Template 2 - picture"
        />
        <img
          onClick={() => setTemplateIndex(3)}
          className={`template-select-image ${
            templateIndex == 3 && "template-select-image-selected"
          } `}
          src="https://i.ibb.co/gS1nRyV/template3.png"
          alt="Template 3 - picture"
        />
      </div>
      {/* <FirstTemplate user={user}/> */}
      <div className="cv-form-container">
        <form
          onSubmit={(e) => {
            CreateInfo(e);
          }}
          className="cv-form"
        >
          <h1 className="cv-form-headers-globally">Image SRC</h1>
          <input
            className="cv-form-single-input"
            placeholder="User Image SRC"
            type="text"
            defaultValue={info?.userImg}
          />
          <h1 className="cv-form-headers-globally">Phone Number</h1>
          <input
            className="cv-form-single-input"
            placeholder="Phone Number"
            type="text"
            defaultValue={info?.phone}
          />
          <h1 className="cv-form-headers-globally">Address</h1>
          <input
            className="cv-form-single-input"
            placeholder="Address"
            type="text"
            defaultValue={info?.address}
          />
          <h1 className="cv-form-headers-globally">Summary</h1>
          <input
            className="cv-form-single-input"
            placeholder="Summary"
            type="text"
            defaultValue={info?.summary}
          />
          <h1 className="cv-form-headers-globally">Languages</h1>
          <input
            className="cv-form-single-input"
            placeholder="Languages"
            type="text"
            defaultValue={info?.languages}
          />
          <h1 className="cv-form-headers-globally">Hobbies</h1>
          <input
            className="cv-form-single-input"
            placeholder="Hobbies"
            type="text"
            defaultValue={info?.hobbies}
          />

          <h1 className="cv-form-headers">Skills</h1>
          {skillsTitle?.map((obj, index) => {
            return (
              <div key={index} className="cv-form-skill-div">
                <input
                  defaultValue={skillsTitle[index]}
                  onChange={(e) => handleSkillTitle(e, index)}
                  className="cv-form-differentSkills-input"
                  placeholder="Skill Highlights"
                  type="text"
                />
                <div onClick={() => handleAddSkill()} className="xbutton-div">
                  +
                </div>
                <div
                  onClick={() => handleDeleteSkill(index)}
                  className="xbutton-div"
                >
                  -
                </div>
              </div>
            );
          })}
          <h1 className="cv-form-headers">Experience</h1>
          {experience?.map((obj, index) => {
            return (
              <div key={index} className="cv-form-skill-div">
                <input
                  defaultValue={experience[index]?.title}
                  onChange={(e) => handleExperienceTitle(e, index)}
                  className="cv-form-different-input"
                  placeholder="Experience"
                  type="text"
                />
                <input
                  defaultValue={experience[index]?.dates}
                  onChange={(e) => handleExperienceDate(e, index)}
                  className="cv-form-different-input"
                  placeholder="Dates"
                  type="text"
                />
                <input
                  defaultValue={experience[index]?.description}
                  onChange={(e) => handleExperienceDescription(e, index)}
                  className="cv-form-different-input"
                  placeholder="Description"
                  type="text"
                />
                <div
                  onClick={() => handleAddExperience()}
                  className="xbutton-div"
                >
                  +
                </div>
                <div
                  onClick={() => handleDeleteExperience(index)}
                  className="xbutton-div"
                >
                  -
                </div>
              </div>
            );
          })}
          <h1 className="cv-form-headers">Education</h1>
          {education?.map((obj, index) => {
            return (
              <div key={index} className="cv-form-skill-div">
                <input
                  defaultValue={education[index]?.title}
                  onChange={(e) => handleEducationTitle(e, index)}
                  className="cv-form-different-input"
                  placeholder="Education"
                  type="text"
                />
                <input
                  defaultValue={education[index]?.dates}
                  onChange={(e) => handleEducationDate(e, index)}
                  className="cv-form-different-input"
                  placeholder="Dates"
                  type="text"
                />
                <input
                  defaultValue={education[index]?.description}
                  onChange={(e) => handleEducationDescription(e, index)}
                  className="cv-form-different-input"
                  placeholder="Description"
                  type="text"
                />
                <div
                  onClick={() => handleAddEducation()}
                  className="xbutton-div"
                >
                  +
                </div>
                <div
                  onClick={() => handleDeleteEducation(index)}
                  className="xbutton-div"
                >
                  -
                </div>
              </div>
            );
          })}
          <input className="submit-button" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default CreateCv;
