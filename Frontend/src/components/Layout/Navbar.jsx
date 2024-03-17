import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburger, GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "https://scarlet-hatchling-kit.cyclic.app/api/v1/user/logout",
        {
          withCredentials: true,
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.removeItem('token');
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      {/* <h1>Navbar</h1> */}
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="/logowt.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link
                to={"/"}
                onClick={() => {
                  setShow(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/job/getall"}
                onClick={() => {
                  setShow(false);
                }}
              >
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link
                to={"/application/me"}
                onClick={() => {
                  setShow(false);
                }}
              >
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    VIEW ALL JOBS
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}
            <button onClick={handleLogout}>LOGOUT</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
