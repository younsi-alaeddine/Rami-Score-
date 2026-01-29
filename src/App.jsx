import React, { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Skeleton from './components/Skeleton.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const NewGamePage = lazy(() => import('./pages/NewGamePage.jsx'))
const JoinGamePage = lazy(() => import('./pages/JoinGamePage.jsx'))
const ScoreboardPage = lazy(() => import('./pages/ScoreboardPage.jsx'))
const EndGameSummaryPage = lazy(() => import('./pages/EndGameSummaryPage.jsx'))
const HistoryPage = lazy(() => import('./pages/HistoryPage.jsx'))
const GameDetailsPage = lazy(() => import('./pages/GameDetailsPage.jsx'))
const StatsPage = lazy(() => import('./pages/StatsPage.jsx'))
const FriendsPage = lazy(() => import('./pages/FriendsPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function PageFallback() {
  return (
    <div className="stack" style={{ padding: 24 }}>
      <Skeleton height={32} width="60%" />
      <Skeleton height={120} style={{ marginTop: 16 }} />
      <Skeleton height={80} style={{ marginTop: 12 }} />
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </ErrorBoundary>
  )
}

