import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
// import "../../App.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://scarlet-hatchling-kit.cyclic.app/api/v1/user/register",
        { name, email, password, phone, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setEmail("");
      setName("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
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
            <img
              src="/logo.png"
              alt="logo"
              height="100%" 
            />
            <h3>Create a new account</h3>
          </div>
          <form action="">
            <div className="inputTag">
              <label htmlFor="role">Register As</label>
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
              <label htmlFor="name">Name</label>
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tripti"
                />
                <FaPencilAlt size={"2em"} />
              </div>
            </div>

            <div className="inputTag">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="phone">Phone Number</label>
              <div>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543214"
                />
                <FaPhoneFlip />
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

            <button onClick={handleRegister} type="submit">
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/imageregister.png" alt="register" />
        </div>
      </section>
    </>
  );
};

export default Register;
