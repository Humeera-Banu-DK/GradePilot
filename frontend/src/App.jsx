import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SGPA from "./pages/SGPA";
import CGPA from "./pages/CGPA";
import Notes from "./pages/Notes";
import Navbar from "./components/Navbar";
import Estimate from "./pages/Estimate";
import Profile from "./pages/Profile";
import UploadNotes from "./pages/UploadNotes";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sgpa" element={<SGPA />} />
        <Route path="/cgpa" element={<CGPA />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/estimate" element={<Estimate />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload-notes" element={<UploadNotes />} />
      </Routes>
    </>
  );
}

export default App;
