
import React from "react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";


export default async function CoursePage() {
  const {userId} = auth()
  if(!userId){
   return redirect("/")
  }
  const course = await db.course.findMany({
    where:{
      userId:userId
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div>
       <div className="container mx-auto py-10">
      <DataTable columns={columns} data={course} />
    </div>
    </div>
  );
}
