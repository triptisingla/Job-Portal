import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebook, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
useContext
const Footer = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved by Tripti.</div>
      <div>
        <Link to={'https://www.linkedin.com/in/tripti-singla'} target="_blank">
          <FaLinkedin/>
        </Link>
        <Link to={'https://www.instagram.com/tripti_singla12/'} target="_blank">
          <RiInstagramFill/>
        </Link>
        {/* <Link to={'/'} target="_blank"></Link>
        <Link to={'/'} target="_blank"></Link> */}
      </div>
    </footer>
  );
};

export default Footer;
