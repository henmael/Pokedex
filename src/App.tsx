import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SecondPage } from './pages/Pokemon'

function App() {

  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pokemon/:pokemonId' element={<SecondPage/>}/>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
