import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { redirect } from "next/navigation";
import { getCourses } from "@/actions/get-courses";
import CoursesList from "@/components/courses/coursesList";

interface SearchParams {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchParams) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <div className="p-6 space-y-4">
      <Categories items={categories} />
      <CoursesList items={courses} />
    </div>
  );
};

export default SearchPage;
