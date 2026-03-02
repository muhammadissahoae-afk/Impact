"use client";

import { format, addMonths, subMonths, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { generateCalendar } from "./utils";
import { MONTH_DATE, EVENTS, DAYS_OF_WEEK } from "./data";
import { generateICS } from "./ics";
import { getAllCalendarEvents } from "./calendar-to-ics";

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getCountdown } from "./getCountdown";
import { EventsModal } from "./modal";

import kids from "@/../public/images/background/childrensBG.png";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Main from "@/components/Main";
import MainAdmissions from "@/components/MainAdmissions";
import Footer from "@/components/layout/footer/Footer";
import { Metadata } from "next";
import PrimaryButton from "@/components/PrimaryButton";
import styles from "./style.module.css";
/* ---------------------------------- DATA --------------------------------- */
// export const metadata: Metadata = {
//   title: "Academic Calendar",
//   description: "Impact American School",
// };

type CalendarEvent = {
  title: string;
  date: Date;
};
const EVENTS_COUNTER: CalendarEvent[] = [
  {
    title: "UAE National Day",
    date: new Date(2026, 11, 2),
  },
];
function getNextEvent(events: CalendarEvent[]) {
  const now = new Date();

  return events
    .filter((e) => e.date > now)
    .sort((a, b) => +a.date - +b.date)[0];
}

const eventImages = [kids.src, kids.src, kids.src];

const filterOptions = [
  { id: "on-site-trips", label: "On Site Trips", checked: false },
  { id: "examinations", label: "Examinations and Assignments", checked: false },
  { id: "events", label: "Events", checked: true },
  { id: "high-school", label: "High School", checked: false },
  { id: "middle-school", label: "Middle School", checked: false },
  { id: "elementary-school", label: "Elementary School", checked: false },
  { id: "kinder-garden", label: "Kinder Garden", checked: false },
];

/* ---------------------------- CALENDAR SECTION ---------------------------- */

