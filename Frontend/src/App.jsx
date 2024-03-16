import React, { useContext, useEffect } from "react";
import "./App.css";
import { Context } from "./main";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJobs from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://scarlet-hatchling-kit.cyclic.app/api/v1/user/getuser",
          {
            withCredentials: true,
            headers: {
              token: localStorage.getItem('token'),
            },
          }
        );
        console.log(response.data.user);
        setUser(response.data.user);
        // setUser({ name: "Tripti", role: "Employer" });
        // setUser();

        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/job/getall" element={<Jobs />}></Route>
          <Route path="/job/:id" element={<JobDetails />}></Route>
          <Route path="/job/post" element={<PostJobs />}></Route>
          <Route path="/job/me" element={<MyJobs />}></Route>
          <Route path="/application/:id" element={<Application />}></Route>
          <Route path="/application/me" element={<MyApplications />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
