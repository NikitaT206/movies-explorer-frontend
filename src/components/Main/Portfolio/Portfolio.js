import './Portfolio.css'
import student from '../../../images/student.png'
import arrow from '../../../images/arrow.svg'

export function Portfolio() {
  return (
    <section className='portfolio'>
      <div className='container'>
        <h3 className="section__title">Студент</h3>
        <div className='portfolio__student-container'>
          <div className='portfolio__student-description'>
            <h2 className='portfolio__student-name'>Никита</h2>
            <p className='portfolio__student-job'>Фронтенд-разработчик, 29 лет</p>
            <p className='portfolio__student-text'>Привет! Меня зовут Никита, мне 29 лет,  живу в Санкт-Петербурге. Недавно окончил курс по web-разработке в Яндекс.Практикум.
Создание визуальной составляющей сайтов, интерактивных элементов страницы, красивых эффектов, вот что привлекает меня в работе Frontend-разработчика. 
Сейчас активно развиваюсь в данном направлении. Изучаю документацию по JavaScript, React. Решаю задачки на codewars. Пишу небольшие pet-проекты.</p>
            <p className='portfolio__student-text'>Работал на госслужбе таможенным инспектором,  понял что перспектив по карьерному росту и по зарплате там нет. Всегда хотел научиться программированию, но считал что это слишком сложно. Стоило только попробовать и назад пути уже не было :) </p>
            <p className='portfolio__student-text'>Создание визуальной составляющей сайтов, интерактивных элементов страницы, красивых эффектов, вот что привлекает меня в работе Frontend-разработчика. 
Сейчас активно развиваюсь в данном направлении. Изучаю документацию по JavaScript, React. Решаю задачки на codewars. Пишу небольшие pet-проекты.</p>
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