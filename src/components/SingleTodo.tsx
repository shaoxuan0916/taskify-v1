import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Todo } from '../model'

interface Props {
    todo: Todo
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)

    const handleDone = (id: Number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        ))
    }

    const handleDelete = (id: Number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()

        setTodos(todos.map(todo => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        )))

        setEdit(false)
    }

    
    // Direct focus inside input while edit button clicked

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <form className='todo' onSubmit={(e) => handleEdit(e, todo.id)}>

            {

                edit

                    ?

                    <input 
                        ref={inputRef}
                        value={editTodo}
                        onChange={e => setEditTodo(e.target.value)}
                        className='todo-text'
                    />

                    :

                    todo.isDone

                        ?

                        <s className="todo-text">
                            {todo.todo}
                        </s>

                        :

                        <span className="todo-text">
                            {todo.todo}
                        </span>
            }

            <div>
                <span
                    className='todo-icons'
                    onClick={() => setEdit(!edit)}
                >
                    <AiFillEdit />
                </span>

                <span className='todo-icons' onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>

                <span className='todo-icons' onClick={() => handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
        </form>
    )
}

export default SingleTodo