import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useRef, useContext } from "react";

import { ModalContext } from "../../contexts/ModalContext";

import { TransactionForm } from "../TransactionForm";

import "./styles.scss";

export function Modal({
  editingValue,
  editingDescription,
  editingDate,
  id,
  isEditing,
  setEditingTransaction,
}: {
  editingValue?: number;
  editingDescription?: string;
  editingDate?: string;
  id?: string;
  isEditing?: boolean;
  setEditingTransaction?: () => void;
}) {
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
          {isEditing ? (
            <TransactionForm
              editingValue={editingValue}
              id={id}
              editingDescription={editingDescription}
              editingDate={editingDate}
              isEditing={isEditing}
              setEditingTransaction={setEditingTransaction}
            ></TransactionForm>
          ) : (
            <TransactionForm></TransactionForm>
          )}
        </div>
      </div>
    </div>
  );
}
