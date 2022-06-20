import React, { useState } from 'react'
import InputField from './components/InputField'
import { Todo } from './model';

import './App.css'
import TodoList from './components/TodoList';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")

  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {

    e.preventDefault()

    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }])
      setTodo("")
    }

  }

  return (
    <div className='App'>

      <h1>Taskify</h1>

      <InputField
        todo={todo}
        setTodo={setTodo}
        handleAdd={handleAdd}
      />

      <TodoList
        todos={todos}
        setTodos={setTodos}
      />

    </div>
  )
}

export default App
