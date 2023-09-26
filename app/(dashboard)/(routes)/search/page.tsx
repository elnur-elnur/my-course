import { db } from "@/lib/db";
import React from "react";
import Categories from "./_components/categories";

const SearchPage = async () => {
  const categories = db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-6">
      {/* <Categories items={categories} /> */}
      <p>Categories</p>
    </div>
  );
};

export default SearchPage;
