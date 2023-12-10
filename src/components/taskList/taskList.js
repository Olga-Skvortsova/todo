import React from 'react';
import "./taskList.css";
import Task from '../task'

const TaskList = (props) => {
    return (
        <ul className='todo-list'>
            <Task allTasksToTask={props.allTasks} />
        </ul>
    )
} 
 
export default TaskList;