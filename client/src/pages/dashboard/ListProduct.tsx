// import Pagination from "../../components/Pagination";
import Product from "../../components/Product";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xs:gap-2 lg:gap-4">
        <Product />
      </div>

      {/* <Pagination /> */}
    </div>
  );
};

export default Home;
