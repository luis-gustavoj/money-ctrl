import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, database, firebase } from "../services/firebase";
import { toast } from "react-hot-toast";

type User = {
  id: string;
};

type AuthContextType = {
  user: User | undefined;
  RegisterAccount: (
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid } = user;

        setUser({
          id: uid,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function RegisterAccount(
    email: string,
    password: string,
    confirmPassword: string,
    name: string
  ) {
    if (confirmPassword === password) {
      const userRef = database.ref("users");
      const result = await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error: { message: string }) => {
          toast.error(error.message.replace(".", ""));
        });
      if (result?.user) {
        const { uid } = result.user;

        userRef.child(uid).set({
          email: email,
          name: name,
          totalIncomes: 0,
          totalExpenses: 0,
          totalBudget: 0,
        });

        toast.success("Register successed");

        setUser(undefined);
        firebase.auth().signOut();

        history.push("/");

        return;
      }
    } else {
      toast.error("Passwords do not match");
      return;
    }
  }

  async function signIn(email: string, password: string) {
    const result = await auth
      .signInWithEmailAndPassword(email, password)
      .catch((error: { message: string }) => {
        toast.error(error.message.replace(".", ""));
      });

    if (result?.user) {
      const { uid } = result.user;

      setUser({
        id: uid,
      });

      toast.success("Login successed");

      history.push("/dashboard");
    }

    return;
  }

  async function signOut() {
    await firebase.auth().signOut();

    toast("Good bye! see you soon", {
      icon: "🖐",
    });

    setUser(undefined);

    history.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, RegisterAccount, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
