"use client";
import { useEffect } from "react";
import ToDoCardLogic from "./ToDoCardLogic";
import axios from "axios";
import { useState } from "react";

interface DayCardProps {
  day : string;
  date : string;
  isCurrentDay :boolean
}


export const DayCard = ({ day,  date, isCurrentDay}: DayCardProps ) => {
  const [dayId, setDayId] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState(true);  // Add this line

  useEffect(() => {
    const initializeDay = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/days", { day : day, 
          date : date
         });     
        setDayId(response.data._id);
      } catch (error ) {
        console.error("Failed to initialize day:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
      } finally {
        setIsLoading(false);
      }
    };
    initializeDay();
  }, [day, date]);

  return (
    <div>
      <div className={`bg-semiWhite shadow-xl flex flex-col max-w-[318px] h-[200px] max-h-[200px] overflow-auto text-center ${isCurrentDay ? 'border-2 border-blue-500' : ''}`}>
        <h1 className="text-xl font-bold">{day}</h1>
        <div className="">
          {!isLoading && <ToDoCardLogic dayIdProps={dayId} day={day} />}
        </div>
      </div>
    </div>
  );
};
