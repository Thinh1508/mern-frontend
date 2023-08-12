import LoginForm from "../components/auth/LoginForm"
import RegisterForm from "../components/auth/RegisterForm"
import styles from "../styles/Linding.module.scss"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"
import Loading from "../components/auth/Loading"

const Auth = ({ authRoute }: { authRoute: string }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext)

  if (isAuthenticated) return <Navigate to="/dashboard" />

  return (
    <div className={styles.landing}>
      <div className="dark_overlay">
        <div className={styles.landing_container}>
          <h1>LEARN IT</h1>
          <h4> Enter Your personal details and start journey with us</h4>
          {authLoading ? (
            <>
              <Loading />
              <LoginForm />
            </>
          ) : (
            <>
              {authRoute === "login" && <LoginForm />}
              {authRoute === "register" && <RegisterForm />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
