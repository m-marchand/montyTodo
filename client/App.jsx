import React, { useState, useEffect } from 'react';
import './index.css';
import Todo from './Todo.jsx'
import Monty from './images/MONTY.jpg'

const App = () => {

    const [userInput, setUserInput] = useState('')
    const [todos, setTodo] = useState([])

    useEffect(() => {
        fetch('/api/getTodos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            setTodo([...data])
        })
        .catch(err => {
            console.log('Error fetching tasks on render: ' + err);
        })
    }, [])

    const handleSubmit = () => {
        fetch('/api/addTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item: userInput})
        })
        .then(res => res.json())
        .then(data => {
            setTodo([...todos, data])
            document.querySelectorAll('input').forEach(el => el.value = '');
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleDelete = (itemId) => {
        fetch(`/api/deleteTodo/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const deleted = data.task
            const todoList = todos.reduce((acc, todo) => {
                console.log(acc)
                acc.push(todo.task);
                return acc;
            }, [])
            todos.splice(todoList.indexOf(deleted), 1)
            setTodo([...todos])
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='todo-container'>
            <h2 className='todo-title'>My Todos</h2>
            <div className='input-container'>
                <input className='todo-input' type='text' onChange={(e) => setUserInput(e.target.value)}></input>
                <button className='todo-submit' onClick={handleSubmit}>Submit</button>
            </div>
            <div className='todo-list'>
            {
                todos.map((todo, idx) => (
                    <Todo
                        key={idx}
                        todo={todo}
                        handleDelete={handleDelete}
                    />
                ))
            }
            </div>
            <img className='monty' src={Monty}></img>
        </div>
    )
}

export default App;