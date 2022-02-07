import { Link } from 'react-router-dom'
import './NotFound.css'

export function NotFound() {
  return (
    <div className='not-found'>
      <div className='not-found__container'>
        <div className='not-found__text'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__caption'>Страница не найдена</p>
        </div>
        <Link className='login__link not-found__link' to='/'>Назад</Link>
      </div>
    </div>
  )
}