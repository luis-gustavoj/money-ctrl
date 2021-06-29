import { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import { ProSidebar, SidebarHeader, Menu } from "react-pro-sidebar";

import { Button } from "../../components/Button";

import plusImg from "../../assets/images/plus.svg";
import logoImg from "../../assets/images/logo-minimal2.png";

import "./styles.scss";

export function Sidebar() {
  const { handleOpenModal } = useContext(ModalContext);

  return (
    <ProSidebar collapsed={true}>
      <SidebarHeader>
        <div className="logo-header">
          <img src={logoImg} alt="Money.ctrl" />
        </div>
      </SidebarHeader>
      <Menu>
        <div className="button-item-menu">
          <Button onClick={handleOpenModal}>
            <img src={plusImg} alt="Add transaction" className="icon-img" />
          </Button>
        </div>
      </Menu>
    </ProSidebar>
  );
}
