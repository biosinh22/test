import {
  startOfMonth, endOfMonth,
  startOfWeek, endOfWeek,
  eachDayOfInterval,
  addDays,
  isAfter, isBefore,
  differenceInDays,
  parseISO,
} from 'date-fns';

/** Returns array of weeks (each week = array of 7 Date objects) for the monthly view */
export function getCalendarWeeks(date) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday start
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const allDays = eachDayOfInterval({ start: calStart, end: calEnd });
  const weeks = [];
  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }
  return weeks;
}

/** Returns 7 days starting from Sunday of the week containing `date` */
export function getWeekDays(date) {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start: weekStart, end: addDays(weekStart, 6) });
}

/**
 * Compute layout for events within a single calendar week row.
 * Returns { layout, overflow }
 *   layout: array of { event, row, colStart, span }
 *   overflow: object { col (0-6): count of hidden events affecting that column }
 */
export function getWeekEventLayout(events, weekStart, weekEnd, maxRows = 3) {
  const weekStartDay = startOfDay(weekStart);
  const weekEndDay = startOfDay(weekEnd);

  // Filter events overlapping this week
  const weekEvents = events.filter(event => {
    const eStart = startOfDay(parseISO(event.startDate));
    const eEnd = startOfDay(parseISO(event.endDate || event.startDate));
    return !isAfter(eStart, weekEndDay) && !isBefore(eEnd, weekStartDay);
  });

  // Sort: longer events first, then by start date
  weekEvents.sort((a, b) => {
    const aStart = parseISO(a.startDate);
    const aEnd = parseISO(a.endDate || a.startDate);
    const bStart = parseISO(b.startDate);
    const bEnd = parseISO(b.endDate || b.startDate);

    const aColStart = Math.max(0, differenceInDays(startOfDay(aStart), weekStartDay));
    const aColEnd = Math.min(6, differenceInDays(startOfDay(aEnd), weekStartDay));
    const bColStart = Math.max(0, differenceInDays(startOfDay(bStart), weekStartDay));
    const bColEnd = Math.min(6, differenceInDays(startOfDay(bEnd), weekStartDay));

    const aSpan = aColEnd - aColStart + 1;
    const bSpan = bColEnd - bColStart + 1;

    if (bSpan !== aSpan) return bSpan - aSpan;
    return aStart - bStart;
  });

  // Assign rows using interval scheduling
  const rowOccupancy = []; // rowOccupancy[rowIndex] = [{start, end}]
  const allLayout = [];

  for (const event of weekEvents) {
    const eStart = startOfDay(parseISO(event.startDate));
    const eEnd = startOfDay(parseISO(event.endDate || event.startDate));

    const colStart = Math.max(0, differenceInDays(eStart, weekStartDay));
    const colEnd = Math.min(6, differenceInDays(eEnd, weekStartDay));
    const span = Math.max(1, colEnd - colStart + 1);

    let row = 0;
    while (true) {
      if (!rowOccupancy[row]) rowOccupancy[row] = [];
      const conflicts = rowOccupancy[row].some(
        ({ start, end }) => !(colEnd < start || colStart > end)
      );
      if (!conflicts) {
        rowOccupancy[row].push({ start: colStart, end: colEnd });
        break;
      }
      row++;
    }

    allLayout.push({ event, row, colStart, span });
  }

  // Calculate overflow per column for hidden rows
  const overflow = {};
  for (const { row, colStart, span } of allLayout) {
    if (row >= maxRows) {
      for (let col = colStart; col < colStart + span; col++) {
        overflow[col] = (overflow[col] || 0) + 1;
      }
    }
  }

  return {
    layout: allLayout.filter(({ row }) => row < maxRows),
    overflow,
  };
}

/** Get timed (non-all-day) events for a specific day */
export function getTimedEventsForDay(events, day) {
  const dayStart = startOfDay(day);
  return events.filter(event => {
    if (event.isAllDay) return false;
    const eDate = startOfDay(parseISO(event.startDate));
    return eDate.getTime() === dayStart.getTime();
  });
}

/** Get all-day events for a specific day */
export function getAllDayEventsForDay(events, day) {
  const dayStart = startOfDay(day);
  return events.filter(event => {
    if (!event.isAllDay) return false;
    const eStart = startOfDay(parseISO(event.startDate));
    const eEnd = startOfDay(parseISO(event.endDate || event.startDate));
    return !isAfter(eStart, dayStart) && !isBefore(eEnd, dayStart);
  });
}

/** Convert time string "HH:MM" to minutes from midnight */
export function timeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
