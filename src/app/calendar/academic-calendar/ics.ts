import { format } from "date-fns";

type IcsEvent = {
  title: string;
  start: Date;
  end?: Date;
  description?: string;
};

function formatDate(date: Date) {
  // All-day event format (no timezone issues)
  return format(date, "yyyyMMdd");
}

export function generateICS(events: IcsEvent[], fileName = "events.ics") {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//School Calendar//EN",
  ];

  events.forEach((event) => {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${crypto.randomUUID()}`,
      `DTSTAMP:${formatDate(new Date())}`,
      `SUMMARY:${event.title}`,
      `DTSTART;VALUE=DATE:${formatDate(event.start)}`,
      `DTEND;VALUE=DATE:${formatDate(
        event.end ?? new Date(event.start.getTime() + 86400000)
      )}`
    );

    if (event.description) {
      lines.push(`DESCRIPTION:${event.description}`);
    }

    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");

  const blob = new Blob([lines.join("\n")], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();

  URL.revokeObjectURL(url);
}
