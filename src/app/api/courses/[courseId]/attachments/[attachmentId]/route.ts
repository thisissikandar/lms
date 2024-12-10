import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {return new NextResponse("Unautherized Request", { status: 401 })};
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });
    if (!courseOwner) new NextResponse("Unauthorized", { status: 401 });

    const attachments = await db.attachment.delete({
      where: {
        id: params.attachmentId,
        courseId: params.courseId,
      },
    });

    return NextResponse.json(attachments);
  } catch (error) {
    console.log("ERROR_ID_ATTACHMENT ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
