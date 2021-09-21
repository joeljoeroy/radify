import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import View from "./Components/View";
import ToDo from "./Components/ToDo";

export default function App() {
  return (
    <Router>
      <ToDo />
      <button>
        <Link to="/view">view All</Link>
      </button>
    </Router>
  );
}

// when using hooks for localstorage

// useEffect(() => {
//   const json = JSON.stringify(tasks);
//   localStorage.setItem("tasks", json);
// }, [tasks]);

// loading from localStorage

// useEffect(() => {
//   const json = localStorage.getItem("tasks");
//   const savedTasks = JSON.parse(json);
//   if (savedTasks) {
//     setNotes(savedTasks);
//   }
// }, []);
