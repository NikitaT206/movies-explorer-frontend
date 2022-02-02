import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function Login(props) {
  const [data, setData] = useState({email: '', password: ''})

  function handleChange(event) {
    const {name, value} = event.target
    setData({
      ...data,
      [name]: value
    })
  }

  function handleSubmit(event) {
    console.log(data)
    event.preventDefault()
    props.onLogin(data)
  }


  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__logo-container'>
          <Link className='header__logo header__logo_login' to='/'/>
        </div>
        
        <h3 className='login__greet'>Рады видеть!</h3>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__inputs'>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='login-input-email'>E-mail</label>
              <input 
                className='login__input' 
                id='login-input-email'
                type='email'
                name='email'
                onChange={handleChange}
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
                name='password'
                onChange={handleChange}
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