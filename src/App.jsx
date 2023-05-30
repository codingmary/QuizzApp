import { useState } from 'react'
import axios from 'axios'
import './App.css'
import { Header } from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './Pages/Homepage'
import { ResultsPage } from './Pages/ResultsPage'
import { GamePage } from './Pages/GamePage'

function App() {
  const [name, setName] = useState('') // 
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);





  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage questions={questions} setQuestions={setQuestions} name={name} setName={setName} />} />
        <Route path="/play" element={<GamePage questions={questions} setQuestions={setQuestions} score={score} />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
