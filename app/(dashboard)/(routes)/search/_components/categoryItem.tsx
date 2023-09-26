"use client";

import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

const CategoryItem = ({ label, value, icon: Icon }: CategoryItemProps) => {
  return (
    <button>
      {Icon && <Icon size="20" />}
      <span>{label}</span>
    </button>
  );
};

export default CategoryItem;
