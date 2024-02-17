import React from 'react';

function TodoItem({ task, toggleTask, deleteTask }) {
    return (
        <li>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
}

export default TodoItem;
