import { FormEvent, useContext, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {sendTransaction} from "../../utils/sendTransaction"
import {getTransaction} from "../../utils/getTransaction"
import {updateTransaction} from "../../utils/updateTransaction"

import { WalletContext } from "../../contexts/WalletContext";
import { ModalContext } from "../../contexts/ModalContext";
import { Button } from "../Button";

import "./styles.scss";

type Transaction = {
  description: string,
  date: string,
  value: number,
}

export function TransactionForm({
  id,
  isEditing,
  setEditingTransaction,
} : {
  id?: string,
  isEditing?: boolean,
  setEditingTransaction?: () => void,
}) {
  const { user } = useAuth();
  const { handleCloseModal } = useContext(ModalContext);
  const {dispatch} = useContext(WalletContext);

  const handleSendTransaction = (event : FormEvent) => {
    event.preventDefault();

    if(!user){
      return;
    }

    sendTransaction(Number(value), date, description, user.id);
  }

  const handleEditTransaction = (event : FormEvent) => {
    event.preventDefault();

    if(!user || !id){
      return;
    }

    let transactionData : Transaction;

    transactionData = getTransaction(id, user.id);

    if(!id || !transactionData){
      return;
    }

    if(Number(value) > 0){
      dispatch({
        type: 'EDIT_INCOME',
        payload: {
          currentValue: Number(transactionData.value),
          newValue: Number(value),
        }
      })
    }else{
      dispatch({
        type: 'EDIT_EXPENSE',
        payload: {
          currentValue: Number(transactionData.value),
          newValue: Number(value),
        }
      })
    }

    updateTransaction(id, description, date, Number(value), user.id);
  }

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    let transactionData : Transaction;

    if(!id || !user){
      return;
    }

    transactionData = getTransaction(id, user.id);

    setValue(String(transactionData.value));
    setDate(transactionData.date);
    setDescription(transactionData.description);
  }, [isEditing, id, user])

  return (
    <form onSubmit={isEditing ? (handleEditTransaction) : (handleSendTransaction)}>
      <div className="input-container">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          required
          id="description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
      </div>
      <div className="input-container">
        <label htmlFor="value">Value</label>
        <input
          placeholder="$0.00"
          id="value"
          required
          type="number"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <small className="help">Use the sign - (negative) for expenses</small>
      </div>
      <div className="input-container">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          required
          id="date"
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </div>
      <div className="button-group">
        <div className="button-container">
          <Button
            className="cancel-transaction-button"
            type="button"
            onClick={isEditing ? (setEditingTransaction) : (handleCloseModal)}
          >
            Cancel
          </Button>
        </div>
        <div className="button-container">
          <Button type="submit" className="add-transaction-button">
            Save
          </Button>
        </div>
      </div>
    </form>
  );
}
