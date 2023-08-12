import { useContext } from "react"
import { AuthContext } from "../AuthContext"
import { useNavigate } from "react-router-dom"
import Loading from "../../components/auth/Loading"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext)

  if (authLoading) return <Loading />

  if (!isAuthenticated) navigate("/login")

  return children
}

export default ProtectedRoute
