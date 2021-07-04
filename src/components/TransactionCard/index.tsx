import { useAuth } from "../../hooks/useAuth";
import { useContext, useState } from "react";
import { Modal } from "../Modal";
import {WalletContext} from '../../contexts/WalletContext'

import "./styles.scss";

type TransactionProps = {
  description: string;
  value: number;
  date: string;
  id: string;
};

export function TransactionCard({
  description,
  value,
  date,
  id,
}: TransactionProps) {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  
  const {dispatch} = useContext(WalletContext);

  const formatter = new Intl.NumberFormat("pt-br", {
    minimumFractionDigits: 2,
  });

  async function handleDeleteTransaction() {
    if(!user){
      return;
    }

    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: {
        transactionId: id,
        userId: user.id,
      }
    })
  }

  const setEditingTransaction = () => {
    setIsEditing(false);
  }

  return (
    <>
      {isEditing && (
        <Modal
          id={id}
          isEditing={isEditing}
          setEditingTransaction={setEditingTransaction}
        ></Modal>
      )}
      <div className="transaction-card">
        <div className="transaction-description">{description}</div>
        <div
          className={`transaction-value ${value > 0 ? "income" : "expense"}`}
        >
          {formatter.format(value)}
        </div>
        <div className="transaction-date">{date.replaceAll("-", "/")}</div>
        <div className="transaction-buttons">
          <div className="icon edit" onClick={() => {setIsEditing(true)}}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="icon delete" onClick={handleDeleteTransaction}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.17218 14.8284L12.0006 12M14.829 9.17157L12.0006 12M12.0006 12L9.17218 9.17157M12.0006 12L14.829 14.8284"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}