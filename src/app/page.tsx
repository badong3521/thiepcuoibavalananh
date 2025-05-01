"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const images = [
    {
      id: 1,
      src : "/thiep1.jpg"
    },
    {
      id: 2,
      src : "/thiep2.jpg"
    },
    {
      id: 3,
      src : "/thiep3.jpg"
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  };

  const buttonVariants = {
    rest: { scale: 1, opacity: 0.7 },
    hover: { 
      scale: 1.2, 
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    active: { 
      scale: 1.2, 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.4,
      transition: {
        duration: 0.2
      }
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + images.length) % images.length);
  };

  return (
    <main className="h-screen w-screen overflow-hidden bg-black/5">
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.8 },
              rotateY: { duration: 0.8 },
              scale: { duration: 0.8 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full perspective-1000"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={images[currentIndex].src}
                alt={`Thiệp mời cưới ${images[currentIndex].id}`}
                fill
                className="object-contain select-none transform-gpu"
                objectFit=""
                priority
                quality={100}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="absolute left-6 top-1/2 -translate-y-1/2 hover:bg-white/20 z-20 p-3 rounded-full backdrop-blur-sm bg-black/10"
          onClick={() => paginate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.button>

        <motion.button
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          className="absolute right-6 top-1/2 -translate-y-1/2 hover:bg-white/20 z-20 p-3 rounded-full backdrop-blur-sm bg-black/10"
          onClick={() => paginate(1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {images.map((_, index) => (
            <motion.button
              key={index}
              variants={dotVariants}
              initial="initial"
              animate={index === currentIndex ? "active" : "initial"}
              whileHover="hover"
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
