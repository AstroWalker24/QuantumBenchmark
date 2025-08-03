import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './pages/HeroPage';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<HeroPage />} />
      </Routes>
    </Router>
  )
}

export default App
