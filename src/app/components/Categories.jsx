"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Categories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/admin/sub-category");
        const data = await res.json();
        
        const filteredSubCategories = (data.products || []).filter(
          (subCat) => !subCat.title.toLowerCase().includes("featured")
        );
        
        setSubCategories(filteredSubCategories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (subCategory) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("subCategory", subCategory._id);
    params.set("category", subCategory.parentCategory.id);
    router.push(`/all-books?${params.toString()}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-400">Error loading categories</p>;
  }

  return (
    <ul className="space-y-2 text-sm text-[#b3b3b3]">
      {subCategories.map((subCategory) => (
        <li 
          key={subCategory._id}
          className="hover:text-[#50C878] cursor-pointer transition-colors"
          onClick={() => handleCategoryClick(subCategory)}
        >
          {subCategory.title}
        </li>
      ))}
    </ul>
  );
};

export default Categories;