import "./AboutProject.css"

export function AboutProject() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h3 className="section__title">О проекте</h3>
        <div className="about__description-container">
          <div className="about__description">
            <h4 className="about__description-title">Дипломный проект включал 5 этапов</h4>
            <p className="about__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about__description">
            <h4 className="about__description-title">На выполнение диплома ушло 5 недель</h4>
            <p className="about__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about__timeline-container">
          <div className="about__timeline about__timeline_left">
            <div className="about__timeline-line about__timeline-line_left">1 неделя</div>
            <p className="about__timeline-text">Back-end</p>
          </div>
          <div className="about__timeline about__timeline_right">
            <div className="about__timeline-line about__timeline-line_right">4 недели</div>
            <p className="about__timeline-text">Front-end</p>
          </div>
        </div>
      </div>
      
    </section>
  )
}