import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Item from "../components/Item";
import Modal from "../components/Modal";
import { FaSearch } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";

const Home = () => {
  return (
    <>
      <div className="h-min-screen">
        <Navbar />
        <div className="p-5 mt-5">
          <div className="flex justify-end">
            <div className="relative inline-block text-right mb-6">
              <FaSearch className="absolute my-auto inset-y-0 left-3 fill-gray-500 w-3 h-3" />
              <input
                className="input input-sm !bg-gray-100 border border-gray-300 w-full pl-8"
                id="search"
                placeholder="Search..."
                onChange={() => null}
              />
            </div>
          </div>

          <label htmlFor="my_modal_6">
            <AiFillPlusCircle className="fixed right-5 bottom-5 w-16 h-16 text-indigo-600 cursor-pointer hover:text-indigo-700" />
          </label>

          <div className="grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xs:gap-2 lg:gap-4">
            <Item />
          </div>

          <Pagination />
        </div>
      </div>

      <Modal />
    </>
  );
};

export default Home;
