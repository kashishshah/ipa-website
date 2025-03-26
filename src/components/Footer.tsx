"use client";

import { motion } from "framer-motion";

// Link hover animation with glow
const linkVariants = {
  hover: {
    scale: 1.05,
    color: "#93c5fd",
    textShadow: "0 0 10px rgba(147, 197, 253, 0.5)",
    transition: { duration: 0.3 },
  },
  initial: { scale: 1, color: "#bfdbfe", textShadow: "none" },
};

// Social media icon hover animation with glow
const iconVariants = {
  hover: {
    scale: 1.2,
    filter: "drop-shadow(0 0 10px rgba(147, 197, 253, 0.5))",
    transition: { duration: 0.3 },
  },
  initial: { scale: 1, filter: "none" },
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
    },
    {
      platform: "X",
      link: "https://x.com/OfficialIPA",
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/company/officialipa",
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
    <footer className="w-full bg-blue-50 text-blue-600 overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-blue-600">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <motion.a
                  href="#"
                  variants={linkVariants}
                  initial="initial"
                  whileHover="hover"
                  className="text-sm"
                >
                  <span className="text-blue-600 hover:text-blue-900">
                    {link}
                  </span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">Contact</h3>
          <p className="text-sm">{contactInfo.address}</p>
          <p className="text-sm">{contactInfo.phone}</p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="text-sm text-blue-600 hover:text-blue-900"
          >
            {contactInfo.email}
          </a>
          <div className="flex space-x-4 mt-4">
            {socialMedia.map((media, index) => (
              <motion.a
                key={index}
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className="text-blue-600"
              >
                {media.platform === "Facebook" && (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                )}
                {media.platform === "X" && (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                )}
                {media.platform === "LinkedIn" && (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                )}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Chapters */}
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-4">Chapters</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {chapters.map((chapter, index) => (
              <li key={index}>{chapter}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-200 max-w-7xl mx-auto"></div>

      {/* Copyright Section */}
      <div className="bg-blue-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-blue-600 mb-2 sm:mb-0">
            Copyright © 2025 Indian Plumbing Association - Designed & Developed
            by Recherche Digital Pvt Ltd
          </p>
          <div className="flex space-x-4">
            {copyrightLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                variants={linkVariants}
                initial="initial"
                whileHover="hover"
                className="text-sm text-blue-600"
              >
                <span className="text-blue-600 hover:text-blue-900">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
