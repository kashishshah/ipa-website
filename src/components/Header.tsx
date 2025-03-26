"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Menu,
  X,
  Droplets,
  Users,
  Calendar,
  Info,
  Map,
  FileText,
  Video,
  Handshake,
  BookOpen,
  Contact,
  ChevronRight,
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsMobile] = useState(false);

  // Check if we're on mobile for initial render
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isMenuOpen &&
        !target.closest("#menu-container") &&
        !target.closest("#menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "HOME", icon: <Droplets size={16} /> },
    { name: "EVENT & ACTIVITIES", icon: <Calendar size={16} /> },
    { name: "ABOUT IPA", icon: <Info size={16} /> },
    { name: "CHAPTERS", icon: <Map size={16} /> },
    { name: "PUBLICATIONS", icon: <FileText size={16} /> },
    { name: "MEDIA ROOM", icon: <Video size={16} /> },
    { name: "COLLABORATIONS", icon: <Handshake size={16} /> },
    { name: "KNOWLEDGE CENTER", icon: <BookOpen size={16} /> },
    { name: "CONTACT US", icon: <Contact size={16} /> },
  ];
  return (
    <>
      {/* Top Bar (Contact and Social Media) */}
      <motion.div
        className="hidden md:block bg-white text-white py-2 px-4 md:px-8"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mb-2 md:mb-0">
            <motion.a
              href="mailto:hq@indianplumbing.org"
              className="flex items-center space-x-2 text-blue-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Mail size={16} className="animate-pulse" />
              <span className="text-sm">hq@indianplumbing.org</span>
            </motion.a>
            <motion.a
              href="tel:+91-11-49863152"
              className="flex items-center space-x-2 text-blue-900 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Phone size={16} className="animate-pulse" />
              <span className="text-sm">+91-11-4986 3152 / 4986 3153</span>
            </motion.a>
          </div>
          <div className="flex space-x-1">
            <motion.a
              href="https://facebook.com/indianplumbing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="Facebook"
            >
              <Facebook size={16} className="text-blue-600" />
            </motion.a>
            <motion.a
              href="https://twitter.com/indianplumbing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="Twitter"
            >
              <Twitter size={16} className="text-blue-600" />
            </motion.a>
            <motion.a
              href="https://youtube.com/indianplumbing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="YouTube"
            >
              <Youtube size={16} className="text-blue-600" />
            </motion.a>
            <motion.a
              href="https://linkedin.com/indianplumbing"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="LinkedIn"
            >
              <Linkedin size={16} className="text-blue-600" />
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Header with Logo, Menu Button and CTA */}
      <header className="sticky top-0 z-30 bg-white py-3 px-4 md:px-8 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="https://indianplumbing.org/wp-content/uploads/2023/08/logo-300x82.png"
              alt="Indian Plumbing Association Logo"
              width={150}
              height={41}
              className="w-52 h-16"
              priority
            />
          </div>

          <div className="flex items-center space-x-6">
            {/* CTA Button - Hidden on small screens */}
            <motion.button
              className="hidden sm:flex text-blue-600 px-4 py-2 font-medium items-center rounded-full"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0, 149, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Users className="mr-2" size={16} />
              <span className="text-sm">BECOME A MEMBER</span>
            </motion.button>

            {/* Menu Button - Always visible */}
            <motion.button
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className=" text-blue-600 p-2 rounded-full flex items-center justify-center transition-colors"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(0, 149, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
              transition={{ type: "spring", stiffness: 400 }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              id="menu-container"
              className="absolute right-0 top-0 h-full w-full sm:w-80 bg-white shadow-xl overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-blue-600 text-xl font-bold flex items-center">
                    <Droplets className="mr-2" /> IPA Menu
                  </h2>
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-blue-600 p-1 rounded-full hover:bg-white/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                {/* CTA Button - Visible only on small screens in menu */}
                <motion.button
                  className="sm:hidden w-full bg-blue-600 text-white px-4 py-3 rounded-full font-bold shadow-md flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Users className="mr-2" size={18} />
                  BECOME A MEMBER
                </motion.button>

                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative"
                    >
                      <motion.div
                        className="absolute inset-0 bg-blue-500/10 rounded-lg"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <Link
                        href="#"
                        className="flex items-center justify-between p-3 text-blue-500 rounded-lg relative z-10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="flex items-center">
                          <span className="mr-3 text-blue-500">
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </span>
                        <ChevronRight size={16} className="text-blue-500" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Contact info in menu */}
                <div className="mt-8 pt-6 border-t border-blue-700/20">
                  <h3 className="text-blue-600 font-medium mb-4">Contact Us</h3>
                  <div className="space-y-3 text-blue-600 text-sm">
                    <a
                      href="mailto:hq@indianplumbing.org"
                      className="flex items-center"
                    >
                      <Mail size={14} className="mr-2 text-blue-600" />
                      hq@indianplumbing.org
                    </a>
                    <a href="tel:+91-11-49863152" className="flex items-center">
                      <Phone size={14} className="mr-2 text-blue-600" />
                      +91-11-4986 3152 / 4986 3153
                    </a>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <a
                      href="https://facebook.com/indianplumbing"
                      className="p-2 bg-blue-600/10 rounded-full hover:bg-blue-600/20 transition-colors"
                    >
                      <Facebook size={14} className="text-blue-600" />
                    </a>
                    <a
                      href="https://twitter.com/indianplumbing"
                      className="p-2 bg-blue-600/10 rounded-full hover:bg-blue-600/20 transition-colors"
                    >
                      <Twitter size={14} className="text-blue-600" />
                    </a>
                    <a
                      href="https://youtube.com/indianplumbing"
                      className="p-2 bg-blue-600/10 rounded-full hover:bg-blue-600/20 transition-colors"
                    >
                      <Youtube size={14} className="text-blue-600" />
                    </a>
                    <a
                      href="https://linkedin.com/indianplumbing"
                      className="p-2 bg-blue-600/10 rounded-full hover:bg-blue-600/20 transition-colors"
                    >
                      <Linkedin size={14} className="text-blue-600" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
