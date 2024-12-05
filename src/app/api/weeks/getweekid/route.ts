import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Week from "@/app/db/models/weekSchema";
import Month from "@/app/db/models/monthSchema";
import { getWeekBoundaries } from "@/app/utils/dateHelper";

export async function GET() {
  try {
    await connectDB();
    const { startOfWeek, endOfWeek } = getWeekBoundaries();
    const currentMonth = startOfWeek.getMonth() + 1;
    const currentYear = startOfWeek.getFullYear();

    // Check if the current week exists
    let currentWeek = await Week.findOne({
      startDate: { $gte: startOfWeek, $lte: endOfWeek }
    });

    if (!currentWeek) {
      // Create the week if it doesn't exist
      currentWeek = await Week.create({
        startDate: startOfWeek,
        endDate: endOfWeek,
        weekData: {
          totalTask: 0,
          completedTask: 0,
          uncompletedTask: 0,
        },
      });

      // Check if the current month exists
      let currentMonthDoc = await Month.findOne({
        monthNumber: currentMonth,
        year: currentYear,
      });

      if (!currentMonthDoc) {
        // Create the month if it doesn't exist
        currentMonthDoc = await Month.create({
          monthNumber: currentMonth,
          year: currentYear,
          weeks: [currentWeek._id],
        });
      } else {
        // Add the week to the existing month
        currentMonthDoc.weeks.push(currentWeek._id);
        await currentMonthDoc.save();
      }
    }

    return NextResponse.json({ weekId: currentWeek._id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}