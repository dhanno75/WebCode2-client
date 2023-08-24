import React from "react";
import banner from "../images/crm_banner.jpg";
const About = () => {
  return (
    <div className="about">
      <div className="about-left">
        <h1>Welcome to CRM Application</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dicta
          autem et doloremque impedit. Itaque facilis nihil nulla eveniet sit,
          rerum exercitationem? Laborum, adipisci quas.
        </p>
      </div>

      <div className="about-right">
        <div className="about-logo">
          <img src={banner} alt="" />
        </div>
      </div>
    </div>
  );
};

export default About;
