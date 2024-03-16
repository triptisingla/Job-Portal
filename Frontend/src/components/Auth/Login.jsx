import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://scarlet-hatchling-kit.cyclic.app/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", data.token);

      console.log("here",localStorage.getItem('token'));
      // console.log(document.cookie.get('token'));
      // Cookies.set("token", data.token);
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/logo.png" alt="logo" height="100%" />
            <h3>Login to your account</h3>
          </div>
          <form action="">
            <div className="inputTag">
              <label htmlFor="role">Login As</label>
              <div>
                <select
                  value={role}
                  name="role"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            <div className="inputTag">
              <label htmlFor="email">Email Address</label>
              <div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tr@gmail.com"
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className="inputTag">
              <label htmlFor="password">Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                <RiLock2Fill />
              </div>
            </div>

            <button onClick={handleLogin} type="submit">
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/imagelogin.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
