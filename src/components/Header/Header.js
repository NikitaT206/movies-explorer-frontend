import './Header.css'
import { Burger } from './Burger/Burger'
import { Link } from 'react-router-dom'

export function Header(props) {

  return (
    <header className='header container'>
      <Link className='header__logo' to='/'/>
      <div className='header__content'>
        <nav className='header__parties'>
          <Link className='header__link opacity' to='/movies'>Фильмы</Link>
          <Link className='header__link opacity' to='/saved-movies'>Сохраненные фильмы</Link>
        </nav>
        <Link className='header__parties' to='/profile'>
          <p className='header__account-text'>Аккаунт</p>
          <div className='header__account-logo'></div>
        </Link>
      </div>
      <Burger burgerOpen={props.burgerOpen} handleBurgerOpen={props.handleBurgerOpen}/>
    </header>
  )
}