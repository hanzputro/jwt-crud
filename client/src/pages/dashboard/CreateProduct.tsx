import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../components/Modal";
import { CREATE_PRODUCT } from "../../features/mutation/product";
import { GET_USER } from "../../features/query/user";
import AlertGroup from "../../components/AlertGroup";
import { AiFillPlusCircle } from "react-icons/ai";

const schemaCreateProduct = yup
  .object()
  .shape({
    productName: yup.string().required("please fill out this product name"),
    stock: yup
      .number()
      .typeError("Must be a number")
      .required("please fill out this stock"),
    buyPrice: yup
      .number()
      .typeError("Must be a number")
      .required("please fill out this buy price"),
    sellPrice: yup
      .number()
      .typeError("Must be a number")
      .required("please fill out this sell price"),
    image: yup.string().required("please upload product image"),
  })
  .required();

const CreateProduct = () => {
  const { refetch } = useQuery(GET_USER);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [messageError, setMessageError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreateProduct),
  });

  interface submitType {
    productName: string;
    stock: number;
    buyPrice: number;
    sellPrice: number;
    image: string;
  }

  const onSubmit = (data: submitType) => {
    createProduct({
      variables: {
        productName: data.productName,
        stock: data.stock,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        image: data.image,
      },
    })
      .then(() => {
        refetch({ variable: {} });
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
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

  return (
    <>
      <AlertGroup
        messageError={messageError}
        messageSuccess="Your Product has been created!"
        statusError={formError}
        statusSuccess={submitSuccess}
        statusLoading={submitSuccess}
      />

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <Modal
          title="Product Form"
          cta={
            <button className="btn">
              {/* <label htmlFor="my_modal_6" className="cursor-pointer"> */}
              Submit
              {/* </label> */}
            </button>
          }
        >
          <div className="form-control mb-3">
            <div className="flex justify-center mb-5">
              <div className="avatar">
                <div className="w-[150px] rounded-xl">
                  <img src="" />
                </div>
              </div>
            </div>
            <input
              type="file"
              className="file-input file-input-ghost w-full"
              {...register("image")}
            />
            {errors.image && (
              <p className="text-red-500 text-xs font-bold ml-5">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="form-control mb-3">
            <input
              type="string"
              placeholder="Product Name"
              className="input input-md input-bordered w-full !bg-[#373466]"
              {...register("productName")}
            />
            {errors.productName && (
              <p className="text-red-500 text-xs font-bold ml-5">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div className="flex space-x-2">
            <div className="form-control mb-3">
              <input
                type="number"
                placeholder="Stock"
                className="input input-md input-bordered w-full !bg-[#373466]"
                {...register("stock")}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs font-bold ml-5">
                  {errors.stock.message}
                </p>
              )}
            </div>

            <div className="form-control mb-3">
              <input
                type="number"
                placeholder="Buy Price"
                className="input input-md input-bordered w-full !bg-[#373466]"
                {...register("buyPrice")}
              />
              {errors.buyPrice && (
                <p className="text-red-500 text-xs font-bold ml-5">
                  {errors.buyPrice.message}
                </p>
              )}
            </div>

            <div className="form-control mb-3">
              <input
                type="number"
                placeholder="Sell Price"
                className="input input-md input-bordered w-full !bg-[#373466]"
                {...register("sellPrice")}
              />
              {errors.sellPrice && (
                <p className="text-red-500 text-xs font-bold ml-5">
                  {errors.sellPrice.message}
                </p>
              )}
            </div>
          </div>
        </Modal>
      </form>

      <label htmlFor="my_modal_6">
        <AiFillPlusCircle className="fixed right-5 bottom-5 w-16 h-16 text-accent cursor-pointer" />
      </label>
    </>
  );
};

export default CreateProduct;
