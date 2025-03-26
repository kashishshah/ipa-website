"use client";

import Carousel from "@/components/Carousel";
import EventCards from "@/components/EventCards";
import AboutSection from "@/components/AboutSection";
import EventReviews from "@/components/EventReviews";
import AboutIPA from "@/components/AboutIPA";
import BecomeMember from "@/components/BecomeMember";
import IPAChapters from "@/components/IPAChapters";
import AccreditedPublications from "@/components/AccreditedPublications";
import IPAMilestones from "@/components/IPAMilestones";
import SocialMedia from "@/components/SocialMedia";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Header placeholder */}
      <Header />
      {/* Main content placeholder */}
      <main className="container">
        <div className="p-4 flex items-center justify-center">
          <Carousel />
        </div>
        <div className="my-6">
          <EventCards />
        </div>
        <div className="my-6">
          <AboutSection />
        </div>
        <div className="my-6">
          <EventReviews />
        </div>
        <div className="my-6">
          <AboutIPA />
          <BecomeMember />
        </div>
        <div className="my-6">
          <IPAChapters />
          <AccreditedPublications />
        </div>
        <div className="my-6">
          <IPAMilestones />
        </div>
        <div className="my-6">
          <SocialMedia />
          <BecomeMember />
        </div>
        <Footer />
      </main>
    </div>
  );
}
