import React from 'react'
import './taskList.css'
import PropTypes from 'prop-types'

import Task from '../task'

function TaskList({ todos, destroyItem, changeItem, onToggleDone, startTimer, stopTimer, updateTimer }) {
  const elements = todos.map(({ id, ...anotherProps }) => (
    <li key={id}>
      <Task
        /* eslint-disable react/jsx-props-no-spreading */
        {...anotherProps}
        destroyItem={() => destroyItem(id)}
        changeItem={(label) => changeItem(id, label)}
        onToggleDone={() => onToggleDone(id)}
        startTimer={startTimer}
        stopTimer={stopTimer}
        updateTimer={updateTimer}
        id={id}
        time={anotherProps.time}
        timeIsGoing={anotherProps.timeIsGoing}
        done={anotherProps.done}
        labelFromProps={anotherProps.label}
      />
    </li>
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  destroyItem: () => {},
  changeItem: () => {},
  onToggleDone: () => {},
}

TaskList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  destroyItem: PropTypes.func,
  changeItem: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TaskList