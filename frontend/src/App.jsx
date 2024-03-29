import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import AuthForm from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import Page403 from "./pages/Page403";
import ScrollToTop from "./components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "react-query";
import UpdatePost from "./pages/UpdatePost";
import SinglePost from "./pages/SinglePost";
import Search from "./pages/Search";
import { HelmetProvider } from "react-helmet-async";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence } from "framer-motion";

const queryClient = new QueryClient();
import { io } from "socket.io-client";
const socket = io(`${import.meta.env.VITE_BACKEND}`, {
  reconnection: true,
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <div>
          <AnimatePresence>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth" element={<AuthForm />} />
                <Route
                  path="/post/:postSlug"
                  element={<SinglePost socket={socket} />}
                />
                <Route path="/search" element={<Search />} />
                <Route element={<ProtectedRoute role="admin" />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<ProtectedRoute role="any" />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/createpost" element={<CreatePost />} />
                  <Route
                    path="/update-article/:postId"
                    element={<UpdatePost />}
                  />
                </Route>
              </Route>
              <Route path="/403" element={<Page403 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
