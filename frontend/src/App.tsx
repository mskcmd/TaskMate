import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import DataProvider from "./Context/UserContext";
import { ProtectedRoute, UserInfo } from "./Context/ProtectedRoute";

const Login = lazy(() => import("./Pages/LoginSignupForm"));
const DashBord = lazy(() => import("./Pages/DashBord"));


function App() {
  const storedUserData = localStorage.getItem("userData");
  const userInfo: UserInfo | null = storedUserData
    ? JSON.parse(storedUserData)
    : null;

  return (
    <BrowserRouter>
      <DataProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                userInfo ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/login"
              element={!userInfo ? <Login /> : <Navigate to="/home" replace />}
            />

            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <DashBord />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
