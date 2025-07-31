"use client";

import { Input, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

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
  backgroundImage = "/image/banner2.png"
}: HeroSectionProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter your email");
      return;
    }
    // ... phần xử lý đăng ký
  };

  return (
    <div
      className="relative min-h-[60vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'revert'
      }}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div className="container mx-auto px-8 relative z-10 text-center">
        <Typography variant="h1" color="white" className="mb-6 text-4xl md:text-5xl">
          {title}
        </Typography>
        {description && (
          <Typography variant="lead" color="white" className="mb-8 max-w-3xl mx-auto">
            {description}
          </Typography>
        )}
        {showEmailForm && (
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 text-white"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isLoading ? 'Đang gửi...' : 'Đăng ký'}
              </Button>
            </div>
            {status && <p className="mt-2 text-green-400">{status}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default HeroSection;