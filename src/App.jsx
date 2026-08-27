import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthScreen from "./components/AuthScreen";
import AppLayout from "./layouts/AppLayout";
import ChatPage from "./pages/ChatPage";
import ControlsPage from "./pages/ControlsPage";
import DeveloperPage from "./pages/DeveloperPage";
import HomePage from "./pages/HomePage";
import MemoriesPage from "./pages/MemoriesPage";
import RecommendationsPage from "./pages/RecommendationsPage";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const storedUser = JSON.parse(localStorage.getItem("spotify-user") || "null");
  const user = storedUser?.user_id === "demo_user" ? null : storedUser;
  if (!user && storedUser?.user_id === "demo_user") {
    localStorage.removeItem("spotify-user");
  }
  function login(data) {
    localStorage.setItem("spotify-user", JSON.stringify(data));
    window.location.href = "/";
  }
  function logout() {
    localStorage.removeItem("spotify-user");
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <AuthScreen onLogin={login} />
          }
        />
        <Route
          element={
            <ProtectedRoute user={user}>
              <AppLayout user={user} onLogout={logout} />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/controls" element={<ControlsPage />} />
          {user?.role === "Developer" && (
            <Route path="/developer" element={<DeveloperPage />} />
          )}
        </Route>
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
