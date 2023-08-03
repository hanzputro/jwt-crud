const Pagination = () => {
  return (
    <div className="flex justify-center my-20">
      <div className="join border border-gray-300 rounded-full">
        <button className="join-item btn">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">99</button>
        <button className="join-item btn">100</button>
      </div>
    </div>
  );
};

export default Pagination;
