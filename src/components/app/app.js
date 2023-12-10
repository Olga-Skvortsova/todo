import React from 'react';
import "./app.css";
import NewTaskForm from '../newTaskForm';
import TaskList from '../taskList';
import Footer from '../footer'

const App = () => {

    const allTasks = [1, 3, 3, 4]
    return (
        <section className='todoapp'>
            <NewTaskForm />
            <section className='main'>
                <TaskList allTasks={allTasks} />
                <Footer />
            </section>

            {/* <Header />
            <Input />
            //<ToDoList todos = {allItems}/> */}
        </section>
    )
} 

export default App; 