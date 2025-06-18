// App.js (updated)
import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter
import './App.css';
import Navbar from './component/navbar';
import Home from './pages/Home';
import Iot from './pages/Iot';
import WebDev from './pages/WebDev';
import Automation from './pages/Automation';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/iot" element={<Iot />} />
        <Route path="/web-dev" element={<WebDev />} />
        <Route path="/automation" element={<Automation />} />
      </Routes>
      
    </>
  );
}

export default App;