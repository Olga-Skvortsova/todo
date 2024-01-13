import React from "react";
import "./taskList.css";
import PropTypes from "prop-types";
import Task from "../task";

function TaskList({ todos, destroyItem, changeItem, onToggleDone }) {
  const elements = todos.map(({ id, ...anotherProps }) => (
    <li key={id}>
      <Task
        /* eslint-disable react/jsx-props-no-spreading */
        {...anotherProps}
        destroyItem={() => destroyItem(id)}
        changeItem={(label) => changeItem(id, label)}
        onToggleDone={() => onToggleDone(id)}
        id={id}
      />
    </li>
  ));

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  todos: [],
  destroyItem: () => {},
  changeItem: () => {},
  onToggleDone: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  destroyItem: PropTypes.func,
  changeItem: PropTypes.func,
  onToggleDone: PropTypes.func,
};

export default TaskList;
