import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Networks from './components/Networks';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/networks" element={<Networks />} />
        <Route path="/signup" element={<SignUpPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;