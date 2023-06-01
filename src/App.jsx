import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './Pages/Homepage'
import { ResultsPage } from './Pages/ResultsPage'
import { GamePage } from './Pages/GamePage'
import axios from 'axios'

function App() {
  const [playerName, setPlayerName] = useState('') // 
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);



  // const getQuestions = async (category, difficulty) => {

  //   try {
  //     const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`)
  //     setQuestions(response.data.results);
  //   } catch (error) {
  //     console.error('Error fetching questions:', error)
  //   }
  // }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage questions={questions} setQuestions={setQuestions} playerName={playerName} setPlayerName={setPlayerName} />} />
        <Route path="/play" element={<GamePage playerName={playerName} questions={questions} setQuestions={setQuestions} score={score} setScore={setScore} />} />
        <Route path="/results" element={<ResultsPage score={score} setScore={setScore} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
