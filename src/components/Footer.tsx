"use client";
import { motion } from "framer-motion";
import {
  Droplets,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

// Link hover animation with glow
const linkVariants = {
  hover: {
    scale: 1.05,
    color: "#3b82f6",
    transition: { duration: 0.3 },
  },
  initial: { scale: 1, color: "#2563eb" },
};

// Social media icon hover animation with glow
const iconVariants = {
  hover: {
    scale: 1.2,
    filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))",
    transition: { duration: 0.3 },
  },
  initial: { scale: 1, filter: "none" },
};

// Water drop animation
const waterDropVariants = {
  animate: {
    y: [0, -10, 0],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as const,
    },
  },
};

const Footer = () => {
  // Quick Links data
  const quickLinks = [
    "Home",
    "About IPA",
    "Event & Activities",
    "Publications",
    "Awards",
    "Chapters",
    "Collaborations",
    "Knowledge Center",
    "Media Room",
    "Contact Us",
  ];

  // Contact Info data
  const contactInfo = {
    address: "416 Prime Towers, F-79 & 80 Okhla Phase-I, New Delhi-110 020",
    phone: "+91-11-4986 3152 / 4986 3153",
    email: "hq@indianplumbing.org",
  };

  // Social Media data
  const socialMedia = [
    {
      platform: "Facebook",
      link: "https://www.facebook.com/IndianPlumbingAssociation",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      platform: "Twitter",
      link: "https://x.com/OfficialIPA",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/company/officialipa",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      platform: "YouTube",
      link: "https://youtube.com/indianplumbing",
      icon: <Youtube className="w-5 h-5" />,
    },
  ];

  // Chapters data
  const chapters = [
    "Ahmedabad",
    "Amaravati",
    "Bengaluru",
    "Bhubaneswar",
    "Chandigarh",
    "Chennai",
    "Delhi",
    "Goa",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "Nashik",
    "Navi Mumbai",
    "Puducherry",
    "Pune",
    "Raipur",
    "Surat",
    "Trivandrum",
    "Vadodara",
    "Visakhapatnam",
  ];

  // Copyright links
  const copyrightLinks = [
    { name: "Refund Policy", href: "#" },
    { name: "Terms and Conditions", href: "#" },
    { name: "Disclaimer", href: "#" },
  ];

  return (
    <footer className="w-full bg-gradient-to-b from-blue-50 to-blue-100 text-blue-600 overflow-hidden relative">
      {/* Water wave decoration */}
      <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 right-0 h-16 bg-blue-200/30"
          style={{ borderRadius: "0 0 50% 50%" }}
          animate={{
            scaleX: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Animated water drops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={waterDropVariants}
            animate="animate"
            transition={{
              delay: i * 0.5,
            }}
          >
            <Droplets size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* Company Info */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-4">
              <Droplets className="text-blue-500 mr-2" size={28} />
              <h2 className="text-lg font-bold text-blue-700 leading-5">
                Indian Plumbing Association
              </h2>
            </div>
            <p className="text-blue-600/80 mb-4">
              Dedicated to promoting excellence in the field of plumbing and
              water management across India.
            </p>
            <div className="flex space-x-3">
              {socialMedia.map((media, index) => (
                <motion.a
                  key={index}
                  href={media.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="bg-white p-2 rounded-full text-blue-500 shadow-sm hover:text-blue-600 transition-colors"
                >
                  {media.icon}
                  <span className="sr-only">{media.platform}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
              <ExternalLink className="mr-2" size={18} />
              Quick Links
            </h3>
            <ul className="space-y-3 text-blue-600 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    initial="initial"
                    whileHover="hover"
                    className="text-sm flex items-center"
                  >
                    <ChevronRight size={14} className="mr-1 text-blue-400" />
                    <span>{link}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
              <Phone className="mr-2" size={18} />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin
                  className="mr-2 mt-1 text-blue-500 flex-shrink-0"
                  size={18}
                />
                <span className="text-sm">{contactInfo.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-blue-500 flex-shrink-0" size={18} />
                <span className="text-sm">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-blue-500 flex-shrink-0" size={18} />
                <a href={`mailto:${contactInfo.email}`} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Chapters */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
              <MapPin className="mr-2" size={18} />
              Chapters
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {chapters.map((chapter, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 3, color: "#3b82f6" }}
                  className="transition-colors"
                >
                  <a href="#" className="hover:underline flex items-center">
                    <Droplets size={12} className="mr-1 text-blue-400" />
                    {chapter}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-200 max-w-7xl mx-auto"></div>

      {/* Copyright Section */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col justify-between items-center">
          <motion.p
            className="text-sm text-blue-600 mb-4 sm:mb-0 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Copyright © 2025 Indian Plumbing Association - Designed & Developed
            by Recherche Digital Pvt Ltd
          </motion.p>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-6 underline">
            {copyrightLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                className="text-sm text-blue-600"
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
