import { FormEvent, useContext } from "react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { AuthContext } from "../../contexts/AuthContext";
import "./styles.scss";

export function Register() {
  const { RegisterAccount } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function handleRegister(event: FormEvent) {
    event.preventDefault();

    RegisterAccount(email, password);
  }

  return (
    <div id="register-page">
      <div className="register-container">
        <img alt="Money.ctrl" />
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="E-mail"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <Button id="register-button">Register</Button>
        </form>
      </div>
    </div>
  );
}
