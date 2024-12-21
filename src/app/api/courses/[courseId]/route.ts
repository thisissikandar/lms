import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unautherized Request", { status: 401 });
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
      return new NextResponse("Course Not Found", { status: 404 });
    }
    await Promise.all(
      course.chapters.map(async (chapter) => {
        if (chapter.muxData?.assetId) {
          try {
            const del = await video.assets.delete(chapter.muxData.assetId);
            console.log(del);
          } catch (error) {
            console.log(`Failed to delete asset with ID ${chapter.muxData.assetId}:`, error);
          }
        }
      })
    );
    const deleteCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    });
    return NextResponse.json(deleteCourse);
  } catch (error) {
    console.log("ERROR COURSEID DELETE ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    if (!userId)
      return new NextResponse("Unautherized Request", { status: 401 });
    const course = await db.course.update({
      where: {
        id: courseId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("ERROR CourseId ", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
