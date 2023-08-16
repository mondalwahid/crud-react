import React from "react";
import { useState } from "react";
import UserTable from "./usertable/UserTable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import "./usercontent.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  minHeight: "80vh",
};

const UserContent = () => {
  const baseUrl = "http://localhost:8000";
  const [users, setUsers] = useState([]);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [designation, setDesignation] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleOpenAddUserModalFunction = () => {
    setOpenAddUserModal(true);
  };

  const handleAddUser = async (e) => {
    e?.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/create`, {
        name: name,
        age: age,
        designation: designation,
      });
      const addedUser = res?.data;
      setUsers([...users, addedUser]);
      setOpenAddUserModal(false);
    } catch (error) {
      console.log(error, "Error while creating users");
    }
  };

  return (
    <div className="main-container">
      <h2 style={{ textAlign: "center" }}>List of Users</h2>
      <div className="sub-container">
        <button
          onClick={handleOpenAddUserModalFunction}
          className="add-user-btn"
        >
          Add User
        </button>
        <UserTable
          users={users}
          setUsers={setUsers}
          baseUrl={baseUrl}
          name={name}
          age={age}
          designation={designation}
          openAddUserModal={openAddUserModal}
          setOpenAddUserModal={setOpenAddUserModal}
        />

        {/* Add User Modal */}
        {openAddUserModal ? (
          <Modal
            open={openAddUserModal}
            onClose={() => setOpenAddUserModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2 style={{ textAlign: "center" }}>
                Fill-in all the fields to add a user!
              </h2>
              <form>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="inputs-container">
                    <p className="label-styles">Name:</p>
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      className="input-styles"
                    />
                  </div>
                  <div className="inputs-container">
                    <p className="label-styles">Age:</p>
                    <input
                      type="text"
                      value={age}
                      onChange={handleAgeChange}
                      className="input-styles"
                    />
                  </div>
                  <div className="inputs-container">
                    <p className="label-styles">Designation:</p>
                    <input
                      type="text"
                      value={designation}
                      onChange={handleDesignationChange}
                      className="input-styles"
                    />
                  </div>
                  <button
                    className="submit-btn"
                    onClick={handleAddUser}
                    style={{
                      backgroundColor:
                        !name || !age || !designation ? "#9c9c9c" : "#2243b6",
                    }}
                    disabled={!name || !age || !designation ? true : false}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Box>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default UserContent;
