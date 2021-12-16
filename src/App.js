import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert message='alert!'/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/Home" element={<Home />} />
              <Route exact path="/About" element={<About />} />
              <Route exact path="/SignIn" element={<SignIn />} />
              <Route exact path="/SignUp" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
