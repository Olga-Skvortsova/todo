import React from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
    }
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

  render() {
    const { label, destroyItem, onToggleDone, done } = this.props
    let classNames = 'description'
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
