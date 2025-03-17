import { HiOutlineBars4 } from "react-icons/hi2";
import Headercart from "./Headercart";
import HeaderNav from "./HeaderNav";
import HeaderSearch from "./HeaderSearch";
import Login from "./Login";

function Header() {
  return (
    <nav className="justify-beetwen flex items-center bg-gray-200 p-2 lg:justify-around">
      <div className="w-20">
        <img src="/seem-logo.jpg" className="h-full w-full" alt="seem logo" />
      </div>

      {/* Main Navigation - Hidden on Small Screens */}
      <main className="hidden items-center justify-center gap-10 md:flex">
        <HeaderNav />
        <div className="ml-8 flex items-center justify-center gap-5">
          {/* Search - Hidden on md Screens */}
          <div className="hidden lg:block">
            <HeaderSearch />
          </div>

          <Login />
          <Headercart />
        </div>
      </main>

      <div className="absolute right-4 cursor-pointer sm:hidden">
        <button>
          <HiOutlineBars4 size={27} />
        </button>
      </div>
    </nav>
  );
}

export default Header;
