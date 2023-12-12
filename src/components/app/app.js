// Модуль 1
import React, { useState, useEffect } from 'react';
import './app.css';
import NewTaskForm from '../newTaskForm';
import TaskList from '../taskList';
import Footer from '../footer';

function App() {
  /* здесь используется useState. allTasks создается, а setAllTasks изменяет allTasks */
  const [allTasks, setAllTasks] = useState([]);
  useEffect(() => { /* отслеживает изменения useEffect */
    console.log('allTasks изменился:', allTasks);
  }, [allTasks]);

  /* функция addTask, вызываться будет в NewTaskForm.
    Она заново создает allTasks, куда записывает предыдущее значение и добавляет новое */
  const addTask = (newTask) => {
    /* setAllTasks - функция, которая отвечает за изменение allTasks */
    setAllTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList allTasks={allTasks} />
        <Footer />
      </section>
    </section>
  );
}

export default App;
