import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setActiveImage(0);

    const initialTextTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    let textTimer;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % 7);

      setShowText(false);
      textTimer = setTimeout(() => {
        setShowText(true);
      }, 1000);
    }, 7000);

    return () => {
      clearTimeout(initialTextTimer);
      clearTimeout(textTimer);
      clearInterval(interval);
    };
  }, []);

  const images = [
    { desktop: "/logowwww.jpg", mobile: "/badge.webp" },
    { desktop: "/logo-display-1.webp", mobile: "/badge-1.webp" },
    { desktop: "/logowwww.jpg", mobile: "/mobilel.JPG" },
    { desktop: "/logo-display-1.webp", mobile: "/loogo.JPG" },
    { desktop: "/logowwww.jpg", mobile: "/mobilelog.JPG" },
    { desktop: "/logo-display-1.webp", mobile: "/mobilelo.JPG" },
    { desktop: "/logowwww.jpg", mobile: "/mobileloo.JPG" },
  ];

  const isGreenTheme = activeImage % 2 === 0;

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop Images */}
      <div className="relative hidden h-[500px] w-full sm:block">
        <AnimatePresence>
          {images.map(
            (image, index) =>
              activeImage === index && (
                <motion.img
                  key={`desktop-${index}`}
                  src={image.desktop}
                  alt={`Nursing Accessories ${index + 1}`}
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Images */}
      <div className="relative h-[350px] w-full sm:hidden">
        <AnimatePresence>
          {images.map(
            (image, index) =>
              activeImage === index && (
                <motion.img
                  key={`mobile-${index}`}
                  src={image.mobile}
                  alt={`Nursing Accessories ${index + 1}`}
                  className="absolute left-0 top-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              ),
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Text Overlay */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
            className="absolute left-[10%] top-[15%] hidden p-3 font-bigshoulders text-white md:left-[30%] md:top-[15%] md:block lg:left-[40%] lg:top-[25%]"
          >
            <h1 className="text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
              Limited Time Only
            </h1>
            <h2
              className={`mt-2 text-3xl font-extrabold ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] bg-clip-text text-transparent"
                  : "text-blue-500"
              } md:text-4xl lg:text-7xl`}
            >
              Up to 20% Off
            </h2>

            <p className="mt-4 text-lg text-gray-300 md:text-xl lg:text-2xl">
              Upgrade your workwear with comfort, quality,
              <br className="hidden md:inline" />
              and unbeatable deals.
            </p>
            <button
              onClick={() => navigate("/products")}
              className={`mt-6 rounded-lg px-8 py-4 text-xl font-semibold text-white transition-transform duration-300 hover:scale-105 ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Shop Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Text Overlay */}
      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="flex flex-col p-4 font-bigshoulders text-black sm:hidden"
          >
            <h1 className="text-2xl font-bold uppercase">Limited Time Only</h1>

            <h2
              className={`mt-1 text-3xl font-extrabold ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] bg-clip-text text-transparent"
                  : "text-blue-500"
              }`}
            >
              Up to 20% Off
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Comfort, quality & unbeatable deals.
            </p>
            <button
              onClick={() => navigate("/products")}
              className={`mt-4 w-full max-w-[400px] rounded-lg px-5 py-3 text-base font-semibold text-white transition-transform duration-300 hover:scale-105 ${
                isGreenTheme
                  ? "bg-gradient-to-r from-green-400 to-[#20958d] hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Shop Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HeroSection;
