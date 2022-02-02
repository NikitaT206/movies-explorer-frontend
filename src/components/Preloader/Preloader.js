import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className="preloader">
            {props.notFound ? <p className='preloader__text'>Ничего не найдено</p> : ''}
            {props.loading ? ( 
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
                ) : ''}
            {props.error ? <p className='preloader__text'>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p> : ''}
        </div>
    )
};

export default Preloader
