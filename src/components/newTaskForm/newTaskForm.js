import React from "react";
import "./newTaskForm.css";
import PropTypes from "prop-types";

export default class NewTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
    };
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { sendNewTaskForm } = this.props; // Деструктуризация
    const { label } = this.state;
    sendNewTaskForm(label);
    this.setState({
      label: "",
    });
  };

  render() {
    const { label } = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit} /* при отправке */>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            id="new-todo"
            onChange={this.onLabelChange}
            value={label}
          />
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
