import { ReactNode } from "react";

interface ModalType {
  title: string;
  cta: ReactNode;
  children: ReactNode;
}

const Modal = ({ title, cta, children }: ModalType) => {
  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-10">{title}</h3>
          {children}
          <div className="modal-action">{cta}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
