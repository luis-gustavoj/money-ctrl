import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useRef, useContext } from "react";

import { ModalContext } from "../../contexts/ModalContext";

import { TransactionForm } from "../TransactionForm";

import "./styles.scss";

export function Modal() {
  const { handleCloseModal } = useContext(ModalContext);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleCloseModal);

  return (
    <div className="modal">
      <div className="modalContent" ref={wrapperRef}>
        <div className="modalHeader">
          <h2>Add transaction</h2>
          <hr className="divider" />
        </div>
        <div className="modalBody">
          <TransactionForm></TransactionForm>
        </div>
      </div>
    </div>
  );
}
