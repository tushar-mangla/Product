import React from "react";
import landing from "../../img/landing3.jpg";
import "./style.scss";

const Landing = () => {
  return (
    <>
      <section
        className="landing home"
        style={{ backgroundImage: `url(${landing})` }}
      >
        <div className="primary-overlay">home</div>
      </section>
    </>
  );
};

export default Landing;
