import {database} from '../services/firebase'

export async function sendTransaction(value: Number, date: string, description: string, userId: string) {
  const transaction = {
    description: description,
    value: value,
    date: date,
  }

  await database.ref(`users/${userId}/transactions`).push(transaction);
}