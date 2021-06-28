import { useState, useRef, useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ProSidebar, SidebarHeader, Menu } from "react-pro-sidebar";

import { Button } from "../../components/Button";
import { useOutsideClick } from "../../hooks/useOutsideClick";

import plusImg from "../../assets/images/plus.svg";
import logoImg from "../../assets/images/logo-minimal.png";

import "./styles.scss";

export function Sidebar() {
  const { handleOpenModal } = useContext(ModalContext);

  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, setIsVisible);

  function handleClickButton() {
    setIsVisible(true);
  }

  function handleClickOpenModal() {
    handleOpenModal();
    setIsVisible(!isVisible);
  }

  return (
    <ProSidebar collapsed={true}>
      <SidebarHeader>
        <div className="logo-header">
          <img src={logoImg} alt="Money.ctrl" />
        </div>
      </SidebarHeader>
      <Menu>
        <div className="button-item-menu">
          <Button onClick={handleClickButton}>
            <img src={plusImg} alt="Add transaction" className="icon-img" />
          </Button>
          {isVisible && (
            <div id="menu-list" ref={wrapperRef} className="menu-list">
              <div className="menu-item income" onClick={handleClickOpenModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20H4V4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 16.5L12 9L15 12L19.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Income</span>
              </div>
              <div className="menu-item expense" onClick={handleClickOpenModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20H4V4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 7L12 15L15 12L19.5 16.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Expense</span>
              </div>
            </div>
          )}
        </div>
      </Menu>
    </ProSidebar>
  );
}
