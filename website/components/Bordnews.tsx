"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ['ประชาสัมพันธ์' , "จัดซื้อ-จัดจ้าง", "รับสมัครงาน"];

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full mx-auto  ">
      {/* Tabs Header */}
      <div className="relative flex max-w-md ">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative flex-1 py-2 text-center font-medium rounded-tl-xl rounded-tr-xl transition-all duration-700 ${
              activeTab === index ? "text-black bg-white shadow-[0_-4px_6px_rgba(0,0,0,0.1)]" : "text-gray-500"
            }`}
          >
            {tab}
            {activeTab === index && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-1 bg-white "
              />
            )}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="relative w-full box-shadows-1 bg-white rounded-br-lg rounded-bl-lg rounded-tr-lg">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="p-5 w-full "
      >
        <p className="text-gray-700">เนื้อหาของ  5555555 55 55 5 55555555555555555555555555555555555555555555555 {tabs[activeTab]}</p>
      </motion.div>
      </div>
    </div>
  );
}
