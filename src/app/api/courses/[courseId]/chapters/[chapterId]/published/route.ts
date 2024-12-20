import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized Request", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    });
    const muxData = await db.muxData.findFirst({
      where: {
        chapterId: params.chapterId,
      },
    });
    if (
      !chapter ||
      !muxData ||
      !chapter.description ||
      !chapter.title ||
      !chapter.videoUrl
    ) {
      return new NextResponse("Missing Required Fields", { status: 400 });
    }
    const publishedChapter = await db.chapter.update({
        where:{
            id: params.chapterId,
            courseId: params.courseId
        },
        data:{
            isPubLished: true
        }
    })
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER-PUBLISHED] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
