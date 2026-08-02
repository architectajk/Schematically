import React from 'react'
import '../assets/CSS/Spinners.css'

const Spinners = ({ accent = '#2a7bf4', speed = 0.8, glow = false }) => {
  const style = {
    '--accent': accent,
    '--dur': (1.8 / speed).toFixed(3) + 's',
    '--glow-blur': glow ? '14px' : '0px',
  }

  return (
    <div className="loading-animation" style={style} role="status">
      <span className="visually-hidden">Loading...</span>

      <div className="loading-animation__mark">
        <svg
          width="132"
          height="132"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="loading-animation__svg"
          aria-hidden="true"
        >
          <rect
            x="6.5"
            y="6.5"
            width="127"
            height="127"
            rx="14"
            stroke="#f4f3f1"
            strokeWidth="11"
            strokeLinejoin="round"
            className="loading-animation__frame"
          />
          <rect x="28" y="28" width="40" height="84" rx="2.5" className="loading-animation__room loading-animation__room--1" />
          <rect x="76" y="28" width="36" height="38" rx="2.5" className="loading-animation__room loading-animation__room--2" />
          <rect x="76" y="74" width="36" height="38" rx="2.5" className="loading-animation__room loading-animation__room--3" />
        </svg>
      </div>

      <div className="loading-animation__track">
        <div className="loading-animation__bar" />
      </div>
    </div>
  )
}

export default Spinners