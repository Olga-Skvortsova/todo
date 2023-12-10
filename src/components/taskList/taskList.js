import React from 'react';
import "./taskList.css";
import Task from '../task'

const TaskList = () => {
    return (
        <ul className='todo-list'>
            <Task />
        </ul>
    )
} 
 
export default TaskList;