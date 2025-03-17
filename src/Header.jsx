import { HiOutlineBars4 } from "react-icons/hi2";
import Headercart from "./Headercart";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between bg-gray-200 p-2 md:justify-center lg:justify-around">
      {/* Logo */}
      <div className="w-20 cursor-pointer" onClick={() => navigate("/home")}>
        <img src="/seem-logo.jpg" className="h-full w-full" alt="seem logo" />
      </div>

      {/* Main Navigation - Hidden on Small Screens */}
      <main className="hidden w-full max-w-screen-md items-center justify-center gap-8 md:flex">
        <HeaderNav />
        <div className="flex items-center justify-center gap-5">
          {/* Search - Hidden on md Screens */}
          <div className="hidden lg:block">
            <HeaderSearch />
          </div>

          <Login />
          <Headercart />
        </div>
      </main>

      {/* Mobile Menu Button */}
      <div className="absolute right-4 top-3 cursor-pointer sm:hidden">
        <button>
          <HiOutlineBars4 size={27} />
        </button>
      </div>
    </nav>
  );
}

export default Header;
