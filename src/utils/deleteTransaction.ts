import { database } from "../services/firebase"

export const deleteTransaction = (id: string, userId: string) => {
  database.ref(`users/${userId}/transactions`).child(id).remove()
}