import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AlertGroup from "../components/AlertGroup";
import { CREATE_USER } from "../services/mutation/user";

const schemaRegister = yup
  .object()
  .shape({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Please enter your email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(5, "Your password is too short"),
    confirmPassword: yup
      .string()
      .required("Please confirmation your password")
      .oneOf([yup.ref("password")], "Your passwords do not match"),
  })
  .required();

const Register = () => {
  const [createUser] = useMutation(CREATE_USER);

  const [passwordType, setPasswordType] = useState<any>();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  interface submitType {
    username: string;
    email: string;
    password: string;
  }

  const onSubmit = (data: submitType) => {
    createUser({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
      .then(() => {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setMessageError(err.message);
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
        }, 2000);
      });
  };

  const handleChangePasswordType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordType({ ...passwordType, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <AlertGroup
        messageError={messageError}
        messageSuccess="Your register has been succeeded!"
        statusError={formError}
        statusSuccess={submitSuccess}
        statusLoading={submitSuccess}
      />

      <div
        className={`flex items-center h-full ${
          submitSuccess && "pointer-events-none"
        }`}
      >
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

              <div className="form-control mb-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-md input-bordered w-full"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm ml-5">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="form-control w-full relative mb-3">
                <input
                  type={Boolean(passwordType?.password) ? "text" : "password"}
                  placeholder="Password"
                  className="input input-md input-bordered w-full"
                  {...register("password")}
                />
                <label className="swap swap-rotate absolute top-[15px] right-4">
                  <input
                    name="password"
                    type="checkbox"
                    onChange={handleChangePasswordType}
                  />
                  <AiFillEye className="swap-on fill-gray-400 w-5 h-5" />
                  <AiFillEyeInvisible className="swap-off fill-gray-700 w-5 h-5" />
                </label>
                {errors.password && (
                  <p className="text-red-500 text-sm ml-5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="form-control w-full relative mb-3">
                <input
                  type={
                    Boolean(passwordType?.confirmPassword) ? "text" : "password"
                  }
                  placeholder="Confirm Password"
                  className="input input-md input-bordered w-full"
                  {...register("confirmPassword")}
                />
                <label className="swap swap-rotate absolute top-[15px] right-4">
                  <input
                    name="confirmPassword"
                    type="checkbox"
                    onChange={handleChangePasswordType}
                  />
                  <AiFillEye className="swap-on fill-gray-400 w-5 h-5" />
                  <AiFillEyeInvisible className="swap-off fill-gray-700 w-5 h-5" />
                </label>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm ml-5">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button className="btn btn-accent w-full mb-2">REGISTER</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
