import { lazy, Suspense } from "react";
import Loader from "../Loader";

const HeroSection = lazy(() => import("../HeroSection"));
const BrandDescription = lazy(() => import("../BrandDescription"));
const FeaturedCategory = lazy(() => import("../FeaturedCategory"));

function Home() {
  return (
    <div className="relative w-full">
      <Suspense fallback={<Loader />}>
        <HeroSection />
        <BrandDescription />
        <FeaturedCategory />
      </Suspense>
    </div>
  );
}

export default Home;
