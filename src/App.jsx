import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CreateQueue from "./pages/CreateQueue";
import JoinQueue from "./pages/JoinQueue";
import Dashboard from "./pages/Dashboard";
import QueueStatus from "./pages/QueueStatus";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQueue />} />
        <Route path="/join" element={<JoinQueue />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/status" element={<QueueStatus />} />
      </Routes>
    </>
  );
}

export default App;