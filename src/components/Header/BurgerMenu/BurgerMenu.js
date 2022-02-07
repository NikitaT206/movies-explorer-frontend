import { Link, NavLink } from 'react-router-dom'
import './BurgerMenu.css'

export function BurgerMenu(props) {

  const setActive = ({ isActive }) =>(isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link");

  return (
      <div className={props.burgerOpen ? 'burger-menu burger-menu_active' : 'burger-menu'}>
        <div className={props.burgerOpen ? 'burger-menu__cover burger-menu__cover_active' : 'burger-menu__cover'} onClick={props.handleBurgerOpen}></div>
        <div className={props.burgerOpen ? "burger-menu__content burger-menu__content_active" : 'burger-menu__content'}>
          <nav className='burger-menu__links'>
            <NavLink 
              className={setActive}
              to='/'
              onClick={props.handleBurgerOpen}
              >Главная</NavLink>
            <NavLink 
              className={setActive}
              to='/movies'
              onClick={props.handleBurgerOpen}
              >Фильмы</NavLink>
            <NavLink 
              className={setActive} 
              to='/saved-movies'
              onClick={props.handleBurgerOpen}
              >Сохранённые фильмы</NavLink>
          </nav>
          <Link className='burger-menu__account opacity' to='/profile' onClick={props.handleBurgerOpen}>
            <p className='header__account-text'>Аккаунт</p>
            <div className='header__account-logo'></div>
          </Link>
        </div>
      </div>
  )
}