import React from 'react';

const Todo = ({ todo, handleDelete }) => {
    return (
        <div className='todo-item'>
            <span key={todo._id}>{todo.task}</span>
            <button className='delete-button' onClick={() => handleDelete(todo._id)}>x</button>
        </div>
    )
}

export default Todo;