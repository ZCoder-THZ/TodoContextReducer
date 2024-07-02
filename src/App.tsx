import React, { useState, useContext } from 'react';
import './App.css';
import { TodoContext } from './providers/TodoProvider';
import { todoActions } from './Acton';
import { Todo } from './reducers/toDoReducer';
const App = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('App must be used within a TodoProvider');
  }

  console.log(context);
  const { state: todos, dispatch } = context;
  const [todo, setTodo] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (todo.trim()) {
        dispatch({
          type: todoActions.INCREMENT,
          payload: {
            id: todos.length + 1,
            title: todo,
            completed: false,
          },
        });
        setTodo('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeHandler = (todo: Todo) => {
    dispatch({
      type: todoActions.TOGGLE,
      payload: todo,
    });
  };

  const onClickHandler = (todo: Todo) => {
    try {
      dispatch({ type: todoActions.DECREMENT, payload: todo });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </form>
      <ul style={{ listStyle: 'none' }}>
        {todos.map((todo) => (
          <div key={todo.id}>
            <li>{todo.title}</li>
            <input
              style={{ cursor: 'pointer' }}
              onChange={() => onChangeHandler(todo)}
              type="checkbox"
              checked={todo.completed}
            />
            <button onClick={() => onClickHandler(todo)}>Remove</button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
