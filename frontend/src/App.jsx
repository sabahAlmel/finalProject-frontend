import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Projects from "./pages/Projects";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import Page403 from "./pages/Page403";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "react-query";
import UpdatePost from "./pages/UpdatePost";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<AuthForm />} />
            <Route path="/projects" element={<Projects />} />
            <Route element={<ProtectedRoute role="admin" />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route element={<ProtectedRoute role="any" />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/update-post/:postId" element={<UpdatePost />} />
            </Route>
          </Route>
          <Route path="/403" element={<Page403 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
