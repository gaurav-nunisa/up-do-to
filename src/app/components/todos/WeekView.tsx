// src/app/components/WeekView.tsx

"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { DayCard } from "./DayCard";
import { generateWeekDates, isInCurrentWeek } from "../../utils/dateHelper"
import { getWeekBoundaries } from "../../utils/dateHelper";

const WeekView = () => {
  const [weekDates, setWeekDates] = useState<[]>([]);

  useEffect(() => {
    const initializeWeek = async () => {
      const today = new Date();
      const { startOfWeek, endOfWeek } = getWeekBoundaries(today);

      // Check if the current date is within the existing week
      if (!isInCurrentWeek(today)) {
        try {
             // First check if a week exists for these dates
          const response = await axios.get('/api/weeks/check', {
            params: {
              startDate: startOfWeek.toISOString(),
              endDate: endOfWeek.toISOString()
            }
          });
  
          // Only create a new week if one doesn't exist
          if (!response.data.exists) {
            const defaultWeekData = {
              totalTask: 0,
              completedTask: 0,
              uncompletedTask: 0,
              startDate: startOfWeek,
              endDate: endOfWeek
            };
            await axios.post("/api/weeks/transition", defaultWeekData);
          }
        } catch (error) {
          console.error("Failed to transition week:", error);
        }
      }

      // Generate and set the current week's dates
      setWeekDates(generateWeekDates());
    };

    const checkWeekBlock = () => {
      const today = new Date();
      if (!isInCurrentWeek(today)) {
        setWeekDates(generateWeekDates());
      }
    };

    // Initial setup
    initializeWeek();

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
