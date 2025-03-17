import BestSellerItem from "./BestSellerItem";
import Loader from "./Loader";
import { useProductCategory } from "./pages/useProductCategory";

function BestSeller() {
  const { productsCategory, isLoadingProductsCategory } = useProductCategory();

  if (isLoadingProductsCategory) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Section Heading */}
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Best Sellers
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {productsCategory.map((item) => (
          <BestSellerItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;
