import React from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      prevTimeIsGoing: null,
    }
    this.interval = null
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.startTimer(this.props.id);
  }

  componentDidUpdate() {
    const { timeIsGoing } = this.props;
    const { prevTimeIsGoing } = this.state;

    if (timeIsGoing && !prevTimeIsGoing) {
      console.log('if выполняется');
      this.interval = setInterval(() => {
        if (this.props.time > 0) {
          this.props.updateTimer(this.props.id);
        } else {
          clearInterval(this.interval); // Stop the interval when time <= 0
        }
      }, 1000);
    } else if (!timeIsGoing && prevTimeIsGoing) {
      clearInterval(this.interval);
    }
    if (timeIsGoing !== prevTimeIsGoing) {
      this.setState({ prevTimeIsGoing: timeIsGoing });
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // eslint-disable-next-line class-methods-use-this
  wannaChange = (e) => {
    const windowWithNewLabel = e.target.parentNode.firstChild.firstChild
    windowWithNewLabel.classList.toggle('hidden')
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { changeItem } = this.props // Деструктуризация
    const { label } = this.state
    changeItem(label)
    this.setState({
      label: '',
    })
    e.target.classList.toggle('hidden')
  }

  startTimer = () => {
    this.props.startTimer(this.props.id);
  }
  stopTimer = () => {
    this.props.stopTimer(this.props.id);
  }

  render() {
    const { label, destroyItem, onToggleDone, done } = this.props
    let classNames = 'description'
    const minutes = (Math.floor(this.props.time / 60)).toString().padStart(2, "0")
    const seconds = (this.props.time - minutes * 60).toString().padStart(2, "0")
    if (done) {
      classNames += ' done'
    }
    return (
      <div>
        <div className="view">
          <form onSubmit={this.onSubmit}>
            <input onChange={this.onLabelChange} className="edit-window hidden" />
          </form>
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
          <label htmlFor="labelTask">
            <span id="labelTask" className={classNames}>
              {label}
            </span>
            <span className="description">
              <button onClick={this.startTimer} className="icon icon-play"></button>
              <button onClick={this.stopTimer} className="icon icon-pause"></button>
              <span>{minutes}</span>
              <span>:</span>
              <span>{seconds}</span>
            </span>
            <span id="labelTask" className="created">
              {formatDistanceToNow(new Date())}
            </span>
          </label>
          <button type="button" alt="icon-edit" className="icon icon-edit" onClick={this.wannaChange} />
          <button type="button" alt="icon-destroy" className="icon icon-destroy" onClick={destroyItem} />
        </div>
      </div>
    )
  }
}

Task.defaultProps = {
  label: '',
  destroyItem: () => {},
  changeItem: () => {},
  onToggleDone: () => {},
  done: false,
}

Task.propTypes = {
  label: PropTypes.string,
  destroyItem: PropTypes.func,
  changeItem: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
}