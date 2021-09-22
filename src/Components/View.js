import React from "react";

const View = (props) => (
  <div className="user">
    <p style={{ fontSize: "20px" }}>{props.data.task}</p>
    <p style={{ fontSize: "14px" }}>{props.data.email}</p>
    <p style={{ fontSize: "14px" }}>{props.data.date}</p>
  </div>
);

export default View;
