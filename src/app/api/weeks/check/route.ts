import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Week from "@/app/db/models/weekSchema";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const startDate = new Date(searchParams.get('startDate'));
    const endDate = new Date(searchParams.get('endDate'));

    const existingWeek = await Week.findOne({
      startDate: {
        $gte: startDate,
        $lte: endDate
      } 
    });

    return NextResponse.json({
      exists: !!existingWeek,
      week: existingWeek
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check week existence" },
      { status: 500 }
    );
  }
}