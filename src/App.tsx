import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Toaster } from "react-hot-toast";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { ModalContextProvider } from "./contexts/ModalContext";
import { WalletContextProvider } from "./contexts/WalletContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Toaster />
        <Route path="/" exact component={Home}></Route>
        <Route path="/register" component={Register}></Route>
        <WalletContextProvider>
          <ModalContextProvider>
            <Route path="/dashboard" component={Dashboard} />
          </ModalContextProvider>
        </WalletContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
