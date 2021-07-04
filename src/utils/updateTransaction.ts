import { database } from "../services/firebase";

export function updateTransaction(id: string, description: string, date: string, value: number, userId: string) {
  const transactionRef = database.ref(`users/${userId}/transactions/${id}`);
  transactionRef.update({
    value: Number(value),
    date: date,
    description: description,
  })
}