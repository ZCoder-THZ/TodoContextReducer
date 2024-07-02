import { todoActions } from '../Acton';
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
interface Action {
  type: string;
  payload: Todo;
}
export const todoReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case todoActions.INCREMENT:
      return [
        ...state,
        { title: action.payload.title, id: state.length + 1, completed: false },
      ];
    case todoActions.DECREMENT:
      return state.filter((todo) => todo.id !== action.payload.id);

    case todoActions.TOGGLE:
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};
