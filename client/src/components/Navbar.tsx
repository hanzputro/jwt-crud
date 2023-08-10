import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-[#1d232a] text-white px-5">
      <div className="flex-1">
        <h5 className="text-md font-bold">JWT CRUD</h5>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary className="hover:text-white">test 1</summary>
              <ul className="!p-0  !mt-3 bg-base-100 shadow-xl border border-gray-300">
                <li>
                  <Link
                    to="/dashboard"
                    className="text-stone-800 hover:text-stone-800"
                  >
                    My Product
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-stone-800 hover:text-stone-800"
                  >
                    Logout <FiLogOut />
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
