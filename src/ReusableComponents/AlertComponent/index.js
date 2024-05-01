import React from "react";
import Alert from "@mui/material/Alert";
import "./index.css";

const AlertComponent = ({ onClose }) => {
  return (
    <>
      <div className="alert_container"></div>
      <div className="d-flex justify-content-center">
        <Alert
          className="alert"
          variant="filled"
          severity="warning"
          onClose={onClose}
        >
          Please fill all the fields.
        </Alert>
      </div>
    </>
  );
};

export default AlertComponent;
