import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Plus, Trash2, CheckSquare, Square, X } from 'lucide-react';
import { useApp } from '../context';

function TodoItem({ todo, cat, onToggle, onDelete }) {
  const color = cat?.color || '#A0AEC0';
  const lightBg = cat?.lightBg || '#F5F5F5';

  return (
    <div
      className={`flex items-start gap-2.5 p-3 rounded-2xl transition-all duration-150 ${
        todo.completed ? 'opacity-50' : ''
      }`}
      style={{ backgroundColor: todo.completed ? '#F5F5F7' : lightBg }}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className="flex-shrink-0 mt-0.5 transition-transform active:scale-90"
        style={{ color }}
      >
        {todo.completed
          ? <CheckSquare size={18} />
          : <Square size={18} />
        }
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-snug ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </p>
        <div className="flex items-center gap-1.5 mt-0.5">
          {/* Category chip */}
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white"
            style={{ backgroundColor: color }}
          >
            {cat?.name || '기타'}
          </span>
          {/* Due date */}
          {todo.dueDate && (
            <span className="text-[10px] text-gray-400">
              {format(parseISO(todo.dueDate), 'M/d')}
            </span>
          )}
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 mt-0.5 text-gray-300 hover:text-red-400 active:text-red-500 transition-colors"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

function AddTodoSheet({ categories, onAdd, onClose }) {
  const [title, setTitle] = useState('');
  const [catId, setCatId] = useState(categories[0]?.id || '');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      id: `t-${Date.now()}`,
      title: title.trim(),
      categoryId: catId,
      completed: false,
      dueDate: dueDate || null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end modal-backdrop fade-in" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl p-5 slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mb-4" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">새 할 일</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <input
            autoFocus
            type="text"
            placeholder="할 일을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <p className="text-xs font-medium text-gray-500 mb-2">카테고리</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCatId(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: catId === cat.id ? cat.color : cat.lightBg,
                color: catId === cat.id ? '#fff' : cat.color,
                border: `1.5px solid ${cat.color}`,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Due date */}
        <div className="mb-5">
          <p className="text-xs font-medium text-gray-500 mb-2">마감일 (선택)</p>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!title.trim()}
          className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          추가하기
        </button>
        <div className="h-safe-area" />
      </div>
    </div>
  );
}

export default function TodoView() {
  const { state, dispatch } = useApp();
  const { todos, categories, todoFilter, showTodoModal } = state;

  const getCat = (id) => categories.find(c => c.id === id);

  const filtered = todoFilter
    ? todos.filter(t => t.categoryId === todoFilter)
    : todos;

  const pending = filtered.filter(t => !t.completed);
  const completed = filtered.filter(t => t.completed);

  const handleToggle = (id) => dispatch({ type: 'TOGGLE_TODO', payload: id });
  const handleDelete = (id) => dispatch({ type: 'DELETE_TODO', payload: id });
  const handleAdd = (todo) => dispatch({ type: 'ADD_TODO', payload: todo });

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7]">
      {/* Header */}
      <div className="bg-white px-4 pt-4 pb-3 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-900">할 일 목록</h1>
          <button
            onClick={() => dispatch({ type: 'SHOW_ADD_TODO' })}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus size={16} className="text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => dispatch({ type: 'SET_TODO_FILTER', payload: null })}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !todoFilter
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            전체
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => dispatch({ type: 'SET_TODO_FILTER', payload: cat.id })}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                backgroundColor: todoFilter === cat.id ? cat.color : cat.lightBg,
                color: todoFilter === cat.id ? '#fff' : cat.color,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Todo list */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-4">
        {/* Progress bar */}
        {filtered.length > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-500">진행률</span>
              <span className="text-xs font-bold text-indigo-600">
                {completed.length} / {filtered.length}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500"
                style={{ width: `${filtered.length > 0 ? (completed.length / filtered.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Pending todos - 2 column grid */}
        {pending.length > 0 && (
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 mb-2">
              남은 일 ({pending.length})
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {pending.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  cat={getCat(todo.categoryId)}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed todos */}
        {completed.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 mb-2">
              완료 ({completed.length})
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {completed.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  cat={getCat(todo.categoryId)}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <CheckSquare size={32} className="mb-2 opacity-30" />
            <p className="text-sm">할 일이 없어요</p>
          </div>
        )}
      </div>

      {/* Add todo modal */}
      {showTodoModal && (
        <AddTodoSheet
          categories={categories}
          onAdd={handleAdd}
          onClose={() => dispatch({ type: 'HIDE_TODO_MODAL' })}
        />
      )}
    </div>
  );
}
