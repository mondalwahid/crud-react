import React from "react";
import { useEffect } from "react";
import axios from "axios";

const UserTable = ({ users, setUsers, baseUrl, setOpenAddUserModal }) => {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ marginTop: ".5rem" }}>
      {users?.map((e) => {
        return (
          <div
            key={e?._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 300,
              marginTop: "1rem",
            }}
          >
            <p style={{ fontSize: 16, textTransform: "capitalize" }}>
              {e?.name}
            </p>
            <button
              onClick={() => handleRemoveUser(e?._id)}
              style={{
                backgroundColor: "#ff4a4a",
                color: "#fff",
                border: "none",
                width: 100,
                padding: "8px 0",
                borderRadius: 3,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UserTable;
