import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import "./index.css";
import { v4 as uudiV4 } from "uuid";
import UserListItem from "../UserListItem";
import { DeleteIcon, EditIcon } from "../../icons";
import UserForm from "../UserForm";
import { PieChart, Pie, Tooltip } from "recharts";

const Home = () => {
  const [tasksData, setTasksData] = useState([]);
  const [activeItem, setActiveItem] = useState({});
  const [isShow, setIsShow] = useState(false);
  const [popup, setPopUp] = useState({
    isEdit: false,
    isCreate: false,
  });

  const transformRows = (response) => {
    return {
      ...response,
      edit: getEditComponent(response),
      delete: getDeleteComponent(response),
    };
  };

  const getEditComponent = (item) => {
    return (
      <div>
        <EditIcon onClick={() => handleEditButton(item)} />
      </div>
    );
  };

  const handleEditButton = (item) => {
    setActiveItem(item);
    setPopUp((prev) => ({ ...prev, isEdit: true }));
  };

  const handleEditCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isEdit: false }));

  const getDeleteComponent = (item) => {
    return (
      <div>
        <DeleteIcon onClick={() => handleDeleteButton(item)} />
      </div>
    );
  };

  const handleDeleteButton = (item) => {
    setTasksData((prev) => [...prev].filter((each) => each.id !== item.id));
  };

  const handleCreateButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: true }));

  const handleCreateCloseButton = () =>
    setPopUp((prev) => ({ ...prev, isCreate: false }));

  const handleCreateTask = (formData) => {
    formData = { ...formData, id: uudiV4(), status: "To Do" };
    let result = transformRows(formData);
    setTasksData((prev) => [...prev, result]);
  };

  const handleUpdateTask = async (formData) => {
    let result = tasksData.map((each) =>
      each.id === formData.id ? { ...each, ...formData } : each
    );
    setTasksData(result);
  };

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(3),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(2),
    },
  }));

  let data = [];
  let obj = {};
  for (let i in tasksData) {
    obj[tasksData[i].status] = obj[tasksData[i].status] + 1 || 1;
  }

  for (let j in obj) {
    let a = {};
    a["name"] = j;
    a["value"] = obj[j];
    data.push(a);
  }

  const onClickShowButton = () => {
    setIsShow(true);
  };

  return (
    <>
      <div className="parent_container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>EpiMax</h2>
          <button
            onClick={handleCreateButton}
            type="button"
            className="btn btn-primary"
          >
            Add Task
          </button>
        </div>
        {tasksData.length > 0 ? (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th className="w-25">Description</th>
                <th>Linked To</th>
                <th>Assignee</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="table_body">
              {tasksData?.map((each) => (
                <UserListItem
                  key={each.id}
                  eachUser={each}
                  setTasksData={setTasksData}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="d-flex justify-content-center align-items-center h-100">
            <h3>No Tasks are Available</h3>
          </div>
        )}
        {popup.isCreate && (
          <BootstrapDialog
            onClose={handleCreateCloseButton}
            aria-labelledby="customized-dialog-title"
            open={popup.isCreate}
          >
            <UserForm
              handleClose={handleCreateCloseButton}
              editData={{
                name: "",
                description: "",
                linkedTo: "",
                assignee: "",
              }}
              handleRequest={handleCreateTask}
            />
          </BootstrapDialog>
        )}

        {popup.isEdit && (
          <BootstrapDialog
            onClose={handleEditCloseButton}
            aria-labelledby="customized-dialog-title"
            open={popup.isEdit}
          >
            <UserForm
              handleClose={handleEditCloseButton}
              handleRequest={handleUpdateTask}
              editData={{
                id: activeItem.id,
                name: activeItem.name,
                description: activeItem.description,
                linkedTo: activeItem.linkedTo,
                assignee: activeItem.assignee,
              }}
            />
          </BootstrapDialog>
        )}
      </div>

      <div className="show_Button_Container">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onClickShowButton}
        >
          Analytics
        </button>
      </div>

      {isShow && (
        <BootstrapDialog
          onClose={() => setIsShow(false)}
          aria-labelledby="customized-dialog-title"
          open={isShow}
        >
          {data.length > 0 ? (
            <>
              <h3 className="text-center pt-4">Task status analytics</h3>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />

                <Tooltip />
              </PieChart>
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100 p-4 ">
              <h3>No details are available</h3>
            </div>
          )}
        </BootstrapDialog>
      )}
    </>
  );
};

export default Home;
