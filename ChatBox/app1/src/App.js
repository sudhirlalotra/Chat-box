
import './App.css';
import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Join from './components/join/join'
import Chat from "./components/chat/chat"
import Home from './components/home/home';




function App() {




  return (


    <Router>
      <Routes>
      <Route path='/'element={<Home/>}/>
      <Route  path="/join"element={<Join/>}/>
      <Route path="/chat" element={<Chat/>} />
      </Routes>
    </Router>

  );
}

export default App;
