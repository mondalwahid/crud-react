import React from "react";
import { useState } from "react";
import UserTable from "./usertable/UserTable";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        minHeight: "90vh",
        width: "40%",
        paddingTop: "1rem",
        borderRadius: 5,
      }}
    >
      <h2 style={{ textAlign: "center" }}>List of Users</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <button
          onClick={handleOpenAddUserModalFunction}
          style={{
            backgroundColor: "#4BB543",
            color: "#fff",
            width: 100,
            padding: "8px 0",
            borderRadius: 3,
            border: "none",
            cursor: "pointer",
          }}
        >
          Add User
        </button>
        <UserTable
          users={users}
          setUsers={setUsers}
          baseUrl={baseUrl}
          q
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
                  <label>
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </label>
                  <label>
                    Age:
                    <input type="text" value={age} onChange={handleAgeChange} />
                  </label>
                  <label>
                    Designation:
                    <input
                      type="text"
                      value={designation}
                      onChange={handleDesignationChange}
                    />
                  </label>
                  <button onClick={handleAddUser} style={{ cursor: "pointer" }}>
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
