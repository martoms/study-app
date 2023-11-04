import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import ItemsPanel from './pages/ItemsPanel.jsx';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/:setName' element={ <ItemsPanel /> } />
      </Routes>
    </Router>
  )
}

export default App
