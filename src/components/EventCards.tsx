"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import WaterBackground from "../shared/WaterBackground";

// Card container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Card animation
const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

// Button animation
const buttonVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    backgroundColor: "#2563eb",
    color: "#ffffff",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

const EventCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Event data
  const events = [
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2024/02/Plumbex.jpg",
      title: "PlumbexIndia 2025",
      date: "24th, 25th & 26th April 2025",
      location: "Hall No. 5, Bharat Mandapam, New Delhi",
      buttonText: "Know More",
      color: "#3b82f6", // Blue
    },
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2025/01/31st_IPC_logo1-1024x914.png",
      title: "31st Indian Plumbing Conference",
      date: "13th, 14th & 15th November 2025",
      location: "Biswa Bangla Mela Prangan, Kolkata",
      buttonText: "Know More",
      color: "#0ea5e9", // Sky blue
    },
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2024/03/IPPL-2024-1.png",
      title: "1st IPL 2024",
      date: "1st August to 30th October 2025",
      location: "",
      buttonText: "Know More",
      color: "#06b6d4", // Cyan
    },
    {
      logo: "https://indianplumbing.org/wp-content/uploads/2024/03/Neerathon-2024.png",
      title: "IPA Neerathon",
      date: "16th February 2025",
      location: "Sabarmati Riverfront, Ahmedabad",
      buttonText: "Know More",
      color: "#0891b2", // Teal
    },
  ];

  return (
    <div className="relative w-full min-h-[600px] py-12 overflow-hidden bg-white">
      {/* Water background animation */}
      <WaterBackground height={600} />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3">
            Upcoming <span className="text-blue-600">Events</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Event cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-blue-100 flex flex-col"
              style={{
                borderTopWidth: "4px",
                borderTopColor: event.color,
              }}
            >
              {/* Card content */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Logo container with subtle animation */}
                <motion.div
                  className="w-full h-32 relative mb-6 flex items-center justify-center"
                  animate={{
                    y: hoveredCard === index ? [0, -5, 0] : 0,
                  }}
                  transition={{
                    duration: 2,
                    repeat:
                      hoveredCard === index ? Number.POSITIVE_INFINITY : 0,
                    repeatType: "reverse",
                  }}
                >
                  <Image
                    src={event.logo || "/placeholder.svg"}
                    alt={event.title}
                    width={120}
                    height={80}
                    className="object-contain max-h-full"
                  />
                </motion.div>

                {/* Event details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {event.title}
                  </h3>

                  <div className="flex items-start space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-blue-700">{event.date}</p>
                  </div>

                  {event.location && (
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <p className="text-sm text-blue-700">{event.location}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Button */}
              <div className="px-6 pb-6">
                <motion.button
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full flex items-center justify-center space-x-2 border-2 border-blue-600 text-blue-600 font-medium py-2 rounded-lg transition-colors"
                >
                  <span>{event.buttonText}</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EventCards;
