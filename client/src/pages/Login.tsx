import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../features/mutation/user";
import AlertGroup from "../components/AlertGroup";

const schemaLogin = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(5, "Your password is too short"),
  })
  .required();

const Login = () => {
  const [loginUser] = useMutation(LOGIN_USER);

  const [passwordType, setPasswordType] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  interface submitType {
    email: string;
    password: string;
  }

  const onSubmit = (data: submitType) => {
    setLoading(true);
    loginUser({
      variables: {
        email: data.email,
        password: data.password,
      },
    })
      .then(() => {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          setLoading(false);
          navigate("/dashboard");
        }, 2000);
      })
      .catch((err) => {
        setMessageError(err.message);
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
          setLoading(false);
        }, 2000);
      });
  };

  const handleChangePasswordType = () => {
    setPasswordType(!passwordType);
  };

  return (
    <>
      <AlertGroup
        messageError={messageError}
        messageSuccess="Your login has been succeeded!"
        statusError={formError}
        statusSuccess={submitSuccess}
        statusLoading={loading}
      />

      <div
        className={`flex items-center h-full ${
          loading && "pointer-events-none"
        }`}
      >
        <div className="w-1/2 h-full bg-gradient-to-r from-indigo-400 to-teal-400 flex flex-col justify-center items-center">
          <h1 className="text-9xl font-bold text-[#1d232a]">JWT</h1>
          <h1 className="text-9xl font-bold text-[#1d232a]">CRUD</h1>
        </div>

        <div className="w-1/2 h-full flex flex-col justify-center items-center pl-5 bg-[#1d232a]">
          <div className="w-3/4 max-w-md">
            <h1 className="text-5xl font-bold text-white mb-2">Welcome</h1>
            <p className="mb-10 font-light text-gray-400">
              Sign in to continue
            </p>

            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-md input-bordered w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm ml-5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="form-control w-full relative mb-3">
                <input
                  type={passwordType ? "password" : "text"}
                  placeholder="Password"
                  className="input input-md input-bordered w-full"
                  {...register("password")}
                />
                <label className="swap swap-rotate absolute top-[15px] right-4">
                  <input type="checkbox" onChange={handleChangePasswordType} />
                  <AiFillEye className="swap-on fill-gray-500 w-5 h-5" />
                  <AiFillEyeInvisible className="swap-off fill-gray-700 w-5 h-5" />
                </label>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-5">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button className="btn btn-accent w-full mb-2">LOGIN</button>
            </form>

            <div className="divider text-gray-700 before:bg-gray-700 after:bg-gray-700 before:h-[1px] after:h-[1px]">
              OR
            </div>
            <Link to="/register" className="btn btn-primary w-full">
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
