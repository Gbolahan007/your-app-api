import { useSearchParams } from "react-router-dom";
import { useProducts } from "../src/pages/useProducts";
import Loader from "./Loader";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function ProductList() {
  const { products = [], isLoadingProducts, error } = useProducts();
  const [searchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "all";
  const selectedCountry = searchParams.get("country") || "all";

  // Handle loading state
  if (isLoadingProducts) return <Loader />;

  // Handle error state
  if (error)
    return (
      <div className="text-red-500">
        Error loading products: {error.message}
      </div>
    );

  let filteredProducts = products || [];

  // Filter by category
  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory,
    );
  }

  // Filter by country - only apply when category is badges
  if (selectedCountry !== "all" && selectedCategory === "badges") {
    filteredProducts = filteredProducts.filter(
      (product) => product.country.toLowerCase() === selectedCountry,
    );
  }

  return (
    <div className="container mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-green-600">
        Our Products ({filteredProducts.length})
      </h1>

      {/* Product List */}
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="rounded-lg border p-4 shadow-md">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="mb-3 h-64 w-full rounded-md object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg"; // Fallback image
                }}
              />
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>

              <p className="text-sm text-gray-700">{product.description}</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(product.price)}
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
