import { useState } from "react";
import { createContext, ReactNode } from "react";

type ModalContextProviderProps = {
  children: ReactNode;
};

type ModalContextType = {
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  isModalVisible: boolean;
};

export const ModalContext = createContext({} as ModalContextType);

export function ModalContextProvider(props: ModalContextProviderProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <ModalContext.Provider
      value={{ handleCloseModal, handleOpenModal, isModalVisible }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}
