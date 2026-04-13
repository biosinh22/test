import React from 'react';
import { format, isSameMonth, isToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../context';
import { getCalendarWeeks, getWeekEventLayout } from '../calendarUtils';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const EVENT_ROW_H = 20; // px per event slot
const MAX_ROWS = 3;

export default function MonthlyCalendar() {
  const { state, dispatch } = useApp();
  const { currentDate, events, categories } = state;

  const weeks = getCalendarWeeks(currentDate);

  const getCat = (id) => categories.find(c => c.id === id);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 bg-white">
        <button
          onClick={() => dispatch({ type: 'PREV_PERIOD' })}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <ChevronLeft size={18} className="text-gray-500" />
        </button>

        <button
          onClick={() => dispatch({ type: 'GO_TODAY' })}
          className="text-base font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
        >
          {format(currentDate, 'yyyy년 M월')}
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => dispatch({ type: 'NEXT_PERIOD' })}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
          >
            <ChevronRight size={18} className="text-gray-500" />
          </button>
          <button
            onClick={() => dispatch({ type: 'SHOW_ADD_EVENT' })}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus size={16} className="text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Day name headers */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-white">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`py-1.5 text-center text-xs font-medium tracking-wide ${
              i === 0 ? 'text-rose-400' : i === 6 ? 'text-sky-400' : 'text-gray-400'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar weeks */}
      <div className="flex-1 overflow-y-auto">
        {weeks.map((week, wi) => {
          const weekStart = week[0];
          const weekEnd = week[6];
          const { layout, overflow } = getWeekEventLayout(events, weekStart, weekEnd, MAX_ROWS);

          return (
            <div key={wi} className="border-b border-gray-100 last:border-0">
              {/* Day number row */}
              <div className="grid grid-cols-7">
                {week.map((day, di) => {
                  const inMonth = isSameMonth(day, currentDate);
                  const today = isToday(day);

                  let numClass = 'text-gray-800';
                  if (!inMonth) numClass = 'text-gray-300';
                  else if (di === 0) numClass = 'text-rose-400';
                  else if (di === 6) numClass = 'text-sky-400';

                  return (
                    <div
                      key={di}
                      className="flex flex-col items-center pt-1.5 pb-0.5 cursor-pointer active:bg-gray-50"
                      onClick={() => dispatch({ type: 'SHOW_ADD_EVENT', payload: day })}
                    >
                      <span
                        className={`w-6 h-6 flex items-center justify-center text-xs font-medium rounded-full leading-none
                          ${today ? 'bg-indigo-500 text-white font-semibold' : numClass}`}
                      >
                        {format(day, 'd')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Event bars area */}
              <div
                className="relative mx-0"
                style={{ height: `${MAX_ROWS * EVENT_ROW_H + 6}px` }}
              >
                {layout.map(({ event, row, colStart, span }) => {
                  const cat = getCat(event.categoryId);
                  const color = cat?.color || '#A0AEC0';
                  return (
                    <div
                      key={event.id}
                      title={event.title}
                      className="absolute flex items-center rounded-[3px] px-1.5 cursor-pointer overflow-hidden select-none"
                      style={{
                        height: `${EVENT_ROW_H - 3}px`,
                        left: `calc(${(colStart / 7) * 100}% + 1px)`,
                        width: `calc(${(span / 7) * 100}% - 2px)`,
                        top: `${row * EVENT_ROW_H + 2}px`,
                        backgroundColor: color,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'SHOW_EDIT_EVENT', payload: event });
                      }}
                    >
                      <span className="text-white text-[10px] font-medium truncate leading-none">
                        {!event.isAllDay && event.startTime && (
                          <span className="opacity-80 mr-1">{event.startTime}</span>
                        )}
                        {event.title}
                      </span>
                    </div>
                  );
                })}

                {/* Overflow indicators */}
                {Object.entries(overflow).map(([col, count]) => (
                  <div
                    key={`ovf-${col}`}
                    className="absolute text-[9px] font-semibold text-gray-400 flex items-center"
                    style={{
                      left: `calc(${(parseInt(col) / 7) * 100}% + 3px)`,
                      width: `${(1 / 7) * 100}%`,
                      top: `${MAX_ROWS * EVENT_ROW_H + 1}px`,
                    }}
                  >
                    +{count}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
