import React from "react";

const View = (props) => (
  <div className="container">
    <p style={{ fontSize: "20px" }}>{props.task}</p>
    <p style={{ fontSize: "14px" }}>{props.email}</p>
    <p style={{ fontSize: "14px" }}>{props.date}</p>
  </div>
);

export default View;
