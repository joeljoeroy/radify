import React, { Component } from "react";

import "../index.css";

import Item from "./ToDoItem";
import Divider from "@mui/material/Divider";
import addLogo from "../res/add18.png";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from 'react'

toast.configure();

class ToDo extends Component {
  constructor() {
    super();
    const savedObject = JSON.parse(localStorage.getItem('saved')); 

    if(!savedObject){
    this.state = {
      newItem: "",
      tasks: [],
      Title: "",
      email: "",
      date: null,
      }
    }else{ 
      console.log(savedObject.email);
      this.state = {  newItem: '', 
                      tasks: [...savedObject.tasks], 
                      Title: savedObject.title, 
                      email: savedObject.email, 
                      date: savedObject.date 
                    }
      console.log('state email:' + this.state.email);
    } 
  
    this.savedTasks = [];

    this.handleChange = this.handleChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.newItem = this.newItem.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  newItem(key, value) {
    this.setState({
      [key]: value,
    });
  }
  validate() {

    // const pattern=`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email.slice())){
    this.setState({ email: this.state.email.slice() });
    }
    else{
      toast.error("Invalid Email",{
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_CENTER});
    }
  }

  handleNew() {
    if (this.state.newItem) {
      console.log(this.state)
      const newItem = {
        id: Math.random() * 100 + 1,
        completed: false,
        task: this.state.newItem.slice(),
      };
      // Saving Object to LocalStorage///////////////////////////////////////////

      this.savedTasks.push(newItem);
      const saved = {
        title: this.state.Title,
        email: this.state.email,
        date: this.state.date,
        tasks: [...this.savedTasks],
      };
      const json = JSON.stringify(saved);
      console.log(json)
      localStorage.setItem("saved", json);
      ////////////////////////////////////////////////////////////////////////////

      const tasks = [...this.state.tasks];
      tasks.push(newItem);
      this.setState({
        tasks,
        newItem: "",
      });
    }

    toast.success("Task Added", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  handleChange(id) {
    this.setState((prevState) => {
      const newTasks = prevState.tasks.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return newTasks;
    });
  }

  handleDelete(id) {
    const list = [...this.state.tasks];
    const newTasks = list.filter((task) => task.id !== id);
    this.setState({
      tasks: newTasks,
    });
    toast.warning("Task Removed", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }

  render() {
    const incompleted = this.state.tasks
      .filter((res) => !res.completed)
      .map((content) => (
        <Item
          key={content.id}
          value={content}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
        />
      ));

    const completed = this.state.tasks
      .filter((res) => res.completed)
      .map((content) => (
        <Item
          key={content.id}
          value={content}
          handleChange={this.handleChange}
          handleDelete={this.handleDelete}
        />
      ));

    return (
      <>
        <div className="note-body">
          {/* Title input */}

          <input
            type="text"
            className="title"
            value={this.state.Title}
            placeholder="Title"
            onChange={(e) => {
              this.newItem("Title", e.target.value);
            }}
            onKeyUp={(event) => {
              event.key === "Enter" &&
                this.setState({ Title: this.state.Title.slice() });
            }}
            
            required = 'true'
          />
          {/* Email input */}

          <input
            type="email"
            className="default-input"
            placeholder="email@addr.com"
            size="20"
            value={this.state.email}
            onChange={(e) => this.newItem("email", e.target.value)}
            onBlur={(e) => {
              this.validate()
            }}
          />

          {/* Date input  */}
          <input
            type="date"
            className="default-input"
            placeholder="date"
            value={this.state.date}
            onChange={(e) => {
              this.setState({ date: e.target.value });
            }}
          />

          <div className="container-add">
            <img
              src={addLogo}
              alt="none"
              className="add-logo"
              onClick={() => {
                this.handleNew();
              }}
            />

            <input
              type="text"
              className="add-task"
              value={this.state.newItem}
              placeholder="task add"
              onChange={(e) => {
                this.newItem("newItem", e.target.value);
              }}
              onKeyUp={(event) => {
                event.key === "Enter" && this.handleNew();
              }}
              autofocus="true"
              maxlength="10"
            />
          </div>

          <Divider width="450px" />

          <div>
            {incompleted}

            <p className="default">Completed</p>
            <Divider width="450px" light="false" />

            {completed}
          </div>
        </div>
      </>
    );
  }
}

export default ToDo;
