import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addDays,
} from "date-fns";

export type CalendarDay = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  highlighted?: boolean;
  special?: boolean;
  events?: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateCalendar(month: Date, events: Record<string, any> = {}) {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });

  const days: Date[] = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    const week: CalendarDay[] = days.slice(i, i + 7).map((date) => {
      const key = format(date, "yyyy-MM-dd");
      const meta = events[key];

      // Generate fake events for demo
      const fakeEvents: string[] = [];
      if (date.getDate() % 3 === 0 && date.getMonth() === month.getMonth()) {
        fakeEvents.push(`Event A on ${date.getDate()}`);
      }
      if (date.getDate() % 5 === 0 && date.getMonth() === month.getMonth()) {
        fakeEvents.push(`Event B on ${date.getDate()}`);
      }

      return {
        date,
        day: date.getDate(),
        isCurrentMonth: date.getMonth() === month.getMonth(),
        highlighted: meta?.highlighted,
        special: meta?.special,
        events: meta?.events ?? fakeEvents,
      };
    });

    weeks.push(week);
  }

  return weeks;
}
