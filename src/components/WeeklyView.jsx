import React, { useRef, useEffect } from 'react';
import { format, isToday, parseISO, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../context';
import { getWeekDays, timeToMinutes } from '../calendarUtils';

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];
const HOUR_START = 7;   // 7 AM
const HOUR_END = 23;    // 11 PM
const PX_PER_HOUR = 56; // pixels per hour slot
const TOTAL_HOURS = HOUR_END - HOUR_START;
const TOTAL_HEIGHT = TOTAL_HOURS * PX_PER_HOUR;
const TIME_COL_W = 40;  // px for the time label column

function minutesToPx(minutes) {
  return ((minutes - HOUR_START * 60) / 60) * PX_PER_HOUR;
}

export default function WeeklyView() {
  const { state, dispatch } = useApp();
  const { currentDate, events, categories } = state;
  const scrollRef = useRef(null);

  const days = getWeekDays(currentDate);
  const weekLabel = `${format(days[0], 'M.d')} – ${format(days[6], 'M.d')}`;

  const getCat = (id) => categories.find(c => c.id === id);

  // Scroll to 8am on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = PX_PER_HOUR * (8 - HOUR_START);
    }
  }, []);

  // Separate all-day vs timed events for the week
  const allDayEvents = events.filter(ev => {
    if (!ev.isAllDay) return false;
    const eStart = parseISO(ev.startDate);
    const eEnd = parseISO(ev.endDate || ev.startDate);
    return days.some(d => {
      const ds = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const es = new Date(eStart.getFullYear(), eStart.getMonth(), eStart.getDate());
      const ee = new Date(eEnd.getFullYear(), eEnd.getMonth(), eEnd.getDate());
      return ds >= es && ds <= ee;
    });
  });

  // Group timed events by day
  const timedByDay = days.map(day =>
    events.filter(ev => {
      if (ev.isAllDay || !ev.startTime) return false;
      const evDay = parseISO(ev.startDate);
      return isSameDay(evDay, day);
    })
  );

  const hours = Array.from({ length: TOTAL_HOURS }, (_, i) => HOUR_START + i);

  // Current time indicator
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const nowTop = minutesToPx(nowMinutes);
  const showNow = nowMinutes >= HOUR_START * 60 && nowMinutes < HOUR_END * 60;

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
          {weekLabel}
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

      {/* Day headers */}
      <div className="flex border-b border-gray-100 bg-white" style={{ paddingLeft: `${TIME_COL_W}px` }}>
        {days.map((day, di) => {
          const today = isToday(day);
          return (
            <div key={di} className="flex-1 flex flex-col items-center py-1.5">
              <span
                className={`text-[10px] font-medium mb-0.5 ${
                  di === 0 ? 'text-rose-400' : di === 6 ? 'text-sky-400' : 'text-gray-400'
                }`}
              >
                {DAY_NAMES[di]}
              </span>
              <span
                className={`w-7 h-7 flex items-center justify-center text-sm font-semibold rounded-full leading-none ${
                  today ? 'bg-indigo-500 text-white' : 'text-gray-800'
                }`}
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        })}
      </div>

      {/* All-day events row */}
      {allDayEvents.length > 0 && (
        <div className="flex border-b border-gray-100 bg-gray-50 min-h-[32px]" style={{ paddingLeft: `${TIME_COL_W}px` }}>
          {days.map((day, di) => {
            const dayAllDay = allDayEvents.filter(ev => {
              const eStart = parseISO(ev.startDate);
              const eEnd = parseISO(ev.endDate || ev.startDate);
              const ds = new Date(day.getFullYear(), day.getMonth(), day.getDate());
              const es = new Date(eStart.getFullYear(), eStart.getMonth(), eStart.getDate());
              const ee = new Date(eEnd.getFullYear(), eEnd.getMonth(), eEnd.getDate());
              return ds >= es && ds <= ee;
            });
            return (
              <div key={di} className="flex-1 flex flex-col gap-0.5 py-1 px-0.5 overflow-hidden">
                {dayAllDay.slice(0, 2).map(ev => {
                  const cat = getCat(ev.categoryId);
                  return (
                    <div
                      key={ev.id}
                      className="rounded-[3px] px-1 overflow-hidden cursor-pointer"
                      style={{ backgroundColor: cat?.color || '#A0AEC0', height: '14px' }}
                      onClick={() => dispatch({ type: 'SHOW_EDIT_EVENT', payload: ev })}
                    >
                      <span className="text-white text-[9px] font-medium leading-none truncate block">{ev.title}</span>
                    </div>
                  );
                })}
                {dayAllDay.length > 2 && (
                  <span className="text-[9px] text-gray-400 font-semibold pl-1">+{dayAllDay.length - 2}</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Time grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto relative">
        <div className="relative" style={{ height: `${TOTAL_HEIGHT}px`, minHeight: `${TOTAL_HEIGHT}px` }}>
          {/* Hour lines + labels */}
          {hours.map(hour => (
            <div
              key={hour}
              className="absolute w-full flex"
              style={{ top: `${(hour - HOUR_START) * PX_PER_HOUR}px` }}
            >
              <div
                className="flex-shrink-0 flex items-start justify-end pr-2 text-[10px] text-gray-400 font-medium"
                style={{ width: `${TIME_COL_W}px`, paddingTop: '1px' }}
              >
                {hour === 12 ? '오후 12' : hour > 12 ? `오후 ${hour - 12}` : `오전 ${hour}`}
              </div>
              <div className="flex-1 border-t border-gray-100" />
            </div>
          ))}

          {/* Day columns */}
          <div
            className="absolute inset-0 flex"
            style={{ left: `${TIME_COL_W}px` }}
          >
            {days.map((day, di) => {
              const dayEvents = timedByDay[di];
              return (
                <div key={di} className="flex-1 relative border-l border-gray-100 first:border-l-0">
                  {dayEvents.map(ev => {
                    const cat = getCat(ev.categoryId);
                    const color = cat?.color || '#A0AEC0';
                    const startMin = timeToMinutes(ev.startTime);
                    const endMin = timeToMinutes(ev.endTime || ev.startTime);
                    const duration = Math.max(30, endMin - startMin);
                    const top = minutesToPx(startMin);
                    const height = (duration / 60) * PX_PER_HOUR;

                    if (top < 0 || top > TOTAL_HEIGHT) return null;

                    return (
                      <div
                        key={ev.id}
                        className="absolute left-0.5 right-0.5 rounded-lg px-2 py-1 cursor-pointer overflow-hidden shadow-sm"
                        style={{
                          top: `${top}px`,
                          height: `${height - 2}px`,
                          backgroundColor: color,
                          minHeight: '20px',
                        }}
                        onClick={() => dispatch({ type: 'SHOW_EDIT_EVENT', payload: ev })}
                      >
                        <p className="text-white text-[11px] font-semibold leading-tight truncate">{ev.title}</p>
                        {height > 32 && (
                          <p className="text-white text-[10px] opacity-80 leading-tight mt-0.5">
                            {ev.startTime}{ev.endTime ? ` – ${ev.endTime}` : ''}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Current time indicator */}
          {showNow && (
            <div
              className="absolute pointer-events-none z-10"
              style={{ top: `${nowTop}px`, left: `${TIME_COL_W - 4}px`, right: 0 }}
            >
              <div className="relative flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 -ml-1" />
                <div className="flex-1 h-[1.5px] bg-red-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
