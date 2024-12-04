// src/app/api/weeks/current/weekid/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Week from "@/app/db/models/weekSchema";
import { getWeekBoundaries } from "@/app/utils/dateHelper";

export async function GET() {
  try {
    await connectDB();
    const { startOfWeek, endOfWeek } = getWeekBoundaries();
    console.log(startOfWeek,endOfWeek, "------------------------------------------------ ------------ ----------- ---------------")

    const currentWeek = await Week.findOne({
      startDate: { $gte: startOfWeek, $lte: endOfWeek }
    });
    console.log("current week----------------------------------------------------------------------- " , currentWeek)

    return NextResponse.json({ weekId: currentWeek?._id || null });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}