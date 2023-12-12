import React from 'react';
import './footer.css';
import TasksFilter from '../tasksFilter';

function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">
        {' '}
        {/* добавить сколько задач добавлено */}
      </span>
      <ul className="filters">
        <TasksFilter />
      </ul>
      <button type="button" className="clear-completed">Clear completed</button>
    </footer>
  );
}

export default Footer;
