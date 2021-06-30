import { useContext, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

import { database } from "../../services/firebase";

import { ModalContext } from "../../contexts/ModalContext";
import { Button } from "../Button";

import "./styles.scss";

export function TransactionForm({
  editingValue,
  editingDescription,
  editingDate,
  id,
  isEditing,
  setEditingTransaction,
}: {
  editingValue?: number,
  editingDescription?: string,
  editingDate?: string,
  id?: string,
  isEditing?: boolean,
  setEditingTransaction?: () => void,
}) {
  const { user } = useAuth();
  const { handleCloseModal } = useContext(ModalContext);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState(Number);
  const [date, setDate] = useState("");

  async function handleSendTransaction(event: FormEvent) {
    event.preventDefault();

    if (!user) {
      console.log("You must be logged in");
    }

    const transaction = {
      description: description,
      value: value.replace("$", "").replace(",", ""),
      date: date,
    };

    toast.promise(
      isEditing
        ? database.ref(`users/${user.id}/transactions/${id}`).update({
            description: transaction.description,
            value: transaction.value,
            date: transaction.date,
          })
        : database.ref(`users/${user.id}/transactions/`).push(transaction),
      {
        loading: "Saving...",
        success: <b>Transaction saved!</b>,
        error: <b>Could not save.</b>,
      }
    );

    handleChangeValues();
  }

  async function handleChangeValues() {
    const userRef = database.ref(`users/${user.id}`);
    const currentBudgetRef = database.ref(`users/${user.id}/totalBudget`);
    const currentExpensesRef = database.ref(`users/${user.id}/totalExpenses`);

    currentBudgetRef.once("value", (snapshot) => {
      let currentValue = snapshot.val();
      if (value > 0) {
        let totalValue = 0;

        if (isEditing) {
          totalValue = currentValue - editingValue + value;
        } else {
          totalValue = +currentValue + +value;
        }
        userRef.update({ totalBudget: totalValue, totalIncomes: totalValue });
      } else {
        currentExpensesRef.once("value", (snapshot) => {
          let currentExpensesValue = snapshot.val();

          let totalBudgetValue = 0;
          let totalExpensesValue = 0;

          if (isEditing) {
            totalBudgetValue = +currentValue + Math.abs(+editingValue) + +value;
            totalExpensesValue =
              +currentExpensesValue + +editingValue + Math.abs(+value);
          } else {
            totalBudgetValue = +currentValue + +value;
            totalExpensesValue = +currentExpensesValue + Math.abs(+value);
          }

          userRef.update({
            totalBudget: totalBudgetValue,
            totalExpenses: totalExpensesValue,
          });
        });
      }
    });
  }

  return (
    <form onSubmit={handleSendTransaction}>
      <div className="input-container">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          required="required"
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
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <small className="help">Use the sign - (negative) for expenses</small>
      </div>
      <div className="input-container">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          required="required"
          id="date"
          onChange={(event) => setDate(event.target.value)}
          value={date}
        />
      </div>
      <div className="button-group">
        <div className="button-container">
          <Button
            className="cancel-transaction-button"
            onClick={
              isEditing ? () => setEditingTransaction(false) : handleCloseModal
            }
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