function CalendarAndEventsSection() {
  const [currentMonth, setCurrentMonth] = useState(MONTH_DATE);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDay, setModalDay] = useState<Date | null>(null);
  const [modalEvents, setModalEvents] = useState<string[]>([]);
  const calendarWeeks = useMemo(
    () => generateCalendar(currentMonth, EVENTS),
    [currentMonth]
  );
  const nextEvent = useMemo(() => getNextEvent(EVENTS_COUNTER), []);
  const [countdown, setCountdown] = useState(() =>
    nextEvent ? getCountdown(nextEvent.date) : null
  );

  useEffect(() => {
    if (!nextEvent) return;

    const interval = setInterval(() => {
      setCountdown(getCountdown(nextEvent.date));
    }, 60_000); // update every minute

    return () => clearInterval(interval);
  }, [nextEvent]);
  const goPrevMonth = () => {
    setDirection(-1);
    setCurrentMonth((m) => subMonths(m, 1));
  };

  const goNextMonth = () => {
    setDirection(1);
    setCurrentMonth((m) => addMonths(m, 1));
  };
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setDirection(-1);
        setCurrentMonth((m) => subMonths(m, 1));
      }

      if (e.key === "ArrowRight") {
        setDirection(1);
        setCurrentMonth((m) => addMonths(m, 1));
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return (
    <section className="flex flex-col w-full gap-[30px]">
      {/* Calendar */}
      <Card className="w-full bg-[#e9eef3] rounded-[25px] border-0">
        <CardContent className="p-[46px] pt-[37px] flex  flex-col gap-6 ">
          <div className="flex items-center justify-between mb-[31px]">
            <h2 className="font-light text-i-primary text-[26px] tracking-[-0.41px]">
              {format(currentMonth, "MMMM yyyy")}
            </h2>

            <div className="flex gap-[19px]">
              <button
                onClick={goPrevMonth}
                className="w-8 h-8 hover:opacity-70 transition-opacity"
              >
                <ArrowLeft color="var(--color-i-primary)" />
              </button>
              <button
                onClick={goNextMonth}
                className="w-8 h-8 hover:opacity-70 transition-opacity"
              >
                <ArrowRight color="var(--color-i-primary)" />
              </button>
            </div>
          </div>

          <div className="w-full h-px bg-i-primary mb-[31px]" />

          {/* Days Header */}
          <div className="hidden sm:grid grid-cols-7 gap-x-2 md:gap-x-[70px] mb-[23px]">
            {DAYS_OF_WEEK.map((day) => (
              <div
                key={day}
                className="text-center text-base font-normal uppercase font-light text-i-primary"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="relative w-full overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={format(currentMonth, "yyyy-MM")}
                initial={{ opacity: 0, x: direction * 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -300 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid grid-cols-7 gap-2.5"
              >
                {calendarWeeks.map((week) =>
                  week.map((day) => (
                    <div
                      key={day.date.toISOString()}
                      className={`flex flex-col items-center justify-center rounded-[10px]
          ${day.special ? "bg-[#d10005]" : "bg-white"}
          ${day.highlighted && !day.special ? "border border-[#d10005]" : ""}
          ${isToday(day.date) ? "ring-2 ring-[#022b52]/40" : ""}
           sm:h-[88px] sm:pt-3.5 p-2
          ${!day.isCurrentMonth ? "opacity-30 pointer-events-none" : ""}
          cursor-pointer`}
                      onClick={() => {
                        setModalDay(day.date);
                        setModalEvents(day.events ?? []);
                        setModalOpen(true);
                      }}
                    >
                      <div
                        className={`text-base text-center ${
                          day.special ? "text-background" : "text-i-primary"
                        }`}
                      >
                        {day.day}
                      </div>

                      {/* Star icon if there are events */}
                      {day.events && day.events.length > 0 && (
                        <div className="mt-1 text-i-primary text-xl">★</div>
                      )}
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className=" flex flex-col sm:flex-row gap-4 justify-between">
            <PrimaryButton
              onClick={() =>
                generateICS(getAllCalendarEvents(), "school-events.ics")
              }
            >
              Download Date to Calendar
            </PrimaryButton>

            <PrimaryButton
              onClick={() =>
                generateICS(getAllCalendarEvents(), "school-events.ics")
              }
            >
              Download Table
            </PrimaryButton>
          </div>
        </CardContent>
      </Card>

      {/* Latest Event */}
      <Card className="w-full bg-i-bg-alt rounded-[25px] border border-solid border-transparent">
        <CardContent className="p-9">
          <div className="flex flex-col lg:flex-row items-start justify-between">
            <div>
              <div className="text-i-primary font-light text-[18px] tracking-[-0.90px] mb-2">
                Up coming event
              </div>

              <h3 className="font-light text-i-primary text-[26px] tracking-[-1.30px] mb-[34px]">
                {nextEvent?.title}
              </h3>

              <PrimaryButton>Save Date</PrimaryButton>
            </div>

            {countdown && (
              <div className="flex flex-wrap gap-[66px] mt-[30px]">
                {/* MONTHS */}
                <div className="flex flex-col gap-[21px] justify-between">
                  <div className="[font-family:'Roboto',Helvetica] font-thin text-i-primary text-6xl text-center tracking-[-3.00px]">
                    {countdown.months}
                  </div>
                  <div className="[font-family:'Roboto',Helvetica] font-light text-i-primary text-base text-center tracking-[-0.80px]">
                    MONTHS
                  </div>
                </div>

                {/* WEEKS */}
                <div className="flex flex-col gap-[21px] justify-between">
                  <div className="[font-family:'Roboto',Helvetica] font-thin text-i-primary text-6xl text-center tracking-[-3.00px]">
                    {countdown.weeks}
                  </div>
                  <div className="[font-family:'Roboto',Helvetica] font-light text-i-primary text-base text-center tracking-[-0.80px]">
                    WEEKS
                  </div>
                </div>

                {/* DAYS (your gradient style preserved) */}
                <div className="flex flex-col gap-[21px] justify-between ">
                  <div className="[font-family:'Roboto',Helvetica] font-thin text-i-primary text-6xl">
                    {countdown.days}
                  </div>
                  <div className="[font-family:'Roboto',Helvetica] font-light text-i-primary text-base text-center tracking-[-0.80px]">
                    DAYS
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className={`${styles.box} ${styles.hiddenForDesktop}`}>
        <p className="">Download All Events to Your Calendar</p>
        <p className={styles.smallText}>
          Dowload all events to your calendar to stay on track of your childs
          events and examinations.
        </p>
        <PrimaryButton bg="white">Download All</PrimaryButton>
      </div>

      {/* Events Gallery */}
      <Card className="w-full bg-[#e9eef3] rounded-[25px] border-0">
        <CardContent className="p-[37px]">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-[33px]">
            <h3 className="font-light text-i-primary text-[26px]">
              UAE National Day
            </h3>

            {/* <Button className=" px-4 py-6 bg-i-primary rounded-[26.5px]">
              View All Events
            </Button> */}
            <PrimaryButton>View All Events</PrimaryButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {eventImages.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-[244px] object-cover rounded-[15px]"
                alt="Event"
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <EventsModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        date={modalDay}
        events={modalEvents}
      />
    </section>
  );
}

/* ---------------------------- FILTERS SECTION ----------------------------- */

function QuickFiltersSection() {
  return (
    <section className="flex flex-col w-full xl:max-w-[318px] gap-[66px]">
      <div>
        <h2 className="text-sm font-normal text-i-primary mb-7">
          QUICK FILTERS
        </h2>

        <div className="flex flex-col gap-[25px]">
          {filterOptions.map((o) => (
            <div key={o.id} className="flex items-center gap-5">
              <Checkbox id={o.id} defaultChecked={o.checked} />
              <Label
                htmlFor={o.id}
                className="text-base font-light text-i-primary"
              >
                {o.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.box} ${styles.hiddenForMobile}`}>
        <p className="">Download All Events to Your Calendar</p>
        <p className={styles.smallText}>
          Dowload all events to your calendar to stay on track of your childs
          events and examinations.
        </p>
        <PrimaryButton bg="white">Check BMI</PrimaryButton>
      </div>
    </section>
  );
}

/* --------------------------------- PAGE ---------------------------------- */
const body = (
  <div className=" w-full ">
    <div className="flex  pb-5 md:pb-25 flex-col lg:flex-row px-12.5 gap-16 xl:gap-[154px] w-full">
      <QuickFiltersSection />
      <CalendarAndEventsSection />
    </div>
    <Footer />
  </div>
);
export default function FrameScreen() {
  return (
    <Main
      borderType="radios"
      button1="Calendar"
      button2="Register Now"
      backgroundUp=""
      title="Mark Your Moments: School Events & Key Dates"
      body={body}
      navVariant="light"
      className="w-full bg-i-bg-2 "
    />
  );
}
