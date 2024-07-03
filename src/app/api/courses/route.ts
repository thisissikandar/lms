import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized request", { status: 401 });
    }
    const courses = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    console.log(courses);
    return NextResponse.json(courses);
  } catch (error) {
    console.log("COURSES ERROR: " + error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
