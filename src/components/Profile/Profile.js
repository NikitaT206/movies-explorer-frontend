import { Link } from 'react-router-dom'
import './Profile.css'

export function Profile() {
  return (
    <div className='profile'>
      <div className='profile__container'>
        <h1 className='profile__greet'>Привет, Ревьюер :)!</h1>
        <form className='profile__form'>
          <div className='profile__inputs'>
            <div className='profile__input-container'>
              <label htmlFor='edit-name-input' className='profile__input-label'>Имя</label>
              <input 
                className='profile__input'
                id='edit-name-input' 
                placeholder='Ревьюер' 
                minLength={2}
                maxLength={30}
                type='text'
                required
                />
            </div>
            <div className='profile__input-container'>
              <label htmlFor='edit-email-input' className='profile__input-label'>E-mail</label>
              <input 
                className='profile__input' 
                id='edit-email-input' 
                placeholder='yandex@yandex.ru'
                minLength={2}
                maxLength={30}
                type='email'
                required
                />
            </div>
          </div>
          <button className='profile__submit-button opacity' type='submit'>Редактировать</button>
        </form>
        <Link className='profile__logout-button opacity' to='/'>Выйти из аккаунта</Link>
      </div>
    </div>
  )
}