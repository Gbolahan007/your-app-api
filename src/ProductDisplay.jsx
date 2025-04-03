import Loader from "./Loader";
import { useProduct } from "./pages/useProduct";
import { useMoveBack } from "./hooks/useMoveBack";
import { useRelatedProducts } from "./pages/useRelatedProduct";
import RelatedItem from "./RelatedItem";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { useState } from "react";

function formatCurrency(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function ProductDisplay() {
  const { isLoadingProduct, product } = useProduct();
  const moveBack = useMoveBack();
  const { isLoadingRelatedProduct, relatedProducts } = useRelatedProducts(
    product?.category,
    product?.id,
  );

  const [activeTab, setActiveTab] = useState("details");

  if (isLoadingProduct) return <Loader />;

  const { name, image, category, description, price } = product;

  return (
    <div className="bg-white font-tektur">
      {/* Product Details */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <button
          onClick={moveBack}
          className="mb-6 flex items-center text-gray-600 transition-colors hover:text-black"
        >
          <AiOutlineArrowLeft size={18} className="mr-1" />
          <span>Back to products</span>
        </button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Image */}
          <div className="overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
            <img
              src={image}
              className="h-full w-full object-cover object-center sm:h-[500px]"
              alt={name}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                {category}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                {name}
              </h1>
              <p className="mt-4 text-2xl font-semibold text-gray-900">
                {formatCurrency(price)}
              </p>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="relative flex space-x-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === "details"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Product Details
                </button>
                <button
                  onClick={() => setActiveTab("review")}
                  className={`pb-4 text-sm font-medium ${
                    activeTab === "review"
                      ? "border-b-2 border-black text-black"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Reviews
                </button>
              </div>

              <div className="mt-6">
                {activeTab === "details" ? (
                  <p className="text-base leading-relaxed text-gray-700">
                    {description}
                  </p>
                ) : (
                  <div className="text-gray-700">
                    <p className="text-base">
                      This product has no reviews yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h2 className="mb-3 text-sm font-medium text-gray-900">
                Quantity
              </h2>
              <div className="flex h-10 w-32 items-center">
                <button className="flex h-full w-10 items-center justify-center rounded-l-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <AiOutlineMinus size={16} />
                </button>
                <div className="flex h-full w-12 items-center justify-center border-y border-gray-300 bg-white text-center font-medium">
                  0
                </div>
                <button className="flex h-full w-10 items-center justify-center rounded-r-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200">
                  <AiOutlinePlus size={16} />
                </button>
              </div>
            </div>

            {/* Buy and Add to Cart Buttons */}
            <div className="mt-auto flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="w-full rounded-lg bg-black px-6 py-3 text-center font-medium text-white shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto sm:flex-1">
                Buy Now
              </button>
              <button className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto sm:flex-1">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-32 bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900">
            You might also like
          </h2>

          {isLoadingRelatedProduct ? (
            <div className="flex items-center justify-center py-8">
              <Loader />
            </div>
          ) : relatedProducts && relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedItem) => (
                <RelatedItem key={relatedItem.id} relatedItems={relatedItem} />
              ))}
            </div>
          ) : (
            <p className="py-12 text-center text-gray-500">
              No related products found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;
