import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import "../src/App.css";
import AppFooter from './Components/Footer';
import Header from './Components/Header';
import CoverLetter from './Components/CoverLetter';
import Home from './Components/Home';
import { ThemeProvider } from '@mui/material/styles'; 
import theme from './colortheme';
import MeetingNotesApp from './Components/MeetingNotes';


function App() {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" exact element={<Home/>} />
        <Route path="/coverLetterWriter" exact element={<CoverLetter/>} />
        <Route path="/MeetingNotesWriter" exact element={<MeetingNotesApp/>} />
        {/* Add routes for other features */}
      </Routes>
      <AppFooter />
    </Router>
    </ThemeProvider>
  );
}

export default App;