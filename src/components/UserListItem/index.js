import React from "react";
import "./index.css";

const UserListItem = ({ eachUser, setTasksData }) => {
  const onChangeStatus = (e) => {
    setTasksData((prev) =>
      [...prev].map((each) =>
        eachUser.id === each.id ? { ...each, status: e.target.value } : each
      )
    );
  };
  return (
    <tr className="">
      {/* <td>{eachUser?.id}</td> */}
      <td>{eachUser?.name}</td>
      <td className="">
        <p className="description overflow-auto">{eachUser?.description}</p>
      </td>
      <td>{eachUser?.linkedTo}</td>
      <td>{eachUser?.assignee}</td>
      <td>
        <select
          className={`${eachUser.status === "In Progress" && "text-primary"} ${
            eachUser.status === "Done" && "text-success"
          } `}
          value={eachUser.status}
          onChange={onChangeStatus}
        >
          <option className="text-secondary">To Do</option>
          <option value={"In Progress"} className="text-primary">
            In Progress
          </option>
          <option value={"Done"} className="text-success">
            Done
          </option>
        </select>
      </td>
      <td>
        <button type="button" className=" border-0 bg-white">
          {eachUser.edit}
        </button>
      </td>
      <td>
        <button type="button" className=" border-0 bg-white">
          {eachUser.delete}
        </button>
      </td>
    </tr>
  );
};

export default UserListItem;
