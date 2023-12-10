import React from 'react';
import "./task.css";

const Task = () => {
    return (
        <li> {/* добавить класс */}
            <div className='view'>
                <input className='toggle' type='checkbox'></input>
                <label> 
                    <span className='description'>{/* добавить задачу */}
                    </span>
                    <span className='created'>{/* добавить время добавления задачи */}
                    </span> 
                </label>
                <button className='icon icon-edit'></button>
                <button className='icon icon-destroy'></button>
            </div>
        </li>
    )
}

export default Task;