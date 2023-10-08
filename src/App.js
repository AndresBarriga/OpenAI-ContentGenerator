import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import CoverLetter from './Components/CoverLetter';
import Home from './Components/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/coverLetterWriter" exact element={<CoverLetter/>} />
        {/* Add routes for other features */}
      </Routes>
    </Router>
  );
}

export default App;