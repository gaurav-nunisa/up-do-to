"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function WeekData ()  {
  const [totalFetchWeekData, setTotalFetchWeekData] = useState(0);
  const [fetchCompletedWeekData, setFetchCompletedWeekData] = useState(0);
  const [fetchUncompletedWeekData, setFetchUncompletedWeekData] = useState(0);

  useEffect(() => {
    const putDataInWeek = async(
      total: number,
      completed: number,
      uncompleted: number,
      startDate: Date,
      endDate: Date
    ) =>{
      try {
        await axios.put("/api/weeks/weekdataupdate", {
          totalTask: total,
          completedTask: completed,
          uncompletedTask: uncompleted,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        });
      } catch (error) {
        console.error("Error posting week data:", error);
      }

    }
    const postDataInWeek = async (
      total: number,
      completed: number,
      uncompleted: number,
      startDate: Date,
      endDate: Date
   
    ) => {
      try {
        await axios.post("/api/weeks/transition", {
          totalTask: total,
          completedTask: completed,
          uncompletedTask: uncompleted,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        });
      } catch (error) {
        console.error("Error posting week data:", error);
      }
    };
   

    const fetchData = async () => {
      try {
        // Get current week's dates
        const today = new Date();
        const startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);

        // Fetch current week's todos
        const response = await axios.get("/api/todos", {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        });
        const data = response.data;

        if (!Array.isArray(data)) {
          throw new Error("Expected an array but got: " + JSON.stringify(data));
        }

        const total = data.length;
        const completed = data.filter((todo) => todo.completed).length;
        const uncompleted = data.filter((todo) => !todo.completed).length;

        setTotalFetchWeekData(total)
        setFetchCompletedWeekData(completed);
        setFetchUncompletedWeekData(uncompleted);
        await putDataInWeek(total, completed, uncompleted, startDate, endDate)

        // Check if week exists
        const weekCheckResponse = await axios.get('/api/weeks/check', {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        });

        // Only create/update week if it doesn't exist
        if (!weekCheckResponse.data.exists) {
          console.log("Creating new week with payload:", {
            startDate,
            endDate,
            totalTask: total,
            completedTask: completed,
            uncompletedTask: uncompleted,
          });

          await postDataInWeek(total, completed, uncompleted, startDate, endDate);
        } else {
          console.log("Week already exists for this date range");
        }
      } catch (error) {
        console.error("Error in fetch data process:", error);
      }
    };

    fetchData();
   
  }, []);

  return (
    <div>
      <h1>Week Data</h1>
      <p>Total Todos: {totalFetchWeekData}</p>
      <p>Completed Todos: {fetchCompletedWeekData}</p>
      <p>Uncompleted Todos: {fetchUncompletedWeekData}</p>
    </div>
  );
};

export default WeekData;