import React, { createContext, useReducer, ReactNode } from 'react';
import { todoReducer } from '../reducers/toDoReducer';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  state: Todo[];
  dispatch: React.Dispatch<any>;
}

export const TodoContext = createContext<TodoContextType | null>(null);

interface TodoProviderProps {
  children: ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, [
    {
      id: 1,
      title: 'Todo 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 279',
      completed: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      completed: false,
    },
  ]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
