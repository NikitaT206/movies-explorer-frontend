import './Header.css'
import { Burger } from './Burger/Burger'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

export function Header(props) {

  const location = useLocation()

  return (
    <header className={location.pathname === '/' ? 'header header_promo' : 'header'}>
      <div className='header__container container'>
        <Link className='header__logo' to='/'/>
        <div className='header__content'>
          <nav className='header__parties'>
            <Link className='header__link opacity' to='/movies'>Фильмы</Link>
            <Link className='header__link opacity' to='/saved-movies'>Сохраненные фильмы</Link>
          </nav>
          <Link className='header__parties' to='/profile'>
            <p className='header__account-text opacity'>Аккаунт</p>
            <div className='header__account-logo opacity'></div>
          </Link>
        </div>
        <Burger burgerOpen={props.burgerOpen} handleBurgerOpen={props.handleBurgerOpen}/>
      </div>
    </header>
  )
}