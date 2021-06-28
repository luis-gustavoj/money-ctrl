import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useRef } from "react";

import "./styles.scss";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

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
        <div className="modalBody"></div>
      </div>
    </div>
  );
}
