import React from 'react'

import '../index.css'

import checkedLogo from '../res/checked.png'
import ellipse from '../res/ellipse.png'
import {MdDelete} from 'react-icons/md'

class ToDoItem extends React.Component {
    render() {

        const styleInput ={
            fontSize: '16px',
            fontFamily: 'Roboto',
            paddingLeft: '20px',
            border: "none transparent",
            outline: "none",
            textDecoration: this.props.value.completed && 'line-through',
            color: this.props.value.completed && 'grey'
            
        };
        
        return (
        <div className='task'>

            <img  
                src= {this.props.value.completed ? checkedLogo : ellipse} 
                alt='cannot' 
                style={{height: '16px', width: '16px',paddingLeft: '20px' }}
                onClick={() => {this.props.handleChange(this.props.value.id)}} 
                />

            <input style={styleInput} type='text' size='35' value={this.props.value.task}  />

            <MdDelete style={{height: '18px', width: '18px',paddingLeft: '20px'}}
                    onClick={() => {this.props.handleDelete(this.props.value.id)}}
                    />
                                            
        </div>
        );
    }
}

export default ToDoItem;


