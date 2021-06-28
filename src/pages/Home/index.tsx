import { Link, useHistory } from "react-router-dom";

import { Button } from "../../components/Button/";

import savingsImg from "../../assets/images/savings.svg";
import logoImg from "../../assets/images/logo.png";

import "./styles.scss";
import { FormEvent } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export function Home() {
  const { signIn } = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();

    await signIn(email, password);

    history.push("/dashboard");
  }

  return (
    <div id="home-page">
      <aside>
        <img src={savingsImg} alt="" />
        <strong>Manage your money spendings</strong>
      </aside>
      <main>
        <div className="main-container">
          <img src={logoImg} alt="Money.ctrl" />
          <form onSubmit={handleSignIn}>
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
            <div className="input-footer">
              <div id="checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <span>
                <small>Forget Password?</small>
              </span>
            </div>
            <Button id="login-button">Log in</Button>
          </form>
          <div className="register">
            New user?{" "}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
