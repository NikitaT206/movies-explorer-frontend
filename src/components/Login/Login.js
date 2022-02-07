import './Login.css'
import { Link } from 'react-router-dom'

export function Login() {
  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__logo-container'>
          <Link className='header__logo header__logo_login' to='/'/>
        </div>
        
        <h3 className='login__greet'>Рады видеть!</h3>
        <form className='login__form'>
          <div className='login__inputs'>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='login-input-email'>E-mail</label>
              <input 
                className='login__input' 
                id='login-input-email'
                type='email'
                required
                ></input>
            </div>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='login-input-password'>Пароль</label>
              <input 
                className='login__input' 
                id='login-input-password'
                minLength={6}
                maxLength={30}
                type='password'
                required
                ></input>
            </div>
          </div>
          <button className='login__submit-button opacity'>Войти</button>
        </form>
        <div className='login__link-container'>
          <p className='login__caption'>Ещё не зарегистрированы?</p>
          <Link className='login__link opacity' to='/signup'>Регистрация</Link>
        </div>
      </div>
    </div>
  )
}