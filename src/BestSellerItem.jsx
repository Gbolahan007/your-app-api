import { useNavigate } from "react-router-dom";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
function BestSellerItem({ item }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/products")}
      className="group cursor-pointer rounded-xl bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg"
    >
      {/* Product Image */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-2">
        <h3 className="truncate text-lg font-semibold text-gray-800">
          {item.name}
        </h3>
        <p className="text-sm font-medium text-gray-500">{item.category}</p>

        {/* Product Description */}
        <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>

        {/* Price & Button */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Price */}
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(item.price)}
          </span>

          {/* Add to Cart Button - Centered on Mobile */}
          <button className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 sm:mt-0 sm:w-auto">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BestSellerItem;
