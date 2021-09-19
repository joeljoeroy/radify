import React , { Component } from 'react'

import  '../index.css'

import Item from './ToDoItem'
import Divider from '@mui/material/Divider';
import addLogo from '../res/add18.png'



class ToDo extends Component {

    constructor(){
        super();
        this.state = {
            newItem: '',
            tasks: [],
            Title:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.newItem = this.newItem.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    newItem(key, value){
        this.setState({
            [key]: value
        });

    }

    handleNew(){
        if(this.state.newItem){
            const newItem = {
                id: (Math.random() *100) + 1,
                completed: false,
                task: this.state.newItem.slice()
            };

            const tasks = [...this.state.tasks];
            tasks.push(newItem);
            this.setState({
                tasks,
                newItem: ''
                });
        }
    }

    handleChange(id){

        this.setState((prevState) => {
            const newTasks = prevState.tasks.map(todo => {
                if(todo.id === id){
                    todo.completed = !todo.completed
                }
                return todo
            });
            return newTasks;
        })
    }

    handleDelete(id){
       const list = [...this.state.tasks];
       const newTasks = list.filter((task) => task.id !== id);
       this.setState({
           tasks: newTasks
       });

    }

    render(){

        

        const incompleted = this.state.tasks.filter((res) => !res.completed).map(content => <Item key={content.id} value={content} handleChange={this.handleChange} handleDelete={this.handleDelete}/>);
        
        const completed = this.state.tasks.filter((res) => res.completed).map(content => <Item key={content.id} value={content} handleChange={this.handleChange} handleDelete={this.handleDelete} />);

        return (
            <>
            
            <div className='note-body'>

                <input      type='text' 
                            className='title'
                            value = {this.state.Title} 
                            placeholder = 'Enter a Title'
                            onChange = {(e) => { this.newItem('Title', e.target.value) }}
                            onKeyUp ={(event)=> {event.key === 'Enter' && this.setState({ Title : this.state.Title.slice()})}} 
                            />
                <div className='container-add'> 

                    <img src={addLogo} alt='none' className='add-logo' onClick={() => this.handleNew()} />

                    <input  type='text' 
                            className='add-task'
                            value = {this.state.newItem} 
                            placeholder = 'New Item'
                            onChange = {(e) => { this.newItem('newItem', e.target.value) }}
                            onKeyUp ={(event)=> {event.key === 'Enter' && this.handleNew(this.state.tasks.length)}} />
                            
                </div>
                <Divider width='450px'/>
                
                <div>
                    
                    {incompleted}

                    <p className='default'>Completed</p>
                    <Divider width='450px'light='false' />
                    
                    {completed}
                
                </div>

            </div>
            </>
        );
    }
    
}


export default ToDo;
