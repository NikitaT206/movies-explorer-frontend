import { Link } from 'react-router-dom'
import './Profile.css'
import { useState } from 'react'

export function Profile(props) {

  const [data, setData] = useState({name: '', email: ''})

  function handleChange(event) {
    const {name, value} = event.target
    setData({
      ...data,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.onEditUser(data)
  }

  return (
    <div className='profile'>
      <div className='profile__container'>
        <h1 className='profile__greet'>Привет, {props.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__inputs'>
            <div className='profile__input-container'>
              <label htmlFor='edit-name-input' className='profile__input-label'>Имя</label>
              <input 
                className='profile__input'
                id='edit-name-input' 
                minLength={2}
                maxLength={30}
                type='text'
                name='name'
                defaultValue={props.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className='profile__input-container'>
              <label htmlFor='edit-email-input' className='profile__input-label'>E-mail</label>
              <input 
                className='profile__input' 
                id='edit-email-input' 
                minLength={2}
                maxLength={30}
                type='email'
                name='email'
                defaultValue={props.email}
                onChange={handleChange}
                required
                />
            </div>
          </div>
          <button className='profile__submit-button opacity' type='submit'>Редактировать</button>
        </form>
        <Link className='profile__logout-button opacity' to='/' onClick={props.onLogout}>Выйти из аккаунта</Link>
      </div>
    </div>
  )
}