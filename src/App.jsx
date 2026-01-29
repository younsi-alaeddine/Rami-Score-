import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import NewGamePage from './pages/NewGamePage.jsx'
import JoinGamePage from './pages/JoinGamePage.jsx'
import ScoreboardPage from './pages/ScoreboardPage.jsx'
import EndGameSummaryPage from './pages/EndGameSummaryPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import GameDetailsPage from './pages/GameDetailsPage.jsx'
import StatsPage from './pages/StatsPage.jsx'
import FriendsPage from './pages/FriendsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewGamePage />} />
        <Route path="/join" element={<JoinGamePage />} />
        <Route path="/game" element={<ScoreboardPage />} />
        <Route path="/summary/:gameId" element={<EndGameSummaryPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/history/:gameId" element={<GameDetailsPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

