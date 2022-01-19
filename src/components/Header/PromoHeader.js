import { Link } from "react-router-dom";

export function PromoHeader() {
  return (
    <header className="header header_promo">
      <div className="container">
        <div className="header__promo-container">
          <Link className='header__logo header__logo_promo' to='/'/>
          <nav className="header__links">
            <Link className="header__signup-button opacity" to="/signup">Регистрация</Link>
            <Link className="header__signin-button opacity" to="/signin">Войти</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}