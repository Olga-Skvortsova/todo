import React, { useEffect } from 'react';
import './newTaskForm.css';
import { formatDistanceToNow } from 'date-fns';

function NewTaskForm(props) {
  useEffect(() => {
    const InputNewTodo = document.getElementById('new-todo');

    function sendInput(e) {
      if (e.keyCode === 13) {
        console.log('sendInput работает');
        if (InputNewTodo.value) {
          props.addTask({
            value: InputNewTodo.value,
            timeOfCreating: formatDistanceToNow(new Date, { addSuffix: true }),
            important: true,
          }); /* вызывается функция addTask, которая передает значение InputNewTodo.value, потом это value записывается как новое значение, добавляется к старым, обновляется allTasks */
          InputNewTodo.value = ''; // Очищаем поле ввода после добавления задачи
        }
      }
    }

    InputNewTodo.addEventListener('keyup', sendInput);

    return () => {
      InputNewTodo.removeEventListener('keyup', sendInput);
    };
  }, [props.addTask]);

  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus id="new-todo" />
    </header>
  );
}

export default NewTaskForm;
