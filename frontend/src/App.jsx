import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import ItemsPanel from './pages/ItemsPanel.jsx';
import StudyPanel from './pages/StudyPanel.jsx';
import StatisticsPanel from './pages/StatisticsPanel.jsx';
import Footer from './components/Footer.jsx';

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/:timeStamp' element={ <ItemsPanel /> } />
        <Route path='/:timeStamp/study' element={ <StudyPanel/> } />
        <Route path='/:timeStamp/statistics' element={ <StatisticsPanel/> } />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
