import { database } from "../services/firebase";

type Transaction = {
  date: string,
  value: number,
  description: string,
}

export function getTransaction(transactionId : string, userId: string) : Transaction {
  let data : Transaction = {
    date: "",
    value: 0,
    description: "",
  };
  const transactionRef = database.ref(`users/${userId}/transactions/${transactionId}`);
  transactionRef.on('value', (snapshot) => {
    data = snapshot.val();
  })
  return data;
}