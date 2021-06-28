import { FormEvent, useContext } from "react";
import { useState } from "react";
import { Button } from "../../components/Button";
import { AuthContext } from "../../contexts/AuthContext";

import logoImg from "../../assets/images/logo.png";

import "./styles.scss";

export function Register() {
  const { RegisterAccount } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    await RegisterAccount(email, password, name);
  }

  return (
    <div id="register-page">
      <div className="register-container">
        <header>
          <img src={logoImg} alt="Money.ctrl" />
          <div className="divider">
            <strong>Register</strong>
          </div>
        </header>
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
