import './App.css'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { SecondPage } from './pages/Pokemon'

function App() {

  return (
    <MemoryRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/pokemon/:pokemonId' element={<SecondPage/>}/>
        </Routes>
      </div>
    </MemoryRouter>
  )
}

export default App
