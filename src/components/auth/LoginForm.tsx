import { useContext, useState, memo, ChangeEvent } from "react"
import styles from "../../styles/Linding.module.scss"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { toast } from "react-toastify"

const LoginForm = () => {
  // context
  const { loginUser } = useContext(AuthContext)

  // local state
  const [loginForm, setLoginForm] = useState<{
    username: string
    password: string
  }>({
    username: "",
    password: "",
  })

  const onInputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    let newValue = value
    if (value.includes(" ")) {
      newValue = value.replace(/\s/g, "")
      toast.error("Can't enter spaces")
    }
    setLoginForm((prevLoginForm) => ({ ...prevLoginForm, [name]: newValue }))
  }

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    even
  ) => {
    even.preventDefault()

    try {
      await loginUser(loginForm)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={onFormSubmit} className={styles.login_form}>
      <div className={styles.login_input}>
        <input
          type="text"
          placeholder="UserName"
          name="username"
          onChange={onInputChangeValue}
          value={loginForm.username}
        />
      </div>
      <div className={styles.login_input}>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onInputChangeValue}
          value={loginForm.password}
        />
      </div>
      <div className={styles.login_input}>
        <button type="submit">Login</button>
      </div>
      <p>
        Do not have an account? <Link to={"/register"}>SignUp</Link>
      </p>
    </form>
  )
}

export default memo(LoginForm)
