import React from 'react';
import './tasksFilter.css';
import PropTypes from 'prop-types';

function TasksFilter({ allFilter, activeFilter, competedFilter }) {
  return (
    <li>
      <button type="button" className="selected" onClick={allFilter}>
        All
      </button>
      <button type="button" onClick={activeFilter}>Active</button>
      <button type="button" onClick={competedFilter}>Completed</button>
    </li>
  );
}

TasksFilter.defaultProps = {
  allFilter: (() => {}),
  activeFilter: (() => {}),
  competedFilter: (() => {}),
};

TasksFilter.propTypes = {
  allFilter: PropTypes.func,
  activeFilter: PropTypes.func,
  competedFilter: PropTypes.func,
};

export default TasksFilter;
