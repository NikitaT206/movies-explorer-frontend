import React from "react";
import "./Promo.css"
import promoImage from "../../../images/promoImage.svg"
import logo from "../../../images/logo.svg"

export function Promo() {
  return (
    <section className="promo">
      <div className="container">
        <header className="promo__header">
          <div className="promo__logo-container">
            <img className="promo__logo" src={logo} alt="Логотип"></img>
          </div>
          <div className="promo__buttons-container">
            <button className="promo__signup-button">Регистрация</button>
            <button className="promo__signin-button">Войти</button>
          </div>
        </header>
        <div className="promo__content">
          <div className="promo__text-content">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
            <button className="promo__learn-more-button">Узнать больше</button>
          </div>
          <div className="promo__image-content">
            <img className="promo__image" src={promoImage} alt="Планета WEB"></img>
          </div>
        </div>
      </div>
    </section>
  )
}