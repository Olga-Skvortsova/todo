/* import React from 'react';
import TodoListItem from '../todo-list-item/todo-list-item'
import './todo-list.css'

const ToDoList = ({ todos }) => {

    const element = todos.map((item) => {
        return (<li key = {item.id}>
            <TodoListItem 
                label = {item.label}
                important = {item.important}
            />
        </li>)
    })

    return (
        <ul>
            {element}
        </ul>
    );
};

export default ToDoList; */