import { useAuth } from "./useAuth";

type UserType = {
  id: string;
  name: string;
  budget: number;
  expenses: {
    incomes: {
      description: string;
      category: string;
      value: number;
    };
    expenses: {
      description: string;
      category: string;
      value: number;
    };
  };
};

type FirebaseUser = Record<
  string,
  {
    name: string;
    budget: number;
    expenses: {
      incomes: Record<
        string,
        {
          description: string;
          category: string;
          value: number;
        }
      >;
      expenses: Record<
        string,
        {
          description: string;
          category: string;
          value: number;
        }
      >;
    };
  }
>;
