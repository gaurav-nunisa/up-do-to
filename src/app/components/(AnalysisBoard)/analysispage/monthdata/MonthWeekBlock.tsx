"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface WeekData {
  _id: string;
  startDate: string;
  endDate: string;
  weekData: {
    totalTask: number;
    completedTask: number;
    uncompletedTask: number;
  };
}

interface MonthData {
  monthNumber: number;
  year: number;
  weeks: WeekData[];
}

const MonthView = () => {
  const [monthData, setMonthData] = useState<MonthData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const response = await axios.get("/api/months/current");
        console.log("monthData recieved : ", response)

        // Validate the response data
        if (!response.data) {
          throw new Error("No data received from the server");
        }

        console.log("Received month data:", response.data);
        setMonthData(response.data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch month data:", error);
        setError("Failed to load month data");
        setMonthData(null);
      }
    };
    

    fetchMonthData();
   
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!monthData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        Month: {monthData.monthNumber} / {monthData.year}
      </h1>
      <div>
        {monthData.weeks &&
          monthData.weeks.map((week) => (
            <div key={week._id}>
              
              <h2>
                Week: {new Date(week.startDate).toLocaleDateString()} -{" "}
                {new Date(week.endDate).toLocaleDateString()}
              </h2>
              <p>Total Tasks: {week.weekData?.totalTask || 0}</p>
              <p>Completed Tasks: {week.weekData?.completedTask || 0}</p>
              <p>Uncompleted Tasks: {week.weekData?.uncompletedTask || 0}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MonthView;
