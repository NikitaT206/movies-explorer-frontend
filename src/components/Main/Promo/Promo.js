import React from "react";
import "./Promo.css"
import promoImage from "../../../images/promoImage.svg"
import { Link as ScrollLink} from "react-scroll";

export function Promo() {
  return (
    <section className="promo">
      <div className="container">
        <div className="promo__content">
          <div className="promo__text-content">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <ScrollLink
              className="promo__learn-more-button opacity"
              to="about"
              smooth={true}
              offset={-70}
              duration={500}>Узнать больше</ScrollLink>
          </div>
          <div className="promo__image-content">
            <img className="promo__image" src={promoImage} alt="Планета WEB"></img>
          </div>
        </div>
      </div>
    </section>
  )
}