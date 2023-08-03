import { AiFillCloseCircle } from "react-icons/ai";

const Item = () => {
  return (
    <div className="card border-2 drop-shadow-xl bg-gradient-to-r from-slate-100 to-stone-100 overflow-hidden">
      <AiFillCloseCircle
        className="absolute top-2 right-2 cursor-pointer w-5 h-5 text-red-900"
        onClick={null}
      />
      <figure className="xs:w-full lg:w-1/2 h-full min-h-[100px] bg-gradient-to-r from-gray-300">
        <img
          src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="mesin kopi"
        />
      </figure>
      <div className="card-body p-4 lg:pt-8">
        <h2 className="card-title text-[16px] text-gray-800">
          Mesin Espresso Besar
        </h2>
        <p className="text-[12px] text-gray-400">
          with this machine your work so well done.
        </p>
        <div className="card-actions  justify-between items-center">
          <p className="text-xs text-cyan-600">Buy Rp 2.000</p>
          <p className="text-gray-400 text-center">➜</p>
          <p className="text-xs text-emerald-600 text-right">Sell Rp 4.000</p>
        </div>
        <p className="text-right text-xs text-gray-400">3 items</p>
      </div>
    </div>
  );
};

export default Item;
