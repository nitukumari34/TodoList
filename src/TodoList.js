import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all');

    // useEffect(() => {
    //     const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    //     setTasks(storedTasks);
    // }, []);
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        if (storedTasks.length > 0) {
            setTasks(storedTasks);
        }
    }, []);


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks, filter]);

    const addTask = () => {
        if (newTask.trim() !== '') {
            setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const filteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter((task) => task.completed);
            case 'incomplete':
                return tasks.filter((task) => !task.completed);
            default:
                return tasks;
        }
    };

    return (
        <div>
            <div>
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
                <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <ul>
                {filteredTasks().map((task) => (
                    <TodoItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
