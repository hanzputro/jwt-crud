import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

interface AlertType {
  message: string | any;
  type: "alert-success" | "alert-error";
}

const Alert = ({ message, type }: AlertType) => {
  return (
    <div className="fixed w-full p-5 top-0 flex justify-end z-30">
      <div className={`alert w-full max-w-[400px] p-1 ${type}`}>
        {type == "alert-error" ? (
          <AiFillCloseCircle className="h-7 w-7" />
        ) : (
          <AiOutlineCheckCircle className="h-7 w-7" />
        )}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Alert;
