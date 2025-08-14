// Update the HeroSection.tsx
"use client";

import { Input, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import RegistrationForm from "./registration-form";

interface HeroSectionProps {
  title?: string;
  description?: string;
  showEmailForm?: boolean;
  backgroundImage?: string;
}

const HeroSection = ({
  title = "Welcome to my Web Movie for you!",
  description = "Watch full seasons of exclusive streaming series, current-season episodes, hit movies, Hulu Originals, kids shows, and more.",
  showEmailForm = true,
  backgroundImage = "/image/banner4.png"
}: HeroSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [showRegistration, setShowRegistration] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("Vui lòng nhập email của bạn");
      return;
    }
    setShowRegistration(true);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    setStatus("Đăng ký thành công! Vui lòng kiểm tra email của bạn.");
    setEmail("");
  };

  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          {showEmailForm && (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <div className="flex-grow">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="w-full px-6 py-4 rounded-full text-gray-900 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition whitespace-nowrap"
              >
                {isLoading ? "Đang xử lý..." : "Bắt đầu"}
              </button>
            </form>
          )}

          {status && (
            <p className="mt-4 text-yellow-300">
              {status}
            </p>
          )}
        </motion.div>
      </div>

      {showRegistration && (
        <RegistrationForm
          email={email}
          onClose={() => setShowRegistration(false)}
          onSuccess={handleRegistrationSuccess}
        />
      )}
    </div>
  );
};

export default HeroSection;