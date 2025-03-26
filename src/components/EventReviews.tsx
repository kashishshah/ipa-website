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

const EventReviews = () => {
  // Review data (from the image)
  const reviews = [
    {
      image: "https://indianplumbing.org/wp-content/uploads/2023/09/test1.jpg", // Replace with actual image path
      quote:
        "This is an important Exhibition for Water, Plumbing and Sanitation related services.",
      name: "Shri Hardeep Singh Puri",
      title: "Hon. Minister, Ministry of Housing and urban Affairs",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/test1-1.jpg", // Replace with actual image path
      quote:
        "Water Conservation and optimal use of water is crucial and plumbing industry is playing an important role in this daunting task.",
      name: "Dr. C. N. Ashwathnarayan",
      title: "Deputy Chief Minister of Karnataka",
    },
    {
      image: "https://indianplumbing.org/wp-content/uploads/2023/09/test3.jpg", // Replace with actual image path
      quote:
        "We can manufacture pipes and taps, we cannot manufacture water. Therefore, we need to adopt Bharat Tap to minimise water usage. Bharat Tap should become the name for efficiency.",
      name: "Smt. D. Thara",
      title:
        "Additional Secretary, Ministry of Housing and Urban Affairs, and Mission Director, AMRUT 2.0",
    },
    {
      image:
        "https://indianplumbing.org/wp-content/uploads/2023/09/test2-1.jpg", // Replace with actual image path
      quote:
        "IPA along with IAPMO has made a tremendous effort in introducing plumbing codes among the Indian Plumbing and Building fraternity.",
      name: "Tushar Giri Nath",
      title: "Chairman - BWSSB (Bangaluru Water Supply and Sewerage Board)",
    },
  ];

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
          Event Reviews
        </h2>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 flex flex-col items-center text-center shadow-lg border border-blue-200"
            >
              {/* Reviewer Image */}
              <div className="w-24 h-24 relative mb-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-2 border-blue-300"
                />
              </div>

              {/* Review Quote */}
              <p className="text-blue-700 text-sm mb-4 italic">
                {`"${review.quote}"`}
              </p>

              {/* Reviewer Name and Title */}
              <h3 className="text-lg font-semibold text-blue-900">
                {review.name}
              </h3>
              <p className="text-sm text-blue-600">{review.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Read More Button */}
        <div className="text-center mt-12">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="border border-blue-600 text-blue-600 hover:text-white px  px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Read More
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EventReviews;
