// import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '@/components/LandingPage';
import CustomAnalysis from '@/components/CustomAnalysis';
import App from '@/App';
import { useTheme } from './hooks/use-theme';
function Routerr() {
  useTheme();
  return (
  <Router>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/latest-news" element={<App />} />
        <Route path="/analyze-custom-news" element={<CustomAnalysis />} />
    </Routes>
  </Router>
  )
}

export default Routerr