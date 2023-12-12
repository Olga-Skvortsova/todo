import React, { useEffect } from 'react';
import './task.css';

function Task(props) {
  useEffect(() => {
    /* const taskDestroy = document.getElementById('icon-destroy'); */
    /* taskDestroy.addEventListener('click', destroyTask); */
  }, [props.allTasks]);

  return (
    <li>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label htmlFor="labelTask">
          <span id="labelTask" className="description">
            {props.allTasks.value}
          </span>
          <span id="labelTask" className="created">
            {props.allTasks.timeOfCreating}
          </span>
        </label>
        <button type="button" alt="icon-edit" className="icon icon-edit" />
        <button type="button" alt="icon-destroy" className="icon icon-destroy" />
      </div>
    </li>
  );
}

export default Task;
