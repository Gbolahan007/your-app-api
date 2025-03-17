import { FiShoppingCart } from "react-icons/fi";

function HeaderCart() {
  return (
    <div className="relative">
      {/* Cart Icon */}
      <FiShoppingCart size={28} className="text-blue-800" />

      {/* Cart Count Badge at the Tip */}
      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white shadow-md">
        0
      </div>
    </div>
  );
}

export default HeaderCart;
