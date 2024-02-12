import React, {useState} from 'react';
import './newTaskForm.css';
import PropTypes from 'prop-types';

export default function NewTaskForm ({ sendNewTaskForm }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onMinutesChange = (e) => {
    setMinutes(e.target.value)
  }

  const onSecondsChange = (e) => {
    setSeconds(e.target.value)
  }

  const onSubmit = (e) => {
    if (label) {
      e.preventDefault();
      const minutesToFunc = parseInt(minutes, 10) || 0;
      const secondsToFunc = parseInt(seconds, 10) || 0;
      sendNewTaskForm(label, minutesToFunc, secondsToFunc);
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo__form" onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          id="new-todo"
          onChange={onLabelChange}
          value={label}
        />
        <input type="number" className="new-todo-form__timer" placeholder="Min" onChange={onMinutesChange} value={minutes} />
        <input type="number" className="new-todo-form__timer" placeholder="Sec" onChange={onSecondsChange} value={seconds} />
        <button className="hidden" type="submit">Submit</button>
      </form>
    </header>
  );

}

NewTaskForm.defaultProps = {
  sendNewTaskForm: () => {},
};

NewTaskForm.propTypes = {
  sendNewTaskForm: PropTypes.func,
};
