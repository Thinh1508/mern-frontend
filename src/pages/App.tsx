import { Routes, Route } from "react-router-dom"
import Landing from "../components/layout/Landing"
import Auth from "./Auth"
import AuthContextProvider from "../contexts/AuthContext"
import ProtectedRoute from "../contexts/routing/ProtectedRoute"
import Dashboard from "./Dashboard"
import Error from "./Error"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import PostContextProvide from "../contexts/PostContext"

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvide>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </PostContextProvide>
    </AuthContextProvider>
  )
}

export default App
