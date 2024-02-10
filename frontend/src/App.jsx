import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Header from "./layout/Header";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        {/* just who login can accesss these */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
