import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroPage from './pages/HeroPage';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';


const Demo = lazy(() => import('./pages/Demo'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Results = lazy(() => import('./pages/Results'));
const Compare = lazy(() => import('./pages/Compare'));


function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<HeroPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/results' element={<Results />} />
          <Route path='/compare' element={<Compare />} />
          {/* <Route path='/demo' element={} /> */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
