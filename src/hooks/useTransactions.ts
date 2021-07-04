import { useEffect } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type TransactionType = {
  id: string;
  description: string;
  value: number;
  date: string;
};

type FirebaseTransactions = Record<
  string,
  {
    description: string;
    value: number;
    date: string;
  }
>;

export function useTransactions() {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const userRef = database.ref(`users/${user.id}/transactions/`);

    userRef.on("value", (transactions) => {
      const databaseTransactions = transactions.val();

      const firebaseTransactions: FirebaseTransactions =
        databaseTransactions ?? {};

      const parsedTransactions = Object.entries(firebaseTransactions).map(
        ([key, value]) => {
          return {
            id: key,
            description: value.description,
            value: Number(value.value),
            date: value.date,
          };
        }
      );

      setTransactions(parsedTransactions);
    });

    return () => {
      userRef.off("value");
    };
  }, [user]);

  return { transactions };
}
