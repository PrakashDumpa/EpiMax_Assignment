import React, { useState } from "react";
import "./index.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormInputs from "../../ReusableComponents/FormInputs";
import AlertComponent from "../../ReusableComponents/AlertComponent";

const formList = [
  {
    id: 1,
    type: "text",
    label: "Name",
    apiKey: "name",
  },
  {
    id: 2,
    type: "textarea",
    label: "Summary",
    apiKey: "description",
  },
  {
    id: 3,
    type: "select",
    label: "Linked to ",
    apiKey: "linkedTo",
    optionsList: [
      {
        id: 1,
        name: "Project 1",
      },
      {
        id: 2,
        name: "Project 2",
      },
      {
        id: 3,
        name: "Project 3",
      },
      {
        id: 4,
        name: "Project 4",
      },
    ],
  },
  {
    id: 4,
    type: "select",
    label: "Assignee",
    apiKey: "assignee",
    optionsList: [
      {
        id: 1,
        name: "Number 1",
      },
      {
        id: 2,
        name: "Number 2",
      },
      {
        id: 3,
        name: "Number 3",
      },
      {
        id: 4,
        name: "Number 4",
      },
    ],
  },
];

const UserForm = ({ handleClose, editData, handleRequest }) => {
  const [formData, setFormData] = useState({ ...editData });
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.linkedTo !== "" && formData.assignee !== "") {
      handleClose();
      handleRequest(formData);
    } else {
      setIsValid(true);
    }
  };

  return (
    <>
      {isValid && <AlertComponent onClose={() => setIsValid(false)} />}
      <div className="">
        <DialogTitle
          className="font-weight-bold "
          sx={{ m: 0, px: 4 }}
          id="customized-dialog-title"
        >
          Create Task
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form className="textfield px-3" onSubmit={handleSubmit}>
            {formList.map((eachItem) => (
              <FormInputs
                optionsData={eachItem.optionsList}
                key={eachItem.id}
                label={eachItem.label}
                type={eachItem.type}
                value={formData[eachItem.apiKey]}
                required={true}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [eachItem.apiKey]: e.target.value,
                  })
                }
              />
            ))}
            <div className="text-right mt-4">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </div>
    </>
  );
};

export default UserForm;
