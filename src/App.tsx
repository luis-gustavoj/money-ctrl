import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Register } from "./pages/Register";

import { AuthContextProvider } from "./contexts/AuthContext";

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home}></Route>
        <Route path="/register" component={Register}></Route>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
