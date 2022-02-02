import '../Login/Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'



export function Registration(props) {

  const [data, setData] = useState({email: '', password: '', name: ''})

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
                className='login__input' 
                id='registration-input-name'
                minLength={2}
                maxLength={30}
                type='text'
                name='name'
                onChange={handleChange}
                required
                ></input>
            </div>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='registration-input-email'>E-mail</label>
              <input 
                className='login__input' 
                id='registration-input-email'
                type='email'
                name='email'
                onChange={handleChange}
                required
                ></input>
            </div>
            <div className='login__input-container'>
              <label className='login__label' htmlFor='registration-input-password'>Пароль</label>
              <input 
                className='login__input' 
                id='registration-input-password'
                minLength={6}
                maxLength={30}
                type='password'
                name='password'
                onChange={handleChange}
                required
                ></input>
            </div>
          </div>
          <button className='login__submit-button opacity' type='submit'>Зарегистрироваться</button>
        </form>
        <div className='login__link-container'>
          <p className='login__caption'>Уже зарегистрированы?</p>
          <Link className='login__link opacity' to='/signin'>Войти</Link>
        </div>
      </div>
    </div>
  )
}