import './Profile.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Profile(props) {

  const [data, setData] = useState({name: '', email: ''})
  const [message, setMessage] = useState({name: '', email: ''})
  const [isValid, setIsValid] = useState(true)
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
      props.onEditUser(data)
      setDisabled(false)
      setIsValid(true)
    }, 0)
  }

  useEffect(() => {
    setData({name: props.name, email: props.email})  
  }, [props.name, props.email])

  useEffect(() => {
    if (data.name === props.name && data.email === props.email) {
      setIsValid(false)
    }
  }, [data.name, data.email, props.name, props.email])

  return (
    <div className='profile'>
      <div className='profile__container'>
        <h1 className='profile__greet'>Привет, {props.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__inputs'>
            <div className='profile__input-container'>
              <label htmlFor='edit-name-input' className='profile__input-label'>Имя</label>
              <input 
                className={
                  message.name 
                  ? 'profile__input profile__input_error' 
                  : 'profile__input'
                }
                id='edit-name-input' 
                minLength={2}
                maxLength={30}
                type='text'
                name='name'
                value={data.name || ''}
                onChange={handleChange}
                required
                disabled={disabled ? true : false}
                pattern='^[a-zA-Zа-яёА-ЯЁ\-\s]+$'
              />
              <span className='profile__validation-message profile__validation-message_top'>{message.name}</span>
            </div>
            <div className='profile__input-container'>
              <label htmlFor='edit-email-input' className='profile__input-label'>E-mail</label>
              <input 
                className={
                  message.email 
                  ? 'profile__input profile__input_error' 
                  : 'profile__input'
                } 
                id='edit-email-input' 
                minLength={2}
                maxLength={30}
                type='email'
                name='email'
                value={data.email || ''}
                onChange={handleChange}
                required
                disabled={disabled ? true : false}
                pattern='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'
              />
                <span className='profile__validation-message profile__validation-message_bottom'>{message.email}</span>
            </div>
          </div>
          <button 
            className={
              isValid 
              ? 'profile__submit-button opacity' 
              : 'profile__submit-button profile__submit-button_disabled'
            } 
            type='submit' 
            disabled={isValid ? false : true}
            >Редактировать</button>
        </form>
        <Link 
          className='profile__logout-button opacity' 
          to='/' 
          onClick={props.onLogout}
          >Выйти из аккаунта</Link>
      </div>
    </div>
  )
}