// src/app/components/WeekView.tsx

"use client";
import { useState, useEffect } from "react";
import { DayCard } from "./DayCard";
import { generateWeekDates, isInCurrentWeek } from "../../utils/dateHelper";

const WeekView = () => {
  const [weekDates, setWeekDates] = useState<WeekDay[]>([]);

  useEffect(() => {
    // Initial generation of week dates
    setWeekDates(generateWeekDates());

    // Check if we need to refresh the week block
    const checkWeekBlock = () => {
      const today = new Date();
      if (!isInCurrentWeek(today)) {
        setWeekDates(generateWeekDates());
      }
    };

    // Check every day at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    // Set initial timeout for next midnight
    const timeout = setTimeout(() => {
      checkWeekBlock();
      // Then set up daily interval
      const interval = setInterval(checkWeekBlock, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="text-black">
      <div className="week-info">
        <span>Week of {weekDates[0]?.formattedDate}</span>
      </div>
      <div className="flex flex-wrap gap-10">
        {weekDates.map((dayData) => (
          <DayCard
            key={dayData.formattedDate}
            day={dayData.dayName}
            date={dayData.formattedDate}
            isCurrentDay={dayData.isCurrentDay}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
