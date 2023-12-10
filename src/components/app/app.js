import React from 'react';
import "./app.css";
import NewTaskForm from '../newTaskForm';
import TaskList from '../taskList';
import Footer from '../footer'


const App = () => {

    return (
        <section className='todoapp'>
            <NewTaskForm />
            <section className='main'>
                <TaskList />
                <Footer />
            </section>

            {/* <Header />
            <Input />
            //<ToDoList todos = {allItems}/> */}
        </section>
    )
} 

export default App; 