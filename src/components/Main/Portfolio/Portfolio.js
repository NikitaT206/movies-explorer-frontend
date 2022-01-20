import './Portfolio.css'
import student from '../../../images/student.jpg'
import arrow from '../../../images/arrow.svg'

export function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='container'>
        <h3 className="section__title">Студент</h3>
        <div className='portfolio__student-container'>
          <div className='portfolio__student-description'>
            <h2 className='portfolio__student-name'>Виталий</h2>
            <p className='portfolio__student-job'>Фронтенд-разработчик, 30 лет</p>
            <p className='portfolio__student-text'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <div className='portfolio__student-links'>
              <a className='portfolio__student-link opacity' href='https://www.linkedin.com/in/nikita-tunik-774862220/' rel='noreferrer' target="_blank">LinkedIn</a>
              <a className='portfolio__student-link opacity' href='https://github.com/NikitaT206' rel='noreferrer' target="_blank">GitHub</a>
            </div>
          </div>
          <div className='portfolio__student-image-container'>
            <img className='portfolio__student-image' alt='Я' src={student}></img>
          </div>          
        </div>
        <p className='portfolio__portfolio'>Портфолио</p>
        <div className='protfolio__items'>
          <a className='portfolio__item opacity' href='https://nikitat206.github.io/HowToLearn/' target='_blank' rel='noreferrer'>
            <p className='portfolio__item-text'>Статичный сайт</p>
            <img className='portfolio__item-arrow' src={arrow} alt='Стрелка'></img>
          </a>
          <a className='portfolio__item opacity' href='https://nikitat206.github.io/russian-travel/' target='_blank' rel='noreferrer'>
            <p className='portfolio__item-text'>Адаптивный сайт</p>
            <img className='portfolio__item-arrow' src={arrow} alt='Стрелка'></img>
          </a>
          <a className='portfolio__item opacity' href='https://mesto.nikitat206.front.nomoredomains.rocks/' target='_blank' rel='noreferrer'>
            <p className='portfolio__item-text'>Одностраничное приложение</p>
            <img className='portfolio__item-arrow' src={arrow} alt='Стрелка'></img>
          </a>
        </div>
      </div>
    </section>
  )
}