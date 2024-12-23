import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPubLished: true,
      },
      select: {
        id: true,
      },
    });
    const pubblishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: pubblishedChapterIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / publishedChapters.length) * 100;
    return progressPercentage;
  } catch (error) {
    console.log("Error in getProgress", error);
    return 0;
  }
};
