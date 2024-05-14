import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function CoursePage() {

  return (
    <div>
      <Link href="/teacher/create">
        <Button>New Courses</Button>
      </Link>
    </div>
  );
}
