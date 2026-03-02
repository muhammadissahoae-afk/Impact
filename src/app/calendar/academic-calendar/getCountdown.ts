import {
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInCalendarDays,
  isAfter,
} from "date-fns";

type CalendarEvent = {
  title: string;
  date: Date;
};
function getCountdown(targetDate: Date) {
  const now = new Date();
  if (!isAfter(targetDate, now)) return { months: 0, weeks: 0, days: 0 };

  const months = differenceInCalendarMonths(targetDate, now);
  const weeks = differenceInCalendarWeeks(targetDate, now) % 4;
  const days = differenceInCalendarDays(targetDate, now) % 7;

  return { months, weeks, days };
}

function getNextEvent(events: CalendarEvent[]): CalendarEvent | null {
  const now = new Date();
  const upcoming = events
    .filter((e) => e.date > now)
    .sort((a, b) => +a.date - +b.date);
  return upcoming[0] || null;
}

export { getCountdown, getNextEvent };
