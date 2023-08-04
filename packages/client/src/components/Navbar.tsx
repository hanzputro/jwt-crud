import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-[#1d232a] text-white px-5">
      <div className="flex-1">
        <h5 className="text-md font-bold">JWT CRUD</h5>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          <li>
            <a href="/login" className="hover:text-gray-300 ">
              Logout <FiLogOut />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
