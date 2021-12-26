import './Main.css'
import { Promo } from "./Promo/Promo"
import { AboutProject } from './AboutProject/AboutProject'
export function Main() {
  return (
    <main className="main">
      <Promo/>
      <AboutProject/>
    </main>
  )
}