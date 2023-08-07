import { motion, AnimatePresence } from "framer-motion";
import Alert from "./Alert";

interface AlertGroupType {
  messageError: string;
  messageSuccess: string;
  statusError: boolean;
  statusSuccess: boolean;
  statusLoading: boolean;
}

const AlertGroup = ({
  messageError,
  messageSuccess,
  statusError,
  statusSuccess,
  statusLoading,
}: AlertGroupType) => {
  return (
    <div
      className={`fixed w-full h-full top-0 z-100 ${
        statusError || statusSuccess || statusLoading ? "visible" : "hidden"
      }`}
    >
      <AnimatePresence>
        {statusError && (
          <motion.div
            key="alertError"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ type: "sring" }}
          >
            <Alert message={messageError} type="alert-error" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {statusSuccess && (
          <motion.div
            key="alertSuccess"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ ease: "easeInOut", delay: 1 }}
          >
            <Alert message={messageSuccess} type="alert-success" />
          </motion.div>
        )}
      </AnimatePresence>

      {statusLoading && (
        <div>
          <span className="loading loading-bars bg-purple-800 w-16 fixed m-auto inset-0 z-30" />
          <div className="fixed w-full h-full bg-black opacity-40 z-20" />
        </div>
      )}
    </div>
  );
};

export default AlertGroup;
