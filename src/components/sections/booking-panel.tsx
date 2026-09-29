"use client";

import { contact } from "@/content/site";
import {
  firstBookableDate,
  formatSlotLabel,
  introCallUrl,
  isWeekdayDate,
  selectableTimes,
  startTimes,
  toDateInputValue,
} from "@/lib/booking";
import { useId, useState, useSyncExternalStore } from "react";

const fieldClass = "mt-2 w-full border border-muted bg-canvas px-3 py-3 text-base text-ink";

let clockMs = 0;

function subscribeClock(onStoreChange: () => void) {
  const id = window.setInterval(() => {
    clockMs = Date.now();
    onStoreChange();
  }, 60_000);
  return () => window.clearInterval(id);
}

function readClock() {
  if (clockMs === 0) clockMs = Date.now();
  return clockMs;
}

function readServerClock() {
  return 0;
}

function subscribeTimeZone() {
  return () => {};
}

function readTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function readServerTimeZone() {
  return "";
}

export function BookingPanel() {
  const formId = useId();
  const dateId = `${formId}-date`;
  const timeId = `${formId}-time`;
  const dateErrorId = `${dateId}-error`;
  const timeErrorId = `${timeId}-error`;
  const hintId = `${formId}-hint`;
  const noteId = `${formId}-note`;

  const nowMs = useSyncExternalStore(subscribeClock, readClock, readServerClock);
  const timeZone = useSyncExternalStore(subscribeTimeZone, readTimeZone, readServerTimeZone);
  const now = nowMs > 0 ? new Date(nowMs) : null;
  const today = now ? toDateInputValue(now) : "";
  const suggestedDate = now ? firstBookableDate(now) : "";

  const [chosenDate, setChosenDate] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const date = chosenDate ?? suggestedDate;

  const times = date && now ? selectableTimes(date, now) : startTimes();
  const weekdayError = Boolean(date) && !isWeekdayDate(date);
  const noTimes = Boolean(date) && Boolean(now) && isWeekdayDate(date) && times.length === 0;
  const timeStillOffered = time ? times.includes(time) : false;
  const calendarUrl =
    date && time && now && !weekdayError
      ? introCallUrl({
          date,
          time,
          now,
          title: contact.booking.eventTitle,
          add: contact.booking.hostEmail,
          location: contact.booking.location,
          details: contact.booking.details,
        })
      : undefined;

  const dateDescribedBy = [hintId, weekdayError ? dateErrorId : ""].filter(Boolean).join(" ");
  const timeDescribedBy = [hintId, noTimes || (time && !timeStillOffered) ? timeErrorId : ""]
    .filter(Boolean)
    .join(" ");

  function onDateChange(value: string) {
    setChosenDate(value);
    const nextTimes = value ? selectableTimes(value, new Date()) : [];
    setTime((current) => (current && nextTimes.includes(current) ? current : ""));
  }

  function onOpenCalendar(event: { preventDefault(): void }) {
    const url = introCallUrl({
      date,
      time,
      now: new Date(),
      title: contact.booking.eventTitle,
      add: contact.booking.hostEmail,
      location: contact.booking.location,
      details: contact.booking.details,
    });
    if (url) return;
    event.preventDefault();
    setTime("");
    clockMs = Date.now();
  }

  const timezoneText = timeZone
    ? `${contact.booking.timezone} (${timeZone}).`
    : `${contact.booking.timezone}.`;
  const actionClass =
    "mt-6 inline-flex h-12 items-center justify-center bg-accent px-5 text-sm font-medium text-accent-foreground hover:bg-accent-hover";

  return (
    <div role="group" aria-labelledby="booking-heading" className="mt-6 border border-line px-6 py-8 sm:px-8">
      <p className="text-sm text-muted">{contact.booking.constraints}</p>
      <div className="mt-5">
        <label htmlFor={dateId} className="text-sm font-medium text-ink">
          {contact.booking.dateLabel}{" "}
          <span className="font-normal text-muted">{contact.form.required}</span>
        </label>
        <input
          id={dateId}
          type="date"
          value={date}
          min={today || undefined}
          onChange={(event) => onDateChange(event.target.value)}
          required
          aria-required="true"
          aria-invalid={weekdayError ? true : undefined}
          aria-describedby={dateDescribedBy}
          className={fieldClass}
        />
        {weekdayError ? (
          <p id={dateErrorId} role="alert" className="mt-2 text-sm text-ink">
            {contact.booking.chooseWeekday}
          </p>
        ) : null}
      </div>
      <div className="mt-5">
        <label htmlFor={timeId} className="text-sm font-medium text-ink">
          {contact.booking.timeLabel}{" "}
          <span className="font-normal text-muted">{contact.form.required}</span>
        </label>
        <select
          id={timeId}
          value={timeStillOffered ? time : ""}
          onChange={(event) => setTime(event.target.value)}
          disabled={weekdayError || noTimes}
          required
          aria-required="true"
          aria-invalid={noTimes || (Boolean(time) && !timeStillOffered) ? true : undefined}
          aria-describedby={timeDescribedBy}
          className={fieldClass}
        >
          <option value="">{contact.booking.chooseTime}</option>
          {(weekdayError ? startTimes() : times).map((slot) => (
            <option key={slot} value={slot}>
              {formatSlotLabel(slot)}
            </option>
          ))}
        </select>
        {noTimes ? (
          <p id={timeErrorId} role="alert" className="mt-2 text-sm text-ink">
            {contact.booking.noTimesLeft}
          </p>
        ) : time && !timeStillOffered ? (
          <p id={timeErrorId} role="alert" className="mt-2 text-sm text-ink">
            {contact.booking.chooseLaterTime}
          </p>
        ) : null}
      </div>
      <p id={hintId} className="mt-5 text-sm text-muted">
        {timezoneText} {contact.booking.duration}
      </p>
      <p id={noteId} className="mt-3 text-sm text-ink">
        {contact.booking.inviteNote}
      </p>
      {calendarUrl ? (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-describedby={noteId}
          onClick={onOpenCalendar}
          className={actionClass}
        >
          {contact.booking.openCalendar}
          <span className="sr-only"> ({contact.booking.opensNewTab})</span>
        </a>
      ) : (
        <button type="button" disabled aria-describedby={noteId} className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-60`}>
          {contact.booking.openCalendar}
          <span className="sr-only"> ({contact.booking.opensNewTab})</span>
        </button>
      )}
      <noscript>
        <p className="mt-4 text-sm text-ink">{contact.booking.noscript}</p>
      </noscript>
    </div>
  );
}
