import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [passwordType, setPasswordType] = useState(true);

  const handleChangePasswordType = () => {
    setPasswordType(!passwordType);
  };

  return (
    <div className="flex items-center h-full">
      <div className="w-1/2 h-full bg-gradient-to-r from-teal-400 to-indigo-400 flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold text-[#1d232a]">JWT</h1>
        <h1 className="text-9xl font-bold text-[#1d232a]">CRUD</h1>
      </div>

      <div className="w-1/2 h-full flex flex-col justify-center items-center pl-5 bg-[#1d232a]">
        <div className="w-3/4 max-w-md">
          <h1 className="text-5xl font-bold text-white mb-2">Register</h1>
          <p className="mb-10 font-light text-gray-400">
            Please register to create your account
          </p>
          <form className="w-full">
            <div className="form-control mb-3">
              <input
                id="email"
                type="text"
                placeholder="Email"
                className="input input-md input-bordered w-full input-error"
              />
            </div>

            <div className="form-control mb-3">
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="input input-md input-bordered w-full input-error"
              />
            </div>

            <div className="form-control w-full relative mb-3">
              <input
                id="password"
                type={passwordType ? "password" : "text"}
                placeholder="Password"
                className="input input-md input-bordered w-full"
              />
              <label className="swap swap-rotate absolute inset-y-0 right-4">
                <input type="checkbox" onChange={handleChangePasswordType} />
                <AiFillEye className="swap-on fill-current w-5 h-5" />
                <AiFillEyeInvisible className="swap-off fill-current w-5 h-5" />
              </label>
            </div>

            <div className="form-control w-full relative mb-3">
              <input
                id="confPassword"
                type={passwordType ? "password" : "text"}
                placeholder="Confirm Password"
                className="input input-md input-bordered w-full"
              />
              <label className="swap swap-rotate absolute inset-y-0 right-4">
                <input type="checkbox" onChange={handleChangePasswordType} />
                <AiFillEye className="swap-on fill-current w-5 h-5" />
                <AiFillEyeInvisible className="swap-off fill-current w-5 h-5" />
              </label>
            </div>

            <button className="btn btn-accent w-full mb-2">REGISTER</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
