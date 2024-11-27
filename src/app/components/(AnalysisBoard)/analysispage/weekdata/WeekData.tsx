"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function WeekData ()  {
  const [totalFetchWeekData, setTotalFetchWeekData] = useState(0);
  const [fetchCompletedWeekData, setFetchCompletedWeekData] = useState(0);
  const [fetchUncompletedWeekData, setFetchUncompletedWeekData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/todos"); // Ensure the correct endpoint
        const data = response.data;
        console.log("Fetched week's data:", data);

        // Ensure data is an array before processing
        if (!Array.isArray(data)) {
          throw new Error("Expected an array but got: " + JSON.stringify(data));
        }

        // Process the data as needed
        setTotalFetchWeekData(data.length); // Example: total number of todos
        setFetchCompletedWeekData(data.filter((todo) => todo.completed).length); // Example: count completed todos
        setFetchUncompletedWeekData(
          data.filter((todo) => !todo.completed).length
        ); // Example: count uncompleted todos

        // Call putDataInWeek after data is fetched and processed
        await putDataInWeek(); // Ensure this is awaited
      } catch (error) {
        console.error("Error fetching week data:", error);
      }
    };

    const putDataInWeek = async () => {
      // Fixed indentation
      await axios.post("/api/weeks", {
        totalTask: totalFetchWeekData,
        completedTask: fetchCompletedWeekData,
        uncompletedTask: fetchUncompletedWeekData,
      });
    };

    fetchData(); // Call fetchData to initiate the process
  }, []); // Removed extraneous semicolon

  return (
    <div>
      <h1>Week Data</h1>
      <p>Total Todos: {totalFetchWeekData}</p>
      <p>Completed Todos: {fetchCompletedWeekData}</p>
      <p>Uncompleted Todos: {fetchUncompletedWeekData}</p>
    </div>
  ); // This should be the closing of the return statement
};

export default WeekData; // Ensure this is outside the function
