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

const AccreditedPublications = () => {
  // Publication data
  const publications = [
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2024/03/IPT-2024.png",
      title: "Indian Plumbing Today",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/08/Asset-5.png",
      title: "2022 Uniform Plumbing Code India",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/08/Asset-6.png",
      title: "A Guide to Good Plumbing Practices",
    },
  ];

  return (
    <div className="relative w-full bg-blue-50 py-12">
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
          Accredited Publications
        </h2>

        {/* Publication Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((publication, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              className="rounded-lg p-6 flex flex-col items-center text-center"
            >
              {/* Publication Image */}
              <div className="w-40 h-48 relative mb-4">
                <Image
                  src={publication.image}
                  alt={publication.title}
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-lg"
                />
              </div>

              {/* Publication Title */}
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                {publication.title}
              </h3>

              {/* Know More Button */}
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="border border-blue-600 text-blue-600 hover:text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
              >
                Know More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccreditedPublications;
