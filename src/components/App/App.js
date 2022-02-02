import './App.css'
import { Main } from '../Main/Main';
import { BurgerMenu } from '../Header/BurgerMenu/BurgerMenu';
import { useState } from 'react'
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { NotFound } from '../NotFound/NotFound';
import { Route, Routes, useNavigate } from 'react-router'
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile/Profile'
import { Header } from '../Header/Header';
import { PromoHeader } from '../Header/PromoHeader';
import { Footer } from '../Footer/Footer';
import { mainApi } from '../../utils/MainApi';
import { InfoToolTip } from '../InfoToolTip/InfoToolTip';
import { useEffect } from 'react/cjs/react.development';

function App() {

  const [burgerOpen, setBurgerOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoError, setInfoError] = useState(false)
  const [infoText, setInfoText] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState([])
  const navigate = useNavigate()

  function handleBurgerOpen() {
    if (burgerOpen === true) {
      setBurgerOpen(false)
    } else {
      setBurgerOpen(true)
    }
  }

  function closeInfo() {
    setInfoOpen(false)
  }

  function handleRegistration(data) {    
    mainApi.createUser(data)
      .then(() => {
        setInfoOpen(true)
        setInfoError(false)
        setInfoText('Вы зарегистрированы!')
        navigate('/signin')
      })
      .catch(() => {
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('Кажется что-то пошло не так :( Попробуйте еще раз')        
      })
  }

  function handleLogin(data) {
    mainApi.login(data)
      .then(data => {
        localStorage.setItem('jwt', data.data)
        setLoggedIn(true)
        navigate('/movies')
      })
      .catch(() => {
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('Вы ввели неверные данные :( Попробуйте еще раз')
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)    
    navigate('/')
  }

  function handleUpdateUser(data) {
    mainApi.editUserInfo(data, localStorage.getItem('jwt'))
      .then(data => {
        setInfoOpen(true)
        setInfoError(false)
        setInfoText('Все хорошо')
      })
      .catch(err => {
        console.log(err)
        setInfoOpen(true)
        setInfoError(true)
        setInfoText('Кажется что-то пошло не так :( Попробуйте еще раз')
      })
  }

  function handleLikeMovie(data) {
    mainApi.createMovie(data, localStorage.getItem('jwt')).then(data => console.log(data)
    )
  }

  function handleDislikeMovie(data) {
    mainApi.deletemovie(data, localStorage.getItem('jwt')).then(data => console.log())
    
  }

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true)
      mainApi.getUserInfo(localStorage.getItem('jwt')).then(data => setUserInfo(data[0]))
    }
  }, [])


  return (
    <div className={burgerOpen ? 'app no-scroll' : 'app'}>
      <InfoToolTip open={infoOpen} error={infoError} text={infoText} onClose={closeInfo}/>
      <BurgerMenu burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>
      
      <Routes>
        {!loggedIn ? <Route path='/' element={<PromoHeader/>}/> : ''}
        {['/', '/movies', '/saved-movies', '/profile'].map((item, index) => {
            return  <Route path={item} key={index} element={<Header burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>}/>
          })}
      </Routes>
      
      <Routes>
        <Route path='/signup' element={<Registration onRegister={handleRegistration}/>}/>
        <Route path='/signin' element={<Login onLogin={handleLogin}/>}/>
        <Route exact path="/" element={<Main/>}/>
        <Route path="/profile" element={<Profile onLogout={handleLogout} name={userInfo.name} email={userInfo.email} onEditUser={handleUpdateUser}/>}/>
        <Route path="/movies" element={<Movies onLikeMovie={handleLikeMovie}/>}/>
        <Route path="/saved-movies" element={<SavedMovies onDislikeMovie={handleDislikeMovie}/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>  

      <Routes>
        {['/', '/movies', '/saved-movies'].map((item, index) => {
          return <Route path={item} key={index} element={<Footer/>}/>
        })}
      </Routes>
    </div>
  );
}

export default App;
