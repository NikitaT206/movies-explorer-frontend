import '../Login/Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function Registration(props) {

  const [data, setData] = useState({email: '', password: '', name: ''})
  const [message, setMessage] = useState({name: '', email: '', password: ''})
  const [error, setError] = useState({name: false, email: false, password: false})
  const [isValid, setIsValid] = useState(false)

  function handleChange(event) {
    const {name, value, validationMessage} = event.target
    setData({
      ...data,
      [name]: value
    })

    setMessage({...message, [name]: validationMessage})
    setError({...error, [name]: validationMessage ? true : false})

    if (event.target.closest('form').checkValidity()) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  function handleSubmit(event) {    
    event.preventDefault()
    props.onRegister(data)
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__logo-container'>
          <Link className='header__logo header__logo_login' to='/'/>
        </div>
        <h3 className='login__greet'>Добро пожаловать!</h3>
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__inputs'>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='registration-input-name'>Имя</label>
              <input 
                className={error.name ? 'login__input login__input_error' : 'login__input'} 
                id='registration-input-name'
                minLength={2}
                maxLength={30}
                type='text'
                name='name'
                onChange={handleChange}
                required
                pattern='^[a-zA-Zа-яёА-ЯЁ\-\s]+$'
                />
                <span className='login__validation-message'>{message.name}</span>
            </div>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='registration-input-email'>E-mail</label>
              <input 
                className={error.email ? 'login__input login__input_error' : 'login__input'} 
                id='registration-input-email'
                type='email'
                name='email'
                onChange={handleChange}
                required
                pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
                />
                <span className='login__validation-message'>{message.email}</span>
            </div>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='registration-input-password'>Пароль</label>
              <input 
                className={error.password ? 'login__input login__input_error' : 'login__input'} 
                id='registration-input-password'
                minLength={6}
                maxLength={30}
                type='password'
                name='password'
                onChange={handleChange}
                required
                />
                <span className='login__validation-message'>{message.password}</span>
            </div>
          </div>
          <button 
            className={isValid ? 'login__submit-button opacity' : 'login__submit-button login__submit-button_disabled'} 
            type='submit'
            disabled={isValid ? false : true}>Зарегистрироваться</button>
        </form>
        <div className='login__link-container'>
          <p className='login__caption'>Уже зарегистрированы?</p>
          <Link className='login__link opacity' to='/signin'>Войти</Link>
        </div>
      </div>
    </div>
  )
}