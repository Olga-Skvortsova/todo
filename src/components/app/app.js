import React, { useState } from 'react'
import './app.css'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import Footer from '../footer'

export default function App () {
  const [todoData, setTodoData] = useState([])
  const [noFiltertodoData, setNoFiltertodoData] = useState([])

  const todoCount = noFiltertodoData.length - noFiltertodoData.filter((el) => el.done).length

  const addNewTaskForm = (label, minutes, seconds) => {
    const el = createTodoItem(label, minutes, seconds)
    setTodoData((prev) => [...prev, el])
    setNoFiltertodoData((prev) => [...prev, el])
  }

  const deleteItem = (id) => {
    setTodoData((prevData) => prevData.filter((el) => el.id !== id));
    setNoFiltertodoData((prevData) => prevData.filter((el) => el.id !== id));
  }

  const changeItem = (id, label2) => {
    const newArr = (arr) => arr.map((el) => (el.id === id ? { ...el, label: label2 } : el));
    setTodoData((prevData) => newArr(prevData));
    setNoFiltertodoData((prevData) => newArr(prevData));
  }

  const deleteAllFilter = () => {
    setTodoData((prevData) => prevData.filter((el) => !el.done));
    setNoFiltertodoData((prevData) => prevData.filter((el) => !el.done));
  }

  const onToggleDone = (id) => {
    const newArr = (arr) => arr.map((el) => (el.id === id ? { ...el, done: !el.done } : el));
    setTodoData((prevData) => newArr(prevData));
    setNoFiltertodoData((prevData) => newArr(prevData));
  }

  const allFilter = () => {
    const allFilters = document.getElementsByClassName('filters')[0].children[0].childNodes
    allFilters[0].classList.add('selected')
    allFilters[1].classList.remove('selected')
    allFilters[2].classList.remove('selected')

    const newArr = structuredClone(noFiltertodoData)
    setTodoData(newArr)
  }

  const activeFilter = () => {
    const allFilters = document.getElementsByClassName('filters')[0].children[0].childNodes
    allFilters[0].classList.remove('selected')
    allFilters[1].classList.add('selected')
    allFilters[2].classList.remove('selected')
    const activeFiltered = noFiltertodoData.filter((el) => !el.done)
    setTodoData(activeFiltered)
  }

  const competedFilter = () => {
    const allFilters = document.getElementsByClassName('filters')[0].children[0].childNodes
    allFilters[0].classList.remove('selected')
    allFilters[1].classList.remove('selected')
    allFilters[2].classList.add('selected')

    const competedFilter = noFiltertodoData.filter((el) => el.done)
    setTodoData(competedFilter)
  }
  
  const createTodoItem = (label, minutes, seconds) => {
    return {
      label,
      time: minutes * 60 + seconds,
      done: false,
      timeIsGoing: true,
      id: Math.random().toString(36).slice(2),
    };
  };

  const startTimer = (id) => {
    const newArr = (arr) => arr.map((el) => (el.id === id ? { ...el, timeIsGoing: true } : el));
    setTodoData((prevData) => newArr(prevData));
    setNoFiltertodoData((prevData) => newArr(prevData));
  }

  const stopTimer = (id) => {
    const newArr = (arr) => arr.map((el) => (el.id === id ? { ...el, timeIsGoing: false } : el));
    setTodoData((prevData) => newArr(prevData));
    setNoFiltertodoData((prevData) => newArr(prevData));
  }

  const updateTimer = (id) => {
    const newArr = (arr) => arr.map(
      (el) => {
        if (el.id === id) {
          if (el.time >= 1) {
            return { ...el, time: el.time - 1 }
          } else {
            return { ...el, timeIsGoing: false }
          }
        } else {
          return el
        }
      }
    );
    setTodoData((prevData) => newArr(prevData));
    setNoFiltertodoData((prevData) => newArr(prevData));
  }

  return (
    <section className="todoapp">
      <NewTaskForm sendNewTaskForm={addNewTaskForm} />
      <section className="main">
        <TaskList
          todos={todoData}
          destroyItem={deleteItem}
          changeItem={changeItem}
          onToggleDone={onToggleDone}
          startTimer={startTimer}
          stopTimer={stopTimer}
          updateTimer={updateTimer}
        />
        <Footer
          left={todoCount}
          allFilter={allFilter}
          activeFilter={activeFilter}
          competedFilter={competedFilter}
          deleteAllFilter={deleteAllFilter}
        />
      </section>
    </section>
  )
}
