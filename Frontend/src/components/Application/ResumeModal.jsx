import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <>
      <div className="resume-modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <object data={imageUrl} type="application/pdf" width="100%" height="100%"/>
        </div>
      </div>
    </>
  );
};

export default ResumeModal;
