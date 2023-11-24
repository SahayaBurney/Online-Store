import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Division from './Division';
import Home from './Home';
import './index.css';
import About from './About';
import Purchase from './Purchase';
import Bussiness from './bussiness';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Main Page" element={<Division />} />
        <Route path="/Home/:email" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/Purchase" element={<Purchase />} />
        <Route path="/bussiness" element={<Bussiness />} />
      </Routes>
    </Router>
  );
}

export default App;
