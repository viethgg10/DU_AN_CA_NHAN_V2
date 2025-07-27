"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Marquee from "react-fast-marquee";

const CLIENTS = [
  "coinbase",
  "spotify",
  "pinterest",
  "google",
  "amazon",
  "netflix",
];

export function Clients() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 20,
    },
    autoplay: {
      delay: 100,
      stopOnInteraction: false,
    },
  });
  return (
    <section className="px-8 py-28 bg-black">
      <div className="container mx-auto text-center">
        <Typography variant="h6" color="white" className="mb-8">
          My awesome clients
        </Typography>
        <div ref={sliderRef} className="flex flex-wrap items-center justify-center gap-6">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover
            className="flex items-center gap-10"
          >
            {CLIENTS.map((logo, key) => (
              <Image
                key={key}
                alt={logo}
                width={768}
                height={768}
                className="w-40 g-10"
                src={`/logos/logo-${logo}.svg`}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

export default Clients;
