import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./pages/Home";

export function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
    </BrowserRouter>
  );
}
