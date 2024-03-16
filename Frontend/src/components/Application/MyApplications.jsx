import React, { useContext, useEffect, useState } from "react";
import { Context } from "./../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");
  const { user, isAuthorized } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      console.log("in fetch");
      try {
        if (user && user.role === "Employer") {
          await axios
            .get("https://scarlet-hatchling-kit.cyclic.app/api/v1/application/employer/getall", {
              withCredentials: true,
              headers: {
                token: localStorage.getItem('token'),
              },
            })
            .then((res) => {
              setApplications(res.data.applications);
            });
        }
        if (user && user.role === "Job Seeker") {
          await axios
            .get("https://scarlet-hatchling-kit.cyclic.app/api/v1/application/jobseeker/getall", {
              withCredentials: true,
              headers: {
                token: localStorage.getItem('token'),
              },
            })
            .then((res) => {
              setApplications(res.data.applications);
            });
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchApplications();
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      await axios
        .delete(`https://scarlet-hatchling-kit.cyclic.app/api/v1/application/delete/${id}`, {
          withCredentials: true,
          headers: {
            token: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          toast.success(res.data.message);

          setApplications((prevApplications) =>
            prevApplications.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length}
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      
      {modalOpen && <ResumeModal imageUrl={resumeUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span>
            {element.name}
          </p>
          <p>
            <span>Email:</span>
            {element.email}
          </p>
          <p>
            <span>Phone:</span>
            {element.phone}
          </p>
          <p>
            <span>Address:</span>
            {element.address}
          </p>
          <p>
            <span>Cover Letter:</span>
            {element.coverLetter}
          </p>
        </div>
        <a
          className="resume clickable"
          href={element.resume.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <object
            className="object-resume-small"
            data={element.resume.url}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>RESUME</p>
          </object>
        </a>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <a
          className="resume clickable"
          href={element.resume.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <object
            className="object-resume-small"
            data={element.resume.url}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>RESUME</p>
          </object>
        </a>
      </div>
    </>
  );
};
