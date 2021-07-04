import {createContext, ReactNode, useReducer, Dispatch} from 'react';
import {deleteTransaction} from '../utils/deleteTransaction';

type WalletContextType = {
  wallet: {
    incomes?: number,
    budget?: number,
    expenses?: number,
  }
  dispatch: Dispatch<Action>,
}

type WalletContextProviderProps = {
  children: ReactNode;
}

type State = {
  wallet: {
    incomes?: number,
    budget?: number,
    expenses?: number,
  }
}

type Action = {
  type: string,
  payload?: {
    currentValue?: number,
    newValue?: number,
    transactions?: Transaction[];
    userId? : string,
    transactionId?: string,
  },
}

type Transaction = {
  id: string;
  description: string;
  value: number;
  date: string;
};

const walletReducer = (state: State, action: Action) : State => {
  switch(action.type){
    case 'UPDATE_WALLET': {
      if(!action.payload) {
        return {...state};
      }
      let incomesPlaceholder = 0, expensesPlaceholder = 0;
      for(const transaction of action.payload.transactions!){
        if(transaction.value > 0){
          incomesPlaceholder += transaction.value;
        }else{
          expensesPlaceholder += Math.abs(transaction.value);
        }
      }
      return {
        wallet: {
          budget: incomesPlaceholder - expensesPlaceholder,
          expenses: expensesPlaceholder,
          incomes: incomesPlaceholder,
        }
      }
    }
    case 'EDIT_INCOME': {
      if(!action.payload) {
        return {...state};
      }
      return {
        wallet: {
          ...state.wallet,
          incomes: (state.wallet.incomes! - action.payload.currentValue!) + action.payload.newValue!,
          budget: (state.wallet.budget! - action.payload.currentValue!) + action.payload.newValue!,
        },
      }
    }
    case 'EDIT_EXPENSE': {
      if(!action.payload) {
        return {...state};
      }
      return {
        wallet: {
          ...state.wallet,
          expenses: (state.wallet.expenses! - action.payload.currentValue!) + action.payload.newValue!,
          budget: (state.wallet.budget! + action.payload.currentValue!) - action.payload.newValue!,
        },
      }
    }
    case 'DELETE_TRANSACTION': {
      if(!action.payload) {
        return {...state};
      }
      deleteTransaction(action.payload.transactionId!, action.payload.userId!);
      return {...state};
    }

    default:
      return{
        ...state
      }
  }
}

const initialState: State = {
  wallet: {
    budget: 0,
    incomes: 0,
    expenses: 0,
  }
}

export const WalletContext = createContext({} as WalletContextType);

export function WalletContextProvider (props: WalletContextProviderProps) {
  
  const [state, dispatch] = useReducer(walletReducer, initialState);

  return(
    <WalletContext.Provider value={{wallet: state.wallet, dispatch}}>
      {props.children}
    </WalletContext.Provider>
  )
}
