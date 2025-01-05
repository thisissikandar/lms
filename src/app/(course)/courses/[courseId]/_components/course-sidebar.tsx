"use client";
import { CourseSidebarItem } from "./course-sidebar-item";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { CourseProgress } from "@/components/course-progress";
import { useEffect, useState } from "react";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & { userProgress: UserProgress[] | null })[];
  };
  progressCount: number;
}
export const CourseSidebar = ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const [purchase, setPurchase] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { userId } = auth();
      if (!userId) {
        redirect("/");
      }

      const purchase = await db.purchase.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId: course.id,
          },
        },
      });

      setPurchase(purchase);
    };

    fetchData();
  }, [course.id]);
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
        {purchase && (
          <div className=" mt-10">
            <CourseProgress variant="success" value={progressCount} />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};
