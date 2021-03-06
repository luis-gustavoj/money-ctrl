import { Card } from "../../components/Card";
import { Sidebar } from "../../components/Sidebar";
import { TransactionCard } from "../../components/TransactionCard";

import balanceImg from "../../assets/images/money-bag.svg";
import incomeImg from "../../assets/images/arrow-up.svg";
import expenseImg from "../../assets/images/arrow-down.svg";
import logoImg from "../../assets/images/logo.png";

import "./styles.scss";
import { Modal } from "../../components/Modal";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { useTransactions } from "../../hooks/useTransactions";
import { useUser } from "../../hooks/useUser";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { WalletContext } from "../../contexts/WalletContext";

export function Dashboard() {
  const { isModalVisible } = useContext(ModalContext);
  const { signOut } = useAuth();
  const { transactions } = useTransactions();
  const { userInfo } = useUser();
  const {wallet, dispatch} = useContext(WalletContext);

  useEffect(() => {
    dispatch({
      type: 'UPDATE_WALLET',
      payload: {
        transactions: transactions,
      }
    })

  }, [transactions, dispatch]);

  return (
    <div id="dashboard-page">
      {isModalVisible && <Modal />}
      {userInfo ? (
        <>
          <aside>
            <Sidebar></Sidebar>
          </aside>
          <main>
            <header className="dashboard-header">
              <h1>Dashboard</h1>
              <div className="user-info">
                <p>{userInfo?.name}</p>
                <Button onClick={signOut}>Log out</Button>
              </div>
            </header>
            <div className="content-container">
              <div className="content-header">
                <Card
                  cardTitle="Current balance"
                  cardImg={balanceImg}
                  cardValue={wallet.budget!}
                ></Card>
                <Card
                  cardTitle="Incomes"
                  cardImg={incomeImg}
                  cardValue={wallet.incomes!}
                ></Card>
                <Card
                  cardTitle="Expenses"
                  cardImg={expenseImg}
                  cardValue={wallet.expenses!}
                ></Card>
              </div>
              <div className="content-body">
                <div className="content-body-title">
                  <h5>Transactions</h5>
                </div>
                <div className="content-main">
                  <div className="items-container">
                    {transactions.map((transaction) => {
                      return (
                        <TransactionCard
                          id={transaction.id}
                          key={transaction.id}
                          description={transaction.description}
                          value={transaction.value}
                          date={transaction.date}
                        ></TransactionCard>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <div className="loading-page">
          <img src={logoImg} alt="Money.ctrl" />
        </div>
      )}
    </div>
  );
}
