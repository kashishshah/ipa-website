"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Card hover animation
const cardVariants = {
  hover: { scale: 1.05, y: -10, transition: { duration: 0.3 } },
  initial: { scale: 1, y: 0 },
};

// Button animation
const buttonVariants = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const IPAChapters = () => {
  // Chapter data (from the image)
  const chapters = [
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/1568017953_ahmedabad.jpg", // Replace with actual image path
      name: "Ahmedabad",
      email: "ahmedabad@indianplumbing.org",
      mobile: "+919925427747",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/1711004846_amrv.jpg", // Replace with actual image path
      name: "Amaravati",
      email: "amaravati@indianplumbing.org",
      mobile: "+917030186644",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/1568017991_bangaluru.jpg", // Replace with actual image path
      name: "Bengaluru",
      email: "bengaluru@indianplumbing.org",
      mobile: "+919448123319",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/1568018027_chandigarh.jpg", // Replace with actual image path
      name: "Chandigarh",
      email: "chandigarh@indianplumbing.org",
      mobile: "+911814627070",
    },
  ];

  return (
    <div className="w-full py-12 bg-blue-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
          IPA Chapters
        </h2>

        {/* Chapter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-md border border-blue-100"
            >
              {/* Chapter Image */}
              <div className="w-full h-32 relative mb-4">
                <Image
                  src={chapter.image}
                  alt={chapter.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Chapter Name */}
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {chapter.name}
              </h3>

              {/* Email */}
              <p className="text-sm text-blue-600 mb-1">E: {chapter.email}</p>

              {/* Mobile */}
              <p className="text-sm text-blue-600 mb-4">M: {chapter.mobile}</p>

              {/* Know More Button */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="text-blue-700 px-4 py-2 transition underline underline-offset-8"
              >
                Know More
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="border border-blue-600 text-blue-600 hover:text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            View More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IPAChapters;
