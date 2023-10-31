import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
      </Routes>
    </Router>
  )
}

export default App
