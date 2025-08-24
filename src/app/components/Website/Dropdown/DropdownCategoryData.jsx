"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

// Cache storage
const categoryCache = {
  subCategories: null,
  childCategories: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
};

const DropdownCategoryData = ({ setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const hoverTimeout = useRef(null);

  // Check if cache is valid
  const isCacheValid = useCallback(() => {
    return (
      categoryCache.subCategories &&
      categoryCache.childCategories &&
      categoryCache.timestamp &&
      Date.now() - categoryCache.timestamp < categoryCache.CACHE_DURATION
    );
  }, []);

  const fetchData = useCallback(async () => {
    // Return cached data if valid
    if (isCacheValid()) {
      setSubCategories(categoryCache.subCategories);
      setChildCategories(categoryCache.childCategories);
      
      if (categoryCache.subCategories.length > 0) {
        setActiveItem(categoryCache.subCategories[0]._id);
      }
      
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [subRes, childRes] = await Promise.all([
        fetch("https://books-server-001.vercel.app/api/admin/sub-category-navbar"),
        fetch("https://books-server-001.vercel.app/api/admin/child-category-navbar"),
      ]);

      if (!subRes.ok || !childRes.ok) {
        throw new Error("Failed to fetch categories");
      }

      const subData = await subRes.json();
      const childData = await childRes.json();

      const filteredSubCategories = (subData.products || []).filter(
        (subCat) => !subCat.title.toLowerCase().includes("featured")
      );

      // Update cache
      categoryCache.subCategories = filteredSubCategories;
      categoryCache.childCategories = childData.products || [];
      categoryCache.timestamp = Date.now();

      setSubCategories(filteredSubCategories);
      setChildCategories(childData.products || []);

      if (filteredSubCategories.length > 0) {
        setActiveItem(filteredSubCategories[0]._id);
      }

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      
      // If there's an error but we have cached data, use it
      if (categoryCache.subCategories) {
        setSubCategories(categoryCache.subCategories);
        setChildCategories(categoryCache.childCategories);
        
        if (categoryCache.subCategories.length > 0) {
          setActiveItem(categoryCache.subCategories[0]._id);
        }
      }
    }
  }, [isCacheValid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getChildCategories = useCallback((subCategoryId) => {
    return childCategories.filter(
      (child) => child.parentSubCategory?.id === subCategoryId
    );
  }, [childCategories]);

  const handleSubCategoryHover = useCallback((subCategoryId) => {
    clearTimeout(hoverTimeout.current);
    setActiveItem(subCategoryId);
  }, []);

  const handleNavLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => {
      if (!dropdownRef.current?.matches(":hover")) {
        setActiveItem(subCategories[0]?._id || null);
      }
    }, 300);
  }, [subCategories]);

  const handleDropdownLeave = useCallback(() => {
    hoverTimeout.current = setTimeout(() => {
      if (!navRef.current?.matches(":hover")) {
        setActiveItem(subCategories[0]?._id || null);
      }
    }, 300);
  }, [subCategories]);

  const handleSubCategoryClick = useCallback((subCategory) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("subCategory", subCategory._id);
    params.set("category", subCategory.parentCategory.id);
    router.push(`/all-books?${params.toString()}`);
    setIsOpen(false);
  }, [router, setIsOpen]);

  const handleChildCategoryClick = useCallback((childCategory) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("childCategory", childCategory._id);
    params.set("subCategory", childCategory.parentSubCategory.id);
    params.set("category", childCategory.parentCategory.id);
    router.push(`/all-books?${params.toString()}`);
    setIsOpen(false);
  }, [router, setIsOpen]);

  // Skeleton loader components
  const SkeletonNavItem = () => (
    <div className="px-3 py-1 rounded-md bg-gray-100 animate-pulse">
      <div className="h-2 w-20 bg-gray-100 rounded"></div>
    </div>
  );

  const SkeletonDropdownItem = () => (
    <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
  );

  if (error && !categoryCache.subCategories) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white relative bangla-text">
      {/* Sub-categories navigation bar */}
      <div
        className="max-w-7xl mx-auto px-4"
        ref={navRef}
        onMouseLeave={handleNavLeave}
      >
        <div className="flex h-full flex-wrap justify-center gap-1 md:gap-4 py-4 border-b border-gray-200">
          {loading ? (
            // Skeleton loading for navigation items
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonNavItem key={index} />
            ))
          ) : (
            subCategories.map((subCategory) => {
              const hasChildren = getChildCategories(subCategory._id).length > 0;

              return (
                <div
                  key={subCategory._id}
                  className="relative"
                  onMouseEnter={() =>
                    hasChildren && handleSubCategoryHover(subCategory._id)
                  }
                >
                  <div
                    className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-all duration-200 ${
                      hasChildren
                        ? "hover:bg-gray-100 cursor-pointer"
                        : "cursor-pointer"
                    } ${
                      activeItem === subCategory._id
                        ? "text-green-600 bg-green-50"
                        : "text-gray-700 hover:text-green-600"
                    }`}
                    onClick={() => handleSubCategoryClick(subCategory)}
                  >
                    {subCategory.title}
                    {hasChildren && (
                      <svg
                        className={`w-4 h-4 ml-1 inline-block transition-transform ${
                          activeItem === subCategory._id
                            ? "transform rotate-180"
                            : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </div>

                  {activeItem === subCategory._id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-green-600 rounded-t"
                      layoutId="activeIndicator"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Dropdown container */}
      <AnimatePresence>
        {activeItem && getChildCategories(activeItem).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 bg-white shadow-lg z-50"
            ref={dropdownRef}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="py-4 px-4">
              <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {loading ? (
                  // Skeleton loading for dropdown items
                  Array.from({ length: 20 }).map((_, index) => (
                    <SkeletonDropdownItem key={index} />
                  ))
                ) : (
                  getChildCategories(activeItem).map((child, index) => (
                    <motion.div
                      key={child._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:text-green-600 cursor-pointer"
                      onClick={() => handleChildCategoryClick(child)}
                    >
                      <h4 className="font-medium text-gray-800 mb-1 hover:text-green-600">
                        {child.title}
                      </h4>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownCategoryData;