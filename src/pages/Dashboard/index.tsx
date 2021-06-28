import { Card } from "../../components/Card";
import { Sidebar } from "../../components/Sidebar";

import balanceImg from "../../assets/images/money-bag.svg";
import incomeImg from "../../assets/images/arrow-up.svg";
import expenseImg from "../../assets/images/arrow-down.svg";

import "./styles.scss";
import { Modal } from "../../components/Modal";
import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";

export function Dashboard() {
  const { isModalVisible } = useContext(ModalContext);

  return (
    <div id="dashboard-page">
      {isModalVisible && <Modal />}
      <aside>
        <Sidebar></Sidebar>
      </aside>
      <main>
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <p>User name</p>
        </header>
        <div className="content-container">
          <div className="content-header">
            <Card cardTitle="Current balance" cardImg={balanceImg}></Card>
            <Card cardTitle="Incomes" cardImg={incomeImg}></Card>
            <Card cardTitle="Expenses" cardImg={expenseImg}></Card>
          </div>
        </div>
      </main>
    </div>
  );
}
