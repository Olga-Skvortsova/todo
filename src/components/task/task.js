import React, { useEffect, useState, useRef } from 'react'
import './task.css'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

export default function Task ( { destroyItem, changeItem, onToggleDone, startTimer, stopTimer, updateTimer, id, time, timeIsGoing, done, labelFromProps, display } ) {
  const [label, setLabel] = useState(labelFromProps)
  const newInput = useRef(null)
  const [isEditing, setIsEditing] = useState(false);
  const needToHidden = useRef(null)

  let classNames = 'description'
  if (done) {
    classNames += ' done'
  }
  const minutes = (Math.floor(time / 60)).toString().padStart(2, "0")
  const seconds = (time - minutes * 60).toString().padStart(2, "0")

  const handleClick = (e) => {
    if (newInput.current && !newInput.current.contains(e.target)) {
      if (newInput.current.className === 'edit-window ') {
        setIsEditing(false)
        setLabel(labelFromProps); // Сбросить label к исходному значению
      }
    }
  }

  const escapeFunc = (e) => {
    if (e.code === "Escape") {
      if (newInput.current.className === 'edit-window ') {
        setIsEditing(false)
        setLabel(labelFromProps); // Сбросить label к исходному значению
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', escapeFunc)
    const interval = setInterval(() => {
      if (timeIsGoing) {
        if (time >= 1) {
          updateTimer(id);
        } else {
          clearInterval(interval);
        }
      }
    }, 1000)
    return () => {
      clearInterval(interval)
      document.removeEventListener('mousedown', handleClick)
    }
  // eslint-disable-next-line
  }, [timeIsGoing])

  useEffect(() => {
    if (!display) {
      needToHidden.current.classList.add('hidden')
    } else {
      needToHidden.current.classList.remove('hidden')
    }
  }, [display])

  const wannaChange = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setLabel(labelFromProps);
    }
  }

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    changeItem(label);
    setIsEditing(false);
  };

  return (
    <div ref={needToHidden}>
      <div className="view">
        <form onSubmit={onSubmit}>
        <input
          ref={newInput}
          onChange={onLabelChange}
          value={label}
          className={`edit-window ${isEditing ? '' : 'hidden'}`}
        />
        </form>
        <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />
        <label htmlFor="labelTask">
          <span id="labelTask" className={classNames}>
            {labelFromProps}
          </span>
          <span className="description">
            <button onClick={() => {startTimer(id)}} className="icon icon-play"></button>
            <button onClick={() => {stopTimer(id)}} className="icon icon-pause"></button>
            <span>{minutes}</span>
            <span>:</span>
            <span>{seconds}</span>
          </span>
          <span id="labelTask" className="created">
            {formatDistanceToNow(new Date())}
          </span>
        </label>
        <button type="button" alt="icon-edit" className="icon icon-edit" onClick={wannaChange} />
        <button type="button" alt="icon-destroy" className="icon icon-destroy" onClick={destroyItem} />
      </div>
    </div>
  )
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