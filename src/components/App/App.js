import './App.css'
import { Main } from '../Main/Main';
import { BurgerMenu } from '../Header/BurgerMenu/BurgerMenu';
import { useState } from 'react'
import { Login } from '../Login/Login';
import { Registration } from '../Registration/Registration';
import { NotFound } from '../NotFound/NotFound';
import { Route, Routes } from 'react-router'
import { SavedMovies } from '../SavedMovies/SavedMovies';
import { Movies } from '../Movies/Movies';
import { Profile } from '../Profile/Profile'
import { Header } from '../Header/Header';
import { PromoHeader } from '../Header/PromoHeader';
import { Footer } from '../Footer/Footer';


function App() {

  const [burgerOpen, setBurgerOpen] = useState(false)

  function handleBurgerOpen() {
    if (burgerOpen === true) {
      setBurgerOpen(false)
    } else {
      setBurgerOpen(true)
    }
  }

  return (
    <div className={burgerOpen ? 'app no-scroll' : 'app'}>
      <BurgerMenu burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>
      
      <Routes>
        <Route path='/' element={<PromoHeader/>}/>
        {['/movies', '/saved-movies', '/profile'].map((item, index) => {
          return  <Route path={item} key={index} element={<Header burgerOpen={burgerOpen} handleBurgerOpen={handleBurgerOpen}/>}/>
        })}
      </Routes>
      
      <Routes>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route exact path="/" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/saved-movies" element={<SavedMovies/>}/>
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
