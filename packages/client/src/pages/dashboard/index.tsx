import { useQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import Navbar from "../../components/Navbar";
import CreateProduct from "./CreateProduct";
import ListProduct from "./ListProduct";
import { REFRESH_TOKEN } from "../../features/query/token";

const Dashboard = () => {
  const { data: accessToken } = useQuery(REFRESH_TOKEN);

  const decodeData = jwtDecode<any>(accessToken).catch((err: string) =>
    console.log(err)
  );

  console.log("data login:", decodeData);
  return (
    <>
      <div className="h-min-screen">
        <Navbar />
        <ListProduct />
      </div>
      <CreateProduct />
    </>
  );
};

export default Dashboard;
