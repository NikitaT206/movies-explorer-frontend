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
import { moviesApi } from '../../utils/MoviesApi';

function App() {

  const navigate = useNavigate()

  const [width, setWidth] = useState(window.innerWidth);

  const [burgerOpen, setBurgerOpen] = useState(false)

  const [infoOpen, setInfoOpen] = useState(false)
  const [infoError, setInfoError] = useState(false)
  const [infoText, setInfoText] = useState('')

  const [loggedIn, setLoggedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const [films, setFilms] = useState([])
  const [savedFilms, setSavedFilms] = useState([])

  const [counter, setCounter] = useState(0)

  const [loader, setLoader] = useState(false)
  const [searchNotFound, setSearchNotFound] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const [moreButton, setMoreButton] = useState(false)


  function handleBurgerOpen() {
    setBurgerOpen(!burgerOpen)
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

  function handleChangeSearchValue(event) {
    setSearchValue(event.target.value)    
  }

  function handleSearch(event) {
    event.preventDefault()
   
    moviesApi.getFilms()
      .then(films => {
        setLoader(true)
        setSearchLoading(true)
        setSearchNotFound(false)
        setSearchError(false)
        setCounter(0)
        setTimeout(() => {
          const filteredFilms = films.filter(film => film.nameRU.toLowerCase().includes(searchValue.toLowerCase()))
          if (!filteredFilms.length) {
            setSearchLoading(false)
            setSearchNotFound(true)
            setSearchValue('')
          } else {
            setFilms(filteredFilms)
            localStorage.setItem('films', JSON.stringify(filteredFilms))
            setSearchValue('')
            setSearchLoading(false)
            setLoader(false)
          }
        }, 1000) 
      })
      .catch(err => {
        console.log(err)
        setLoader(true)
        setSearchError(true)
      })
  }

  function handleSearchSavedFilms(event) {
    event.preventDefault()
    const copyArrOfSavedFilms = [...savedFilms]
    const filteredFilms = copyArrOfSavedFilms.filter(film => film.nameRU.toLowerCase().includes(searchValue.toLowerCase()))
    console.log(filteredFilms)
    if (!filteredFilms.length) {
      setLoader(true)
      setSearchNotFound(true)
      setSavedFilms(filteredFilms)
    } else {
      setLoader(false)
      setSearchNotFound(false)
      setSavedFilms(filteredFilms)
    }
  }

  // увеличивает counter массива с карточками, в зависимости от ширины экрана

  function handleMoreButtonClick() {
    if (width > 768) {
      setCounter(counter + 3)      
    }
    else if(width < 768 && width > 500) {
      setCounter(counter + 2)
    }
    else if(width <= 500) {
      setCounter(counter + 1)
    }
  }

  function tokenCheck() {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true)     
      console.log(loggedIn)
       
      navigate('/movies')
    }
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('films')
    localStorage.removeItem('savedFilms')
    setUserInfo({})
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
    mainApi.createMovie(data, localStorage.getItem('jwt')).then(data => setSavedFilms(data, ...savedFilms))
  }

  function handleDislikeMovie(data) {
    mainApi.deletemovie(data, localStorage.getItem('jwt')).then(data => setSavedFilms(savedFilms.filter(film => film._id !== data._id)))
    
  }

  // useEffect(() => {
  //   tokenCheck()
  // }, [loggedIn])

  useEffect(() => {

    if (localStorage.getItem('jwt')) {
      setLoggedIn(true)     
      console.log(loggedIn)
      navigate('/movies')
    }
    
  }, [loggedIn])

  useEffect(() => {
    mainApi.getUserInfo(localStorage.getItem('jwt')).then(data => setUserInfo(data[0]))
  }, [])

  useEffect(() => {
    mainApi.getMovies(localStorage.getItem('jwt')).then(data => {
      const ownFilms = data.filter(film => film.owner === userInfo._id)
      console.log(userInfo)
      
      setSavedFilms(data)
    })
  }, [])


  // закрывает попап при нажатии на escape

  useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeInfo()
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  // слушает событие resize для получения ширины окна браузера

  useEffect(() => {
    const resizeListener = () => {
      setTimeout(() => {
        setWidth(window.innerWidth)
      }, 1000)
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  // показывает кнопку 'еще' если длинна массива с фильмами больше counter
  
  useEffect(() => {
    if (films.length > counter) {
      setMoreButton(true)
    } else {
      setMoreButton(false)
    }
  }, [width, films.length, counter])

  // задает изначальное количество отображаемых карточек в зависимости от ширины экрана

  useEffect(() => {
    if (width > 768) {
      if (counter < 12) {
        setCounter(12)
      } else return
    }
    else if(width < 768 && width > 500) {
      if (counter < 6) {
        setCounter(6)
      } else return
    }
    else if(width <= 500) {
      if (counter < 5) {
        setCounter(5)
      } else return
    }
  }, [width, counter])

  // добавляет на страницу фильмы с последним результатом поиска

  useEffect(() => {
    if (localStorage.getItem('films')) {
      setFilms(JSON.parse(localStorage.getItem('films')))
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
        <Route 
          path="/movies" 
          element={
            <Movies 
              onLikeMovie={handleLikeMovie}
              searchValue={searchValue}
              onChangeSearchValue={handleChangeSearchValue}
              onSearch={handleSearch}
              loader={loader}
              onSerchNotFound={searchNotFound}
              onSearchLoading={searchLoading}
              onSearchError={searchError}
              films={films}
              counter={counter}
              showMoreButton={moreButton}
              onMoreButtonClick={handleMoreButtonClick}
              />}/>
        <Route 
          path="/saved-movies" 
          element={
            <SavedMovies 
              onDislikeMovie={handleDislikeMovie}
              films={savedFilms}
              searchValue={searchValue}
              loader={loader}
              searchNotFound={searchNotFound}
              onChangeSearchValue={handleChangeSearchValue}
              onSearch={handleSearchSavedFilms}
              />}/>
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
