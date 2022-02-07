import './Burger.css'

export function Burger(props) {

  return (
    <div>
      {!props.burgerOpen ? (
        <div className='header__burger' onClick={props.handleBurgerOpen}>
          <div className='header__burger-line header__burger-line_top'></div>
          <div className='header__burger-line header__burger-line_center'></div>
          <div className='header__burger-line header__burger-line_center'></div>
          <div className='header__burger-line header__burger-line_bottom'></div>
        </div>
      ) : (
        <div className='header__burger header__burger_active' onClick={props.handleBurgerOpen}>
          <div className='header__burger-line header__burger-line_top header__burger-line_top_hidden'></div>
          <div className='header__burger-line header__burger-line_center header__burger-line_cross-left'></div>
          <div className='header__burger-line header__burger-line_center header__burger-line_cross-right'></div>
          <div className='header__burger-line header__burger-line_bottom header__burger-line_bottom_hidden'></div>      
        </div>
      )}
    </div>
  )
}