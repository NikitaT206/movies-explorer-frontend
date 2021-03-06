import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function Login(props) {
  const [data, setData] = useState({email: '', password: ''})
  const [message, setMessage] = useState({email: '', password: ''})
  const [isValid, setIsValid] = useState(false)
  const [disabled, setDisabled] = useState(false)

  function handleChange(event) {
    const {name, value, validationMessage} = event.target
    setData({
      ...data,
      [name]: value
    })
    setMessage({...message, [name]: validationMessage})

    if (event.target.closest('form').checkValidity()) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setDisabled(true)
    setIsValid(false)
    setTimeout(() => {
      props.onLogin(data)
      setDisabled(false)
      setIsValid(true)
    }, 0)
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
                className={message.email ? 'login__input login__input_error' : 'login__input'} 
                id='login-input-email'
                type='email'
                name='email'
                onChange={handleChange}
                required
                disabled={disabled ? true : false}
                pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                />
                <span className='login__validation-message'>{message.email}</span>
            </div>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='login-input-password'>Пароль</label>
              <input 
                className={message.password ? 'login__input login__input_error' : 'login__input'} 
                id='login-input-password'
                minLength={6}
                maxLength={30}
                type='password'
                name='password'
                onChange={handleChange}
                disabled={disabled ? true : false}
                required
                />
                <span className='login__validation-message'>{message.password}</span>
            </div>
          </div>
          <button 
            className={isValid ? 'login__submit-button opacity' : 'login__submit-button login__submit-button_disabled'} 
            type='submit'
            disabled={isValid ? false : true}>Войти</button>
        </form>
        <div className='login__link-container'>
          <p className='login__caption'>Ещё не зарегистрированы?</p>
          <Link className='login__link opacity' to='/signup'>Регистрация</Link>
        </div>
      </div>
    </div>
  )
}