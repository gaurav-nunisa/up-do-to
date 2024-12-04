import { NextResponse } from 'next/server'
import { connectDB } from "@/app/db/connect";
import Week from "@/app/db/models/weekSchema";
import Month from "@/app/db/models/monthSchema";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json()
    console.log("received body in post Transition route: ", body);

    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

  

    const weekData = {
      startDate,
      endDate,
      weekData: {
        totalTask: body.totalTask || 0,
        completedTask: body.completedTask || 0,
        uncompletedTask: body.uncompletedTask || 0,
      },
    };

    const newWeek = await Week.create(weekData);

    const currentMonth = startDate.getMonth() + 1;
    const currentYear = startDate.getFullYear();

    await Month.findOneAndUpdate(
      { monthNumber: currentMonth, year: currentYear },
      { $addToSet: { weeks: newWeek._id } },
      { upsert: true }
    );

    return NextResponse.json(newWeek);
  } catch (error) {
    console.error("Week creation Error: ", error);
    return NextResponse.json({
      message: "Failed to create Week",
      error: error.message
    }, { status: 500 });
  }
}

