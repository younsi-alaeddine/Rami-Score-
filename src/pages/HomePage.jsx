import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'

export default function HomePage() {
  return (
    <div className="stack">
      <Card>
        <div className="stack">
          <div>
            <h2 style={{ margin: 0 }}>Rami Score – تونسي</h2>
            <p className="muted" style={{ margin: '6px 0 0' }}>
              التطبيق هذا لحساب النقاط فقط وما فيه حتى علاقة بالقمار ولا بالفلوس.
            </p>
          </div>

          <div className="grid-2">
            <Button as={Link} to="/new" variant="primary">
              لعبة جديدة
            </Button>
            <Button as={Link} to="/history" variant="secondary">
              سجل الألعاب
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
