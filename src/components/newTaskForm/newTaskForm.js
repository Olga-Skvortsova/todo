import React from 'react';
import "./newTaskForm.css";
import allTasks from '../app'

const NewTaskForm = () => {
    return (
        <header className='header'>
            <h1>todos</h1>
            <input className='new-todo' placeholder="What needs to be done?" autoFocus></input>
        </header>
    )
}

export default NewTaskForm;