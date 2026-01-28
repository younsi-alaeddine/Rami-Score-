import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'

export default function NotFoundPage() {
  return (
    <Card>
      <div className="stack">
        <h2 style={{ margin: 0 }}>Page not found</h2>
        <p className="muted" style={{ margin: 0 }}>
          The page you’re looking for doesn’t exist.
        </p>
        <Button as={Link} to="/" variant="primary">
          Go Home
        </Button>
      </div>
    </Card>
  )
}

