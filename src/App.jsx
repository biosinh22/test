import React from 'react';
import { AppProvider, useApp } from './context';
import MonthlyCalendar from './components/MonthlyCalendar';
import WeeklyView from './components/WeeklyView';
import TodoView from './components/TodoView';
import EventModal from './components/EventModal';

// Tab bar icons as inline SVG to avoid import issues
function CalendarMonthIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <rect x="7" y="14" width="2" height="2" />
      <rect x="11" y="14" width="2" height="2" />
      <rect x="15" y="14" width="2" height="2" />
    </svg>
  );
}

function CalendarWeekIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="7" y1="14" x2="7" y2="19" />
      <line x1="12" y1="14" x2="12" y2="19" />
      <line x1="17" y1="14" x2="17" y2="19" />
    </svg>
  );
}

function ChecklistIcon({ size = 22, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

const TABS = [
  { id: 'monthly', label: '월간', Icon: CalendarMonthIcon },
  { id: 'weekly',  label: '주간', Icon: CalendarWeekIcon },
  { id: 'todos',   label: '할 일', Icon: ChecklistIcon },
];

function TabBar() {
  const { state, dispatch } = useApp();
  const { currentView } = state;

  return (
    <div className="flex-shrink-0 bg-white border-t border-gray-100 flex items-stretch" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      {TABS.map(({ id, label, Icon }) => {
        const active = currentView === id;
        return (
          <button
            key={id}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: id })}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors relative ${
              active ? 'text-indigo-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} className={active ? 'text-indigo-500' : 'text-gray-400'} />
            <span className={`text-[10px] font-semibold ${active ? 'text-indigo-500' : 'text-gray-400'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AppShell() {
  const { state } = useApp();
  const { currentView, showModal } = state;

  return (
    <div className="flex flex-col h-full max-w-[430px] mx-auto bg-white relative overflow-hidden shadow-2xl">
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {currentView === 'monthly' && <MonthlyCalendar />}
        {currentView === 'weekly'  && <WeeklyView />}
        {currentView === 'todos'   && <TodoView />}
      </div>

      {/* Tab bar */}
      <TabBar />

      {/* Event modal (full screen overlay) */}
      {showModal && <EventModal />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
