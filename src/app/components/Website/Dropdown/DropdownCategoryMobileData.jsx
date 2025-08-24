"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import logo from "../../../../assets/book_forest.png";
import Link from "next/link";

// Cache storage for mobile component
const mobileCategoryCache = {
  subCategories: null,
  childCategories: null,
  writers: null,
  publishers: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes cache
};

const DropdownCategoryMobileData = ({ setIsOpen }) => {
  const router = useRouter();
  const [subCategories, setSubCategories] = useState([]);
  const [childCategories, setChildCategories] = useState([]);
  const [writers, setWriters] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if cache is valid
  const isCacheValid = useCallback(() => {
    return (
      mobileCategoryCache.subCategories &&
      mobileCategoryCache.childCategories &&
      mobileCategoryCache.writers &&
      mobileCategoryCache.publishers &&
      mobileCategoryCache.timestamp &&
      Date.now() - mobileCategoryCache.timestamp < mobileCategoryCache.CACHE_DURATION
    );
  }, []);

  const fetchData = useCallback(async () => {
    // Return cached data if valid
    if (isCacheValid()) {
      setSubCategories(mobileCategoryCache.subCategories);
      setChildCategories(mobileCategoryCache.childCategories);
      setWriters(mobileCategoryCache.writers);
      setPublishers(mobileCategoryCache.publishers);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [subRes, childRes, writersRes, publishersRes] = await Promise.all([
        fetch("https://books-server-001.vercel.app/api/admin/sub-category-navbar"),
        fetch("https://books-server-001.vercel.app/api/admin/child-category-navbar"),
        fetch("https://books-server-001.vercel.app/api/web/all-author"),
        fetch("https://books-server-001.vercel.app/api/web/all-publisher")
      ]);

      const subData = await subRes.json();
      const childData = await childRes.json();
      const writersData = await writersRes.json();
      const publishersData = await publishersRes.json();

      const filteredSubCategories = (subData.products || []).filter(
        (subCat) => !subCat.title.toLowerCase().includes("featured")
      );

      // Update cache
      mobileCategoryCache.subCategories = filteredSubCategories;
      mobileCategoryCache.childCategories = childData.products || [];
      mobileCategoryCache.writers = writersData.products || [];
      mobileCategoryCache.publishers = publishersData.products || [];
      mobileCategoryCache.timestamp = Date.now();

      setSubCategories(filteredSubCategories);
      setChildCategories(childData.products || []);
      setWriters(writersData.products || []);
      setPublishers(publishersData.products || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      
      // If there's an error but we have cached data, use it
      if (mobileCategoryCache.subCategories) {
        setSubCategories(mobileCategoryCache.subCategories);
        setChildCategories(mobileCategoryCache.childCategories);
        setWriters(mobileCategoryCache.writers);
        setPublishers(mobileCategoryCache.publishers);
      }
    }
  }, [isCacheValid]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getChildCategories = (subCategoryId) => {
    return childCategories.filter(
      (child) => child.parentSubCategory?.id === subCategoryId
    );
  };

  const handleCategoryClick = (subCategory) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("subCategory", subCategory._id);
    params.set("category", subCategory.parentCategory.id);
    router.push(`/all-books?${params.toString()}`);
    setIsOpen(false);
  };

  const handleChildCategoryClick = (childCategory) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("childCategory", childCategory._id);
    params.set("subCategory", childCategory.parentSubCategory.id);
    params.set("category", childCategory.parentCategory.id);
    router.push(`/all-books?${params.toString()}`);
    setIsOpen(false);
  };

  const handleWriterClick = (writer) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("author", writer._id);
    router.push(`/all-books?${params.toString()}`);
    setIsOpen(false);
  };

  const handlePublisherClick = (publisher) => {
    const params = new URLSearchParams();
    params.set("page", "1");
    params.set("publisher", publisher._id);
    router.push(`/all-books?${params.toString()}`);
    setIsOpen(false);
  };

  // Skeleton Components
  const SkeletonHeader = () => (
    <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex flex-row items-center gap-4">
        <div className="w-[50px] h-[54px] bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );

  const SkeletonListItem = () => (
    <div className="flex items-center justify-between p-4">
      <div className="h-5 w-40 bg-gray-200 rounded animate-pulse"></div>
      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
    </div>
  );

  const SkeletonNestedItem = () => (
    <div className="pl-6 py-2">
      <div className="p-3">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
      </div>
    </div>
  );

  if (error && !mobileCategoryCache.subCategories) {
    return (
      <div className="h-full flex flex-col">
        <SkeletonHeader />
        <div className="p-4 text-red-600 bg-red-50 rounded m-4">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      {loading ? (
        <SkeletonHeader />
      ) : (
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex justify-between items-center">
          <Link href="/">
            <div className="flex flex-row items-center gap-4">
              <img src={logo.src} alt="" className="w-[50px] h-[54px]"></img>
              <h1 className="text-lg font-bold dark:text-black">Book Forest</h1>
            </div>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            <IoClose className="text-2xl" />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {/* Loading State */}
          {loading ? (
            <>
              {/* Writers Skeleton */}
              <div className="group">
                <SkeletonListItem />
                <SkeletonNestedItem />
                <SkeletonNestedItem />
              </div>

              {/* Publications Skeleton */}
              <div className="group">
                <SkeletonListItem />
                <SkeletonNestedItem />
                <SkeletonNestedItem />
              </div>

              {/* Categories Skeleton */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="group">
                  <SkeletonListItem />
                  <SkeletonNestedItem />
                  <SkeletonNestedItem />
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Writers Section */}
              <div className="group">
                <div
                  className={`flex items-center justify-between p-4 ${
                    activeTab === 'writers'
                      ? "bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(activeTab === 'writers' ? null : 'writers')}
                >
                  <span
                    className={`font-medium ${
                      activeTab === 'writers'
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Writers
                  </span>
                  <motion.div
                    animate={{
                      rotate: activeTab === 'writers' ? 90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronRight className="text-gray-500" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeTab === 'writers' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pb-2">
                        {writers.map((writer) => (
                          <div
                            key={writer._id}
                            className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWriterClick(writer);
                            }}
                          >
                            {writer.title}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Publications Section */}
              <div className="group">
                <div
                  className={`flex items-center justify-between p-4 ${
                    activeTab === 'publishers'
                      ? "bg-green-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab(activeTab === 'publishers' ? null : 'publishers')}
                >
                  <span
                    className={`font-medium ${
                      activeTab === 'publishers'
                        ? "text-green-600"
                        : "text-gray-700"
                    }`}
                  >
                    Publications
                  </span>
                  <motion.div
                    animate={{
                      rotate: activeTab === 'publishers' ? 90 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronRight className="text-gray-500" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeTab === 'publishers' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-6 pb-2">
                        {publishers.map((publisher) => (
                          <div
                            key={publisher._id}
                            className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePublisherClick(publisher);
                            }}
                          >
                            {publisher.title}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Categories Sections */}
              {subCategories.map((subCategory) => {
                const children = getChildCategories(subCategory._id);
                const hasChildren = children.length > 0;

                return (
                  <div key={subCategory._id} className="group">
                    {/* Main Category Item */}
                    <div
                      className={`flex items-center justify-between p-4 ${
                        activeTab === subCategory._id
                          ? "bg-green-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        if (!hasChildren) {
                          handleCategoryClick(subCategory);
                        } else {
                          setActiveTab(activeTab === subCategory._id ? null : subCategory._id);
                        }
                      }}
                    >
                      <span
                        className={`font-medium ${
                          activeTab === subCategory._id
                            ? "text-green-600"
                            : "text-gray-700"
                        }`}
                      >
                        {subCategory.title}
                      </span>
                      {hasChildren && (
                        <motion.div
                          animate={{
                            rotate: activeTab === subCategory._id ? 90 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronRight className="text-gray-500" />
                        </motion.div>
                      )}
                    </div>

                    {/* Subcategories Dropdown */}
                    <AnimatePresence>
                      {hasChildren && activeTab === subCategory._id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-6 pb-2">
                            {children.map((child) => (
                              <div
                                key={child._id}
                                className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChildCategoryClick(child);
                                }}
                              >
                                {child.title}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownCategoryMobileData;