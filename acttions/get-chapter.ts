import { Attachment, Chapter } from "@prisma/client";
import { db } from "@/lib/db";

interface GetChapterprops {
  userId: string;
  chapterId: string;
  courseId: string;
}

export const GetChapter = async ({
  userId,
  chapterId,
  courseId,
}: GetChapterprops) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPubLished: true,
      },
    });
    if (!chapter || !course) {
      throw new Error("Chapter or Course not be found");
    }
    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;
    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
    }
    if (chapter.isFree || purchase) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPubLished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });
    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("[GETTING CHAPTER ERROR]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
