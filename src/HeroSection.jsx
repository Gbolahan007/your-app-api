import { useNavigate } from "react-router-dom";

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
      <div className="font-bigshoulders absolute right-24 top-1/2 hidden max-w-md -translate-y-1/2 text-white sm:block lg:right-64">
        <h1 className="text-2xl font-bold uppercase md:text-3xl">
          Limited Time Only
        </h1>
        <h2 className="mt-2 text-3xl font-extrabold text-green-400 md:text-5xl">
          Up to 20% Off
        </h2>
        <p className="mt-3 text-base text-gray-300 md:text-lg">
          Upgrade your workwear with comfort, quality,{" "}
          <br className="hidden md:inline" />
          and unbeatable deals.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="mt-5 rounded-lg bg-green-500 px-6 py-3 text-lg font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-green-600"
        >
          Shop Now
        </button>
      </div>

      {/* Mobile Text Below Image */}
      <div className="font-bigshoulders flex flex-col p-4 text-black sm:hidden">
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
