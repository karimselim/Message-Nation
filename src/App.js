import { ChatsPage, Home, Signin, Signup } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const ChatPageProtected = ({ children }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const { currentUser } = useContext(AuthContext);
    return !isDesktop && currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="/chats"
            element={
              <ChatPageProtected>
                <ChatsPage />
              </ChatPageProtected>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
