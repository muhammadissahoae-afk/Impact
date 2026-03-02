import { addDays, startOfDay } from "date-fns";
import { EVENTS } from "./data";

type EventMeta = {
  event: string;
  highlighted?: boolean;
  special?: boolean;
};

export function getAllCalendarEvents() {
  const tomorrow = startOfDay(addDays(new Date(), 1));

  return Object.entries(EVENTS)
    .filter(([, v]) => v?.event)
    .map(([, meta]) => ({
      title: meta.event,
      start: tomorrow,
      description: 'special' in meta && meta.special ? "Special Event" : undefined,
    }));
}