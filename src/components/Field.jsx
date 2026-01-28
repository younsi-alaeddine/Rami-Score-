import React from 'react'

export function Field({ label, hint, error, children }) {
  return (
    <label className="field">
      <div className="field__top">
        <span className="field__label">{label}</span>
      </div>
      <div className="field__control">{children}</div>
      {error ? <div className="field__error">{error}</div> : null}
      {!error && hint ? <div className="field__hint">{hint}</div> : null}
    </label>
  )
}

export function TextInput(props) {
  return <input className="input" type="text" autoComplete="off" {...props} />
}

export function NumberInput(props) {
  return <input className="input input--mono" type="number" inputMode="numeric" {...props} />
}

