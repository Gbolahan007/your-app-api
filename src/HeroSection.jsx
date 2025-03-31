import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full">
      {/* Desktop Image */}
      <img
        src="/logo-display.webp"
        alt="Nursing Accessories"
        className="hidden h-auto w-full sm:block"
      />
      {/* Mobile Image */}
      <img
        src="/mobile-loogoo.webp"
        alt="Nursing Accessories"
        className="h-auto w-full sm:hidden"
      />

      {/* Desktop Text Overlay */}
      <motion.div
        initial={{ x: "100px", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
        className="absolute right-24 top-40 hidden p-3 font-bigshoulders text-white sm:block lg:right-64"
      >
        <h1 className="text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
          Limited Time Only
        </h1>
        <h2 className="mt-2 text-5xl font-extrabold text-green-400 md:text-6xl lg:text-7xl">
          Up to 20% Off
        </h2>
        <p className="mt-4 text-lg text-gray-300 md:text-xl lg:text-2xl">
          Upgrade your workwear with comfort, quality,
          <br className="hidden md:inline" />
          and unbeatable deals.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-6 rounded-lg bg-green-500 px-8 py-4 text-xl font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-green-600"
        >
          Shop Now
        </button>
      </motion.div>

      {/* Mobile Text Below Image */}
      <div className="flex flex-col p-4 font-bigshoulders text-black sm:hidden">
        <h1 className="text-2xl font-bold uppercase">Limited Time Only</h1>
        <h2 className="mt-1 text-3xl font-extrabold text-green-500">
          Up to 20% Off
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          Comfort, quality & unbeatable deals.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 w-full max-w-[400px] rounded-lg bg-green-500 px-5 py-3 text-base font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-green-600"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
