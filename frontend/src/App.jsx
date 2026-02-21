import Navbar from "./components/Navbar"
import Landing from "./pages/Landing";
import Signin from "./pages/Signin"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/authentication" element={<Signin />} />
    </Routes>
    </>
  )
}

export default App
