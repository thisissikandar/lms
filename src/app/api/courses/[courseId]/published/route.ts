import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string;} }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized Request", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const hasPublishedChapter = course.chapters.some(
      (item) => item.isPubLished
    );

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId ||
      !hasPublishedChapter
    ) {
      return new NextResponse("Missing Required Fields", { status: 400 });
    }
    const publishedChapter = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId,
      },
      data: {
        isPublished: true,
      },
    });
    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[COURSEID-PUBLISHED] ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
