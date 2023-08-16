import React from "react";
import UserContent from "./components/usercontent/UserContent";

const App = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1c8ef8",
      }}
    >
      <UserContent />
    </div>
  );
};

export default App;
