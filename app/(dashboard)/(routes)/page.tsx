import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  const { userId } = auth();

  return (
    <div className="p-6 flex flex-col items-center justify-center h-full">
      <Image
        src="/course_img.png"
        width={500}
        height={500}
        alt="course image"
        className="rounded-md"
      />
      <h1 className="font-medium text-2xl mt-6">Become an instructor</h1>
      <h2 className="text-sm mt-2 text-center w-1/2">
        Instructors from around the world teach millions of students on BySimit.
        We provide the tools and skills to teach what you love.
      </h2>

      {!userId && (
        <Link href="/teacher/courses" className="mt-4">
          <Button size="sm" variant="outline">
            Teacher mode
          </Button>
        </Link>
      )}
    </div>
  );
};

export default DashboardPage;
