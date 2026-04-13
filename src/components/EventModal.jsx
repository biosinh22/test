import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { X, Trash2, Clock, Calendar, Tag, AlignLeft, AlarmClock } from 'lucide-react';
import { useApp } from '../context';

function Field({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-xl bg-gray-100 mt-0.5">
        <Icon size={15} className="text-gray-500" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
        {children}
      </div>
    </div>
  );
}

export default function EventModal() {
  const { state, dispatch } = useApp();
  const { editingEvent, modalDefaultDate, categories } = state;

  const defaultDate = modalDefaultDate
    ? format(modalDefaultDate, 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [isAllDay, setIsAllDay] = useState(true);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setStartDate(editingEvent.startDate);
      setEndDate(editingEvent.endDate || editingEvent.startDate);
      setStartTime(editingEvent.startTime || '09:00');
      setEndTime(editingEvent.endTime || '10:00');
      setIsAllDay(editingEvent.isAllDay);
      setCategoryId(editingEvent.categoryId || categories[0]?.id || '');
      setNotes(editingEvent.notes || '');
    } else {
      setTitle('');
      setStartDate(defaultDate);
      setEndDate(defaultDate);
      setStartTime('09:00');
      setEndTime('10:00');
      setIsAllDay(true);
      setCategoryId(categories[0]?.id || '');
      setNotes('');
    }
  }, [editingEvent, modalDefaultDate]);

  const handleSave = () => {
    if (!title.trim()) return;
    const event = {
      id: editingEvent?.id || `e-${Date.now()}`,
      title: title.trim(),
      startDate,
      endDate,
      startTime: isAllDay ? null : startTime,
      endTime: isAllDay ? null : endTime,
      isAllDay,
      categoryId,
      notes,
    };
    if (editingEvent) {
      dispatch({ type: 'UPDATE_EVENT', payload: event });
    } else {
      dispatch({ type: 'ADD_EVENT', payload: event });
    }
  };

  const handleDelete = () => {
    if (editingEvent) {
      dispatch({ type: 'DELETE_EVENT', payload: editingEvent.id });
    }
  };

  const selectedCat = categories.find(c => c.id === categoryId);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-end modal-backdrop fade-in"
      onClick={() => dispatch({ type: 'HIDE_MODAL' })}
    >
      <div
        className="bg-white rounded-t-3xl shadow-2xl slide-up"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '92vh', overflowY: 'auto' }}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-gray-200 mx-auto mt-3 mb-1" />

        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3">
          <button
            onClick={() => dispatch({ type: 'HIDE_MODAL' })}
            className="text-gray-400 hover:text-gray-600 active:text-gray-800 transition-colors"
          >
            <X size={20} />
          </button>
          <h2 className="text-base font-semibold text-gray-900">
            {editingEvent ? '일정 수정' : '새 일정'}
          </h2>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="text-indigo-500 hover:text-indigo-600 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
        </div>

        {/* Category color strip */}
        <div
          className="h-1.5 mx-5 rounded-full mb-4 transition-colors duration-200"
          style={{ backgroundColor: selectedCat?.color || '#E5E7EB' }}
        />

        <div className="px-5 space-y-4 pb-6">
          {/* Title */}
          <div>
            <input
              autoFocus
              type="text"
              placeholder="제목 없음"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full text-xl font-semibold text-gray-900 placeholder-gray-300 border-0 border-b-2 border-gray-100 focus:border-indigo-400 focus:outline-none pb-2 transition-colors"
            />
          </div>

          {/* Category */}
          <Field icon={Tag} label="카테고리">
            <div className="flex flex-wrap gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-150"
                  style={{
                    backgroundColor: categoryId === cat.id ? cat.color : cat.lightBg,
                    color: categoryId === cat.id ? '#fff' : cat.color,
                    border: `1.5px solid ${cat.color}`,
                    transform: categoryId === cat.id ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </Field>

          {/* Date */}
          <Field icon={Calendar} label="날짜">
            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                  if (e.target.value > endDate) setEndDate(e.target.value);
                }}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <span className="text-gray-400 text-sm flex-shrink-0">–</span>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={e => setEndDate(e.target.value)}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </Field>

          {/* All-day toggle */}
          <Field icon={AlarmClock} label="종일 일정">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAllDay(!isAllDay)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                  isAllDay ? 'bg-indigo-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                    isAllDay ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">{isAllDay ? '종일' : '시간 지정'}</span>
            </div>
          </Field>

          {/* Time pickers (only if not all-day) */}
          {!isAllDay && (
            <Field icon={Clock} label="시간">
              <div className="flex gap-2 items-center">
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <span className="text-gray-400 text-sm flex-shrink-0">–</span>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </Field>
          )}

          {/* Notes */}
          <Field icon={AlignLeft} label="메모">
            <textarea
              placeholder="메모를 입력하세요"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </Field>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="w-full py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-semibold text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            {editingEvent ? '수정 완료' : '일정 추가'}
          </button>

          {/* Delete button (edit only) */}
          {editingEvent && (
            <button
              onClick={handleDelete}
              className="w-full py-3 rounded-2xl border border-red-200 text-red-500 hover:bg-red-50 active:bg-red-100 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 size={15} />
              일정 삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
