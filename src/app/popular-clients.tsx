"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
const CLIENTS = [
  "coinbase",
  "spotify",
  "pinterest",
  "google",
  "amazon",
  "netflix",
];

export function PopularClients() {
  return (
    <section className="py-8 px-8 lg:py-20 bg-black">
      <div className="container mx-auto grid items-center place-items-center">
        <div className="text-center">
          <Typography variant="h6" className="mb-4 uppercase !text-gray-500">
            POPULAR CLIENTS
          </Typography>
          <Typography variant="h2" color="white" className="mb-4">
            Trusted by over 10,000+ <br /> clients
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {CLIENTS.map((logo, key) => (
            <motion.div
              key={key}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Image
                key={key}
                alt={logo}
                width={480}
                height={480}
                src={`/logos/logo-${logo}.svg`}
                className="w-40 grayscale opacity-75"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularClients;
