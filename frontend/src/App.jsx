import Navbar from "./components/Navbar"
import Signin from "./pages/Signin"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/authentication" element={<Signin />} />
    </Routes>
    </>
  )
}

export default App
