import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './App.scss';

export default function Main() {
  return <>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:city" element={<App />} />
      </Routes>
    </Router>
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Main />
)
