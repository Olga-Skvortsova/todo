import React from 'react'
import './app.css'

import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import Footer from '../footer'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoData: [],
      noFiltertodoData: [],
    }
  }

  addNewTaskForm = (label, minutes, seconds) => {
    const el = this.createTodoItem(label, minutes, seconds)
    this.setState(({ todoData, noFiltertodoData }) => {
      const newArr = [...todoData, el] /* новый стейт это старый стейт + новый элемент */
      return {
        todoData: newArr,
        noFiltertodoData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    /* получает в TaskList id элемента */
    this.setState(({ todoData, noFiltertodoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const before = todoData.slice(0, index) /* создается массив из элементов до удаленного */
      const after = todoData.slice(index + 1) /* создается массив после удаленного */
      const newArray = [...before, ...after]
      return {
        todoData: newArray /* возвращается в state новый массив todoData */,
        noFiltertodoData: newArray,
      }
    })
  }

  changeItem = (id, label2) => {
    this.setState(({ todoData, noFiltertodoData }) => {
      const index = noFiltertodoData.findIndex((el) => el.id === id)
      const el = todoData.filter((elem) => elem.id === id)
      const newItem = {
        ...el[0],
        label: label2,
      }
      const before = noFiltertodoData.slice(0, index)
      const after = noFiltertodoData.slice(index + 1) /* создается массив после удаленного */
      const newArray = [...before, newItem, ...after]
      return {
        todoData: newArray /* возвращается в state новый массив todoData */,
        noFiltertodoData: newArray,
      }
    })
  }

  deleteAllFilter = () => {
    this.setState(({ todoData, noFiltertodoData }) => {
      let newArray = [...todoData]
      newArray = noFiltertodoData.filter((el) => !el.done)
      return {
        todoData: newArray /* возвращается в state новый массив todoData */,
        noFiltertodoData: newArray,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData, noFiltertodoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      }
      const before = todoData.slice(0, index)
      const after = todoData.slice(index + 1)
      const newArray = [...before, newItem, ...after]
      return {
        todoData: newArray,
        noFiltertodoData: newArray,
      }
    })
  }

  allFilter = () => {
    const allFilters = document.getElementsByClassName('filters')[0].children[0].childNodes
    allFilters[0].classList.add('selected')
    allFilters[1].classList.remove('selected')
    allFilters[2].classList.remove('selected')

    this.setState(({ todoData, noFiltertodoData }) => {
      const newArr = structuredClone(noFiltertodoData)
      return {
        todoData: newArr,
      }
    })
  }

  activeFilter = () => {
    const allFilters = document.getElementsByClassName('filters')[0].children[0].childNodes
    allFilters[0].classList.remove('selected')
    allFilters[1].classList.add('selected')
    allFilters[2].classList.remove('selected')
    this.setState(({ todoData, noFiltertodoData }) => {
      const activeFiltered = noFiltertodoData.filter((el) => !el.done)
      return {
        todoData: activeFiltered,
      }
    })
  }

  competedFilter = () => {
    const allFilters = document.getElementsByClassName('filters')[0].children[0].childNodes
    allFilters[0].classList.remove('selected')
    allFilters[1].classList.remove('selected')
    allFilters[2].classList.add('selected')
    this.setState(({ todoData, noFiltertodoData }) => {
      const competedFilter = noFiltertodoData.filter((el) => el.done)
      return {
        todoData: competedFilter,
      }
    })
  }

  createTodoItem(label, minutes, seconds) {
    return {
      label,
      time: minutes * 60 + seconds,
      done: false,
      timeIsGoing: false,
      id: Math.random().toString(36).slice(2),
    }
  }

  startTimer = (id) => {
    this.setState(({ todoData, noFiltertodoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = {
        ...oldItem,
        timeIsGoing: true,
      }
      const before = todoData.slice(0, index)
      const after = todoData.slice(index + 1)
      const newArray = [...before, newItem, ...after]
      return {
        todoData: newArray,
        noFiltertodoData: newArray,
      }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData, noFiltertodoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newItem = {
        ...oldItem,
        timeIsGoing: false,
      }
      const before = todoData.slice(0, index)
      const after = todoData.slice(index + 1)
      const newArray = [...before, newItem, ...after]
      return {
        todoData: newArray,
        noFiltertodoData: newArray,
      }
    })
  }

  updateTimer = (id) => {
    this.setState(({ todoData, noFiltertodoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[index]
      const newTime = oldItem.time - 1
      const newItem = {
        ...oldItem,
        time: newTime,
      }
      const before = todoData.slice(0, index)
      const after = todoData.slice(index + 1)
      const newArray = [...before, newItem, ...after]
      return {
        todoData: newArray,
        noFiltertodoData: newArray,
      }
    })
  }

  render() {
    const { todoData, noFiltertodoData } = this.state
    const todoCount = noFiltertodoData.length - noFiltertodoData.filter((el) => el.done).length

    return (
      <section className="todoapp">
        <NewTaskForm sendNewTaskForm={this.addNewTaskForm} />
        <section className="main">
          <TaskList
            todos={todoData}
            destroyItem={this.deleteItem}
            changeItem={this.changeItem}
            onToggleDone={this.onToggleDone}
            startTimer={this.startTimer}
            stopTimer={this.stopTimer}
            updateTimer={this.updateTimer}
          />
          <Footer
            left={todoCount}
            allFilter={this.allFilter}
            activeFilter={this.activeFilter}
            competedFilter={this.competedFilter}
            deleteAllFilter={this.deleteAllFilter}
          />
        </section>
      </section>
    )
  }
}
