import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./usertable.css";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "0%",
  left: "50%",
  transform: "translate(-50%, -0%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  minHeight: "60vh",
};

const UserTable = ({ users, setUsers, baseUrl }) => {
  const [editUserId, setEditUserId] = useState("");
  const [editUserData, setEditUserData] = useState({
    name: "",
    age: "",
    designation: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/users`);
      const usersData = res?.data;
      setUsers(usersData);
    } catch (error) {
      console.log(error, "fetch error");
    }
  };

  const handleRemoveUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete_user/${id}`);
      setUsers(users.filter((user) => user?._id !== id));
    } catch (error) {
      console.log(error, "error while deleting user data");
    }
  };

  const handleEditUser = (user) => {
    setEditUserId(user._id);
    setEditUserData({
      name: user.name,
      age: user.age,
      designation: user.designation,
    });
  };

  const handleUpdateUser = async () => {
    try {
      const res = await axios.put(`${baseUrl}/update_user/${editUserId}`, {
        name: editUserData.name,
        age: editUserData.age,
        designation: editUserData.designation,
      });
      const updatedUser = res?.data;

      setUsers(
        users.map((user) => (user._id === editUserId ? updatedUser : user))
      );
      setEditUserId("");
      setEditUserData({
        name: "",
        age: "",
        designation: "",
      });
    } catch (error) {
      console.log(error, "error while updating user data");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ marginTop: ".5rem", position: "relative" }}>
      {users?.length === 0 ? (
        <p style={{ fontSize: 20 }}>"Lets start adding Users!"</p>
      ) : (
        <table className="table-styles">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Designation</th>
          </tr>
          {users?.map((e) => {
            return (
              <tbody key={e?._id}>
                {editUserId === e._id ? (
                  <Box sx={style}>
                    <p
                      className="close-styles"
                      onClick={() => setEditUserId("")}
                    >
                      CLOSE
                    </p>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "1rem",
                      }}
                    >
                      <p className="edit-modal-label-styles">Name:</p>
                      <input
                        type="text"
                        value={editUserData.name}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            name: e.target.value,
                          })
                        }
                        className="edit-user-details-input"
                      />
                      <p className="edit-modal-label-styles">Age:</p>
                      <input
                        type="text"
                        value={editUserData.age}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            age: e.target.value,
                          })
                        }
                        className="edit-user-details-input"
                      />
                      <p className="edit-modal-label-styles">Designation:</p>
                      <input
                        type="text"
                        value={editUserData.designation}
                        onChange={(e) =>
                          setEditUserData({
                            ...editUserData,
                            designation: e.target.value,
                          })
                        }
                        className="edit-user-details-input"
                      />
                      <button
                        className="save-btn"
                        disabled={
                          !editUserData.name ||
                          !editUserData.age ||
                          !editUserData.designation
                            ? true
                            : false
                        }
                        onClick={handleUpdateUser}
                        style={{
                          backgroundColor:
                            !editUserData.name ||
                            !editUserData.age ||
                            !editUserData.designation
                              ? "#9c9c9c"
                              : "#2243b6",
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </Box>
                ) : (
                  <tr>
                    <td>{e?.name}</td>
                    <td>{e?.age}</td>
                    <td>{e?.designation}</td>
                    <td className="btn-td-container">
                      <div className="btns-container">
                        <button
                          onClick={() => handleEditUser(e)}
                          className="edit-btn-styles"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemoveUser(e?._id)}
                          className="del-btn-styles"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default UserTable;
