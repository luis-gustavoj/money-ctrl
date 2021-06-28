import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type UserType = {
  id: string;
  name: string;
  totalBudget: number;
  totalExpenses: number;
  totalIncomes: number;
};

export function useUser() {
  const { user } = useAuth();

  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    if (!user) {
      return;
    }

    const userRef = database.ref(`users/${user.id}`);

    userRef.on("value", (userInfo) => {
      const databaseUserInfo = userInfo.val();
      setUserInfo(databaseUserInfo);
    });
  }, [user]);

  return { userInfo };
}
