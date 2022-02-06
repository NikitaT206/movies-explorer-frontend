import { Link } from 'react-router-dom'
import './Profile.css'
import { useState } from 'react'

export function Profile(props) {

  const [data, setData] = useState({name: '', email: ''})
  const [message, setMessage] = useState({name: '', email: ''})
  const [error, setError] = useState({name: false, email: false})
  const [isValid, setIsValid] = useState(true)


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
                className={error.name ? 'profile__input profile__input_error' : 'profile__input'}
                id='edit-name-input' 
                minLength={2}
                maxLength={30}
                type='text'
                name='name'
                defaultValue={props.name}
                onChange={handleChange}
                required
                />
              <span className='profile__validation-message profile__validation-message_top'>{message.name}</span>
            </div>
            <div className='profile__input-container'>
              <label htmlFor='edit-email-input' className='profile__input-label'>E-mail</label>
              <input 
                className={error.email ? 'profile__input profile__input_error' : 'profile__input'} 
                id='edit-email-input' 
                minLength={2}
                maxLength={30}
                type='email'
                name='email'
                defaultValue={props.email}
                onChange={handleChange}
                required
                />
                <span className='profile__validation-message profile__validation-message_bottom'>{message.email}</span>
            </div>
          </div>
          <button className={isValid ? 'profile__submit-button opacity' : 'profile__submit-button profile__submit-button_disabled'} type='submit' disabled={isValid ? false : true}>Редактировать</button>
        </form>
        <Link className='profile__logout-button opacity' to='/' onClick={props.onLogout}>Выйти из аккаунта</Link>
      </div>
    </div>
  )
}