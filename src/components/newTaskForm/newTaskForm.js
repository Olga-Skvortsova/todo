import React from 'react';
import './newTaskForm.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
      minutes: '',
      seconds: '',
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  }

  onMinutesChange = (e) => {
    this.setState({
      minutes: e.target.value,
    });
  }

  onSecondsChange = (e) => {
    this.setState({
      seconds: e.target.value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    const minutes = parseInt(this.state.minutes, 10) || 0; // Преобразует строку в число, используя основание 10
    const seconds = parseInt(this.state.seconds, 10) || 0; // Или 0, если преобразование не удалось
    this.props.sendNewTaskForm(label, minutes, seconds);
    this.setState({
      label: '',
      minutes: '',
      seconds: '',
    });
  }

  render() {
    const { label, minutes, seconds } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo__form" onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            id="new-todo"
            onChange={this.onLabelChange}
            value={label}
          />
          <input className="new-todo-form__timer" placeholder="Min" onChange={this.onMinutesChange} value={minutes} />
          <input className="new-todo-form__timer" placeholder="Sec" onChange={this.onSecondsChange} value={seconds} />
          <button className="hidden" type="submit">Submit</button>
        </form>
      </header>
    );
  }
}

NewTaskForm.defaultProps = {
  sendNewTaskForm: () => {},
};

NewTaskForm.propTypes = {
  sendNewTaskForm: PropTypes.func,
};
