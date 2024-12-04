import { NextResponse } from "next/server";
import { connectDB } from "@/app/db/connect";
import Month from "@/app/db/models/monthSchema";

// ... existing imports ...
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const month = await Month.findOneAndUpdate(
      {
        monthNumber: body.monthNumber,
        year: body.year,
      },
      {
        $addToSet: { weeks: body.weekId }, // Use $addToSet to avoid duplicates
      },
      {
        new: true,
        upsert: true,
      }
    );

    return NextResponse.json(month);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const month = await Month.findOneAndUpdate(
      { monthNumber: currentMonth, year: currentYear },
      { $setOnInsert: { weeks: [] } },
      {
        new: true, // Return the modified/new document
        upsert: true, // Create if it doesn't exist
        populate: "weeks", // Populate the weeks field
      }
    );
    console.log();

    return NextResponse.json(month);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
