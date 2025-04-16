import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Networks from './components/Networks';
import MainPage from './components/MainPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/networks" element={<Networks />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;