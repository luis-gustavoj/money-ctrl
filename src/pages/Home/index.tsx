import { Button } from "../../components/Button/";

import savingsImg from "../../assets/images/savings.svg";

import "./styles.scss";

export function Home() {
  return (
    <div id="home-page">
      <aside>
        <img src={savingsImg} alt="" />
        <strong>Manage your money spendings</strong>
      </aside>
      <main>
        <div className="main-container">
          <img src="" alt="Money.ctrl" />
          <form>
            <input type="text" placeholder="E-mail" />
            <input type="password" placeholder="Password" />
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
        </div>
      </main>
    </div>
  );
}
