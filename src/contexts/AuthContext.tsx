import { ReactNode, useEffect } from "react";
import { createContext, useState } from "react";
import { auth, database, firebase } from "../services/firebase";

type User = {
  id: string;
};

type AuthContextType = {
  user: User | undefined;
  RegisterAccount: (
    email: string,
    password: string,
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
    name: string
  ) {
    const userRef = database.ref("users");
    const result = await auth.createUserWithEmailAndPassword(email, password);

    if (!result.user) {
      console.log("Cadastro não realizado");
      return;
    }

    const { uid } = result.user;

    userRef.child(uid).set({
      email: email,
      name: name,
    });
  }

  async function signIn(email: string, password: string) {
    const result = await auth.signInWithEmailAndPassword(email, password);

    if (!result.user) {
      return;
    }

    const { uid } = result.user;

    console.log(uid);

    setUser({
      id: uid,
    });
  }

  async function signOut() {
    await firebase.auth().signOut();

    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, RegisterAccount, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  );
}
