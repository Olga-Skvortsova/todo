import React, { useEffect, useState } from 'react';
import './taskList.css';
import Task from '../task';

function TaskList(props) {
  const [renderedTasks, setRenderedTasks] = useState([]); /* создается renderedTasks, в котором пусой массив и setRenderedTasks, который изменяет этот массив */

  useEffect(() => {
    const tasksComponents = props.allTasks.map((el, index) => (/* создается массив tasksComponents, который проходит по массиву allTasks, получает оттуда task и индекс task. */
      <Task key={index} allTasks={el} /> /* создается элемент Task, в который записывается ключ и в который передается task */
    ));
    setRenderedTasks(tasksComponents);
  }, [props.allTasks]);

  return (
    <ul className="todo-list">
      {renderedTasks}
    </ul>
  );
}

export default TaskList;
