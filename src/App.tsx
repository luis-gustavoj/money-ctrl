import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { ModalContextProvider } from "./contexts/ModalContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}></Route>
        <Route path="/register" component={Register}></Route>
        <ModalContextProvider>
          <Route path="/dashboard" component={Dashboard} />
        </ModalContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
