// app/page.tsx
"use client";

import { Navbar, Footer } from "@/components";
import HeroSection from "@/components/HeroSection";
import Clients from "./clients";
import ListMovie from "./list-movie";
import Category from "./category";
import Testimonial from "./testimonial";
import PopularClients from "./popular-clients";
import ContactForm from "./contact-form";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Clients />
      {/* <ListMovie /> */}
      <Category />
      <Testimonial />
      <PopularClients />
      <ContactForm />
      <Footer />
    </>
  );
}