"use client";

import Image from "next/image";
import { Input, Button, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { useState } from "react";
const MotionDiv = motion.div;

function Hero() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter your email");
      return;
    }

    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Thành công!');
        setEmail('');
      } else {
        setStatus(data.error || 'Không thành công');
      }
    } catch (error) {
      setStatus('Đã xảy ra lỗi, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <header className="bg-black p-8">
      <div className="container mx-auto grid h-full gap-10 min-h-[60vh] w-full grid-cols-1 items-center lg:grid-cols-2">
        <div className="row-start-2 lg:row-auto">
          <MotionDiv
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <MotionDiv
              initial={{ opacity: 0, y: 100, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                duration: 0.4,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <Typography
                variant="h1"
                color="white"
                className="mb-4 lg:text-5xl !leading-tight text-3xl"
              >
                Welcome to my Web <br /> Development Portofolio!
              </Typography>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                duration: 0.8,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.6 }}
            >
              <Typography
                variant="lead"
                className="mb-4 !text-gray-500 md:pr-16 xl:pr-28"
              >
                I&apos;m Lily Smith, a passionate web developer based in USA. Here,
                you&apos;ll get a glimpse of my journey in the world of web
                development, where creativity meets functionality.
              </Typography>
            </MotionDiv>
            <form onSubmit={handleSubscribe} className="grid">
              <Typography
                variant="small"
                className="mb-2 text-white font-medium"
              >
                Your email
              </Typography>
              <div className="mb-2 flex w-full flex-col gap-4 md:w-10/12 md:flex-row">
                <Input
                  color="gray"
                  label="Enter your email"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <Button
                  type="submit"
                  color="gray"
                  className="w-full px-4 md:w-[12rem]"
                  disabled={isLoading}
                >
                  {isLoading ? 'Subscribing...' : 'require offer'}
                </Button>
              </div>
              {status && (
                <Typography
                  variant="small"
                  className={`mt-2 ${status.includes('Successfully') ? 'text-green-400' : 'text-red-400'}`}
                >
                  {status}
                </Typography>
              )}
            </form>
            <Typography variant="small" className="font-normal !text-gray-500">
              Read my{" "}
              <a href="#" className="font-medium underline transition-colors">
                Terms and Conditions
              </a>
            </Typography>
          </MotionDiv>
        </div>
        <MotionDiv
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <MotionDiv
            initial={{ opacity: 0, x: 100, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 12,
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <Image
              width={1024}
              height={1024}
              alt="team work"
              src="/image/image-7.svg"
              className="h-[36rem] w-full rounded-xl object-cover"
            />
          </MotionDiv>
        </MotionDiv>
      </div>
    </header>
  );
}

export default Hero;
