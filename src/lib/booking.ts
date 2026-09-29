/**
 * Builds a Google Calendar template link for a visitor-chosen intro call.
 * The chosen time is not sent to this site.
 */

const GOOGLE_CALENDAR_TEMPLATE = "https://calendar.google.com/calendar/render";

/** Proposed start times are weekdays in this local window. Not live availability. */
export const BOOKING_SLOT_MINUTES = 30;
const DAY_START_MINUTES = 9 * 60;
const DAY_END_MINUTES = 17 * 60;

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const TIME_PATTERN = /^(\d{2}):(\d{2})$/;

export function startTimes(): readonly string[] {
  const times: string[] = [];
  for (
    let minute = DAY_START_MINUTES;
    minute + BOOKING_SLOT_MINUTES <= DAY_END_MINUTES;
    minute += BOOKING_SLOT_MINUTES
  ) {
    const hour = Math.floor(minute / 60);
    const mins = minute % 60;
    times.push(`${String(hour).padStart(2, "0")}:${String(mins).padStart(2, "0")}`);
  }
  return times;
}

export function formatSlotLabel(time: string): string {
  const match = TIME_PATTERN.exec(time);
  if (!match) return time;
  const hour = Number(match[1]);
  const minute = match[2];
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Local start instant for a YYYY-MM-DD date and HH:MM time, or nothing if invalid. */
export function slotStart(date: string, time: string): Date | undefined {
  const dateMatch = DATE_PATTERN.exec(date);
  const timeMatch = TIME_PATTERN.exec(time);
  if (!dateMatch || !timeMatch) return undefined;

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  if (month < 1 || month > 12 || day < 1 || day > 31 || hour > 23 || minute > 59) return undefined;

  const start = new Date(year, month - 1, day, hour, minute, 0, 0);
  if (
    start.getFullYear() !== year ||
    start.getMonth() !== month - 1 ||
    start.getDate() !== day ||
    start.getHours() !== hour ||
    start.getMinutes() !== minute
  ) {
    return undefined;
  }
  return start;
}

export function isWeekdayDate(date: string): boolean {
  const start = slotStart(date, "12:00");
  if (!start) return false;
  const day = start.getDay();
  return day !== 0 && day !== 6;
}

export function isSlotInFuture(date: string, time: string, now: Date): boolean {
  const start = slotStart(date, time);
  if (!start) return false;
  return start.getTime() > now.getTime();
}

export function selectableTimes(date: string, now: Date): readonly string[] {
  if (!isWeekdayDate(date)) return [];
  return startTimes().filter((time) => isSlotInFuture(date, time, now));
}

export function firstBookableDate(now: Date): string {
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  for (let i = 0; i < 21; i += 1) {
    const iso = toDateInputValue(cursor);
    if (selectableTimes(iso, now).length > 0) return iso;
    cursor.setDate(cursor.getDate() + 1);
  }
  return toDateInputValue(cursor);
}

export function toGoogleUtc(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hour = String(date.getUTCHours()).padStart(2, "0");
  const minute = String(date.getUTCMinutes()).padStart(2, "0");
  const second = String(date.getUTCSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

/**
 * Official Google Calendar template URL.
 * `dates` is the 30-minute range in UTC. `add` is the guest to invite.
 */
export function googleCalendarTemplateUrl(input: {
  title: string;
  start: Date;
  end: Date;
  add: string;
  location: string;
  details: string;
}): string {
  const dates = `${toGoogleUtc(input.start)}/${toGoogleUtc(input.end)}`;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: input.title,
    add: input.add,
    location: input.location,
    details: input.details,
  });
  return `${GOOGLE_CALENDAR_TEMPLATE}?${params.toString()}&dates=${dates}`;
}

export function introCallUrl(input: {
  date: string;
  time: string;
  now: Date;
  title: string;
  add: string;
  location: string;
  details: string;
}): string | undefined {
  if (!isWeekdayDate(input.date) || !isSlotInFuture(input.date, input.time, input.now)) return undefined;
  const start = slotStart(input.date, input.time);
  if (!start) return undefined;
  if (!startTimes().includes(input.time)) return undefined;
  const end = new Date(start.getTime() + BOOKING_SLOT_MINUTES * 60_000);
  return googleCalendarTemplateUrl({
    title: input.title,
    start,
    end,
    add: input.add,
    location: input.location,
    details: input.details,
  });
}
