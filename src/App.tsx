import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SecondPage } from './pages/Pokemon'

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pokemon/:pokemonId' element={<SecondPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
