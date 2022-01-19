import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import { SearchForm } from "./SearchForm/SearchForm";
import { films } from "../../utils/constants";

export function Movies() {
  return (
    <div className="movies">
      <SearchForm/>
      <MoviesCardList films={films}/>
    </div> 
  )
}