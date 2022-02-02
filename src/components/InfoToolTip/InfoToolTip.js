import './InfoToolTip.css'
import errorIcon from '../../images/error.png'
import checkIcon from '../../images/check.png'

export function InfoToolTip(props) {

  return (
    <div className={props.open ? 'info info_open' : 'info'} onClick={props.onClose}>
      <div className='info__container' onClick={(event) => event.stopPropagation()}>
        <img className='info__image' src={props.error ? errorIcon : checkIcon} alt='Иконка'/>
        <h2 className='info__text'>{props.text}</h2>
        <button className='info__close-button opacity' onClick={props.onClose}></button>
      </div>
    </div>
  )
}