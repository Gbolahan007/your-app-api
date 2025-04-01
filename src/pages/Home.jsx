import { lazy, Suspense, useState } from "react";
import Loader from "../Loader";
import StickyButton from "../StickyButton";
import UnderConstructionModal from "../UnderConstructionModal"; // Import the modal

const HeroSection = lazy(() => import("../HeroSection"));
const BrandDescription = lazy(() => import("../BrandDescription"));
const FeaturedCategory = lazy(() => import("../FeaturedCategory"));
const BestSeller = lazy(() => import("../BestSeller"));

function Home() {
  const [isOpen, setIsOpen] = useState(true); // Control modal state

  return (
    <div className="relative w-full">
      {/* Show the modal if it's open */}
      {isOpen && (
        <UnderConstructionModal setIsOpen={setIsOpen} isOpen={isOpen} />
      )}

      <Suspense fallback={<Loader />}>
        <HeroSection />
        <BrandDescription />
        <FeaturedCategory />
        <BestSeller />
      </Suspense>

      <StickyButton />
    </div>
  );
}

export default Home;
