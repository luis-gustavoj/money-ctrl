import { useContext, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import { database } from "../../services/firebase";

import { ModalContext } from "../../contexts/ModalContext";
import { Button } from "../Button";

import "./styles.scss";

export function TransactionForm() {
  const { user } = useAuth();
  const { handleCloseModal } = useContext(ModalContext);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");

  async function handleSendTransaction(event: FormEvent) {
    event.preventDefault();

    if (!user) {
      console.log("You must be logged in");
    }

    let transactionType = "";

    value > 0 ? (transactionType = "incomes") : (transactionType = "expenses");

    const transaction = {
      description: description,
      value: value,
      date: date,
    };

    await database.ref(`users/${user.id}/transactions/`).push(transaction);

    handleChangeValues(transactionType);
  }

  async function handleChangeValues(transactionType: string) {
    const userRef = database.ref(`users/${user.id}`);
    const currentBudgetRef = database.ref(`users/${user.id}/totalBudget`);
    const currentExpensesRef = database.ref(`users/${user.id}/totalExpenses`);

    currentBudgetRef.once("value", (snapshot) => {
      let currentValue = snapshot.val();
      console.log(currentValue);
      if (transactionType === "incomes") {
        let totalValue = +currentValue + +value;
        console.log(totalValue);
        userRef.update({ totalBudget: totalValue, totalIncomes: totalValue });
      } else {
        currentExpensesRef.once("value", (snapshot) => {
          let currentExpensesValue = snapshot.val();
          let totalBudgetValue = +currentValue + +value;
          let totalExpensesValue = +currentExpensesValue + Math.abs(+value);
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
          type="text"
          required="required"
          id="value"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
        <small className="help">
          Use o sinal - (negativo) para despesas e, (vírgula) para casas
          decimais
        </small>
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
            onClick={handleCloseModal}
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
