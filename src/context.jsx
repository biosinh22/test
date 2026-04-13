import React, { createContext, useContext, useReducer } from 'react';
import { sampleEvents, sampleTodos, CATEGORIES } from './sampleData';

const AppContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, currentView: action.payload };
    case 'PREV_PERIOD': {
      const d = state.currentDate;
      if (state.currentView === 'weekly') {
        return { ...state, currentDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() - 7) };
      }
      return { ...state, currentDate: new Date(d.getFullYear(), d.getMonth() - 1, 1) };
    }
    case 'NEXT_PERIOD': {
      const d = state.currentDate;
      if (state.currentView === 'weekly') {
        return { ...state, currentDate: new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7) };
      }
      return { ...state, currentDate: new Date(d.getFullYear(), d.getMonth() + 1, 1) };
    }
    case 'GO_TODAY':
      return { ...state, currentDate: new Date() };
    case 'SHOW_ADD_EVENT':
      return { ...state, showModal: true, editingEvent: null, modalDefaultDate: action.payload || null };
    case 'SHOW_EDIT_EVENT':
      return { ...state, showModal: true, editingEvent: action.payload };
    case 'HIDE_MODAL':
      return { ...state, showModal: false, editingEvent: null, modalDefaultDate: null };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload], showModal: false, modalDefaultDate: null };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(e => e.id === action.payload.id ? action.payload : e),
        showModal: false,
        editingEvent: null,
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(e => e.id !== action.payload),
        showModal: false,
        editingEvent: null,
      };
    case 'SHOW_ADD_TODO':
      return { ...state, showTodoModal: true };
    case 'HIDE_TODO_MODAL':
      return { ...state, showTodoModal: false };
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload], showTodoModal: false };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case 'SET_TODO_FILTER':
      return { ...state, todoFilter: action.payload };
    default:
      return state;
  }
}

const initialState = {
  currentView: 'monthly',
  currentDate: new Date(2026, 3, 13), // April 13, 2026
  events: sampleEvents,
  todos: sampleTodos,
  categories: CATEGORIES,
  showModal: false,
  editingEvent: null,
  modalDefaultDate: null,
  showTodoModal: false,
  todoFilter: null,
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
