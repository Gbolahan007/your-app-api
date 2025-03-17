import { lazy, Suspense } from "react";
import Loader from "../Loader";
import StickyButton from "../StickyButton";

const HeroSection = lazy(() => import("../HeroSection"));
const BrandDescription = lazy(() => import("../BrandDescription"));
const FeaturedCategory = lazy(() => import("../FeaturedCategory"));
const BestSeller = lazy(() => import("../BestSeller"));

function Home() {
  return (
    <div className="relative w-full">
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
