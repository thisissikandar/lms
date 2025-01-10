import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progres";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};
type DashoardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  courseInProgress: CourseWithProgressWithCategory[];
};
export const getDashboardCourses = async (
  userId: string
): Promise<DashoardCourses> => {
  try {
    const purchasCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPubLished: true,
              },
            },
          },
        },
      },
    });
    const courses = purchasCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];
    for (const course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }
    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const courseInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return {
      completedCourses,
      courseInProgress,
    };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      courseInProgress: [],
    };
  }
};
