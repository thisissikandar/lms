import {  NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();
    if (!userId) {
      return new NextResponse("Unautherized Request", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId:userId,
      },
    });
    if (!courseOwner) new NextResponse("Unauthorized", { status: 401 });

    const attachments = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.log("ERROR_ID_ATTACHMENT ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
