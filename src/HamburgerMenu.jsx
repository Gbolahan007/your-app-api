import { HiOutlineXMark } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HamburgerMenu({ isOpenModal, setIsOpenModal }) {
  const navigate = useNavigate();

  return (
    <div>
      {isOpenModal && (
        <>
          {/* Blurry Overlay with More Visible Background */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpenModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          {/* Sidebar - Slides from Right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="font-oswald text-custom-black fixed right-0 top-0 z-[1000] h-screen w-80 bg-white p-6 opacity-80 shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpenModal(false)}
              className="absolute right-4 top-4 rounded-md p-2 transition hover:bg-gray-200"
              aria-label="Close menu"
            >
              <HiOutlineXMark size={30} className="text-green-600" />
            </button>

            {/* Menu Items */}
            <ul className="mt-16 flex flex-col items-start gap-6 text-lg font-semibold">
              <li>
                <button
                  onClick={() => {
                    navigate("/");
                    setIsOpenModal(false);
                  }}
                  className="block w-full p-3 text-blue-600 transition hover:text-green-600"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/products");
                    setIsOpenModal(false);
                  }}
                  className="block w-full p-3 text-blue-600 transition hover:text-green-600"
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/contact");
                    setIsOpenModal(false);
                  }}
                  className="block w-full p-3 text-blue-600 transition hover:text-green-600"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpenModal(false);
                  }}
                  className="block w-full p-3 text-blue-600 transition hover:text-green-600"
                >
                  Login
                </button>
              </li>
            </ul>
          </motion.div>
        </>
      )}
    </div>
  );
}

export default HamburgerMenu;
