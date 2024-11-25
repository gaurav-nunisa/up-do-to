"use client";
import { useEffect } from "react";
import ToDoCardLogic from "./ToDoCardLogic";
import axios from "axios";
import { useState } from "react";


export const DayCard = ({ day, index , todos}: { day: string; index: number }) => {
  const [dayId, setDayId] = useState<string>("");
  
  const [isLoading, setIsLoading] = useState(true);  // Add this line

  useEffect(() => {
    const initializeDay = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post("/api/days", { day : day });     
        setDayId(response.data._id);
      } catch (error : any) {
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
  }, [day]);

  return (
    <div>
      <div className="bg-semiWhite shadow-xl flex flex-col max-w-[318px] h-[200px] max-h-[200px] overflow-auto  text-center  ">
        <h1 className="text-xl font-bold">{day}</h1>
        <div className="">
          {!isLoading && <ToDoCardLogic dayIdProps={dayId} day={day} />}
        </div>
      </div>
    </div>
  );
};
