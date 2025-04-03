import { FaCheck, FaHeart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      product: "Nursing Scrub",
      rating: 5,
      verified: true,
      recommends: true,
      review:
        "I love this nursing scrub! It’s soft, durable, and breathable—perfect for long shifts. Comfortable, professional, and a game-changer compared to others I’ve worn.",
    },
    {
      name: "Michella Chen",
      product: "Nursing Badge",
      rating: 4,
      verified: true,
      recommends: true,
      review:
        "The nursing badge is top-notch! Precise stitching, vibrant colors, and excellent quality. A perfect, professional touch to my scrubs.",
    },
    {
      name: "Priya Patel",
      product: "Premium Cap",
      rating: 5,
      verified: true,
      recommends: true,
      review:
        "Perfect fit and extremely comfortable. The material is breathable and the adjustable strap makes it suitable for everyone. Highly recommend!",
    },
    {
      name: "Ella Wilson",
      product: "Organic T-shirt",
      rating: 4,
      verified: true,
      recommends: true,
      review:
        "Super soft material and the fit is just right. The eco-friendly fabric feels great against the skin. Will definitely buy more colors!",
    },
  ];

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <FaStar
          key={index}
          className={`${index < rating ? "text-black" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      <h2 className="relative mx-auto mb-8 w-fit text-center text-2xl font-bold after:absolute after:-bottom-4 after:left-1/2 after:h-1 after:w-24 after:-translate-x-1/2 after:rounded-full after:bg-green-600">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reviews.map((review, index) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
            }}
            key={index}
            className="flex flex-col rounded-lg bg-white p-6 shadow-md"
          >
            <div className="mb-3">
              <h3 className="text-lg font-bold">{review.name}</h3>
              <p className="mb-1 text-sm text-gray-500">on {review.product}</p>
              <div className="mb-2 flex items-center space-x-1">
                {renderStars(review.rating)}
              </div>

              <div className="mb-4 flex items-center space-x-2">
                {review.verified && (
                  <div className="flex items-center text-sm text-green-600">
                    <FaCheck className="mr-1" />
                    <span>Verified Customer</span>
                  </div>
                )}
              </div>
            </div>

            <p className="mb-4 flex-grow text-gray-700">{review.review}</p>

            {review.recommends && (
              <div className="mt-auto flex items-center text-sm text-red-500">
                <FaHeart className="mr-1" />
                <span>I recommend this product</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
