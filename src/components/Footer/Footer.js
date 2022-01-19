import './Footer.css'

export function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__navigation'>
          <p className='footer__link'>© 2022</p>
          <div className='footer__links'>
            <a className='footer__link opacity' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
            <a className='footer__link opacity' href='https://github.com/' target='_blank' rel='noreferrer'>Github</a>
            <a className='footer__link opacity' href='https://www.facebook.com/' target='_blank' rel='noreferrer'>Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  )
}