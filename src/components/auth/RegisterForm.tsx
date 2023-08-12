import { ChangeEvent, memo, useContext, useState } from "react"
import styles from "../../styles/Linding.module.scss"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

type Props = {}

const RegisterForm = (props: Props) => {
  // context
  const { registerUser } = useContext(AuthContext)

  // route
  const navigate = useNavigate()

  // local state
  const [registerForm, setRegisterForm] = useState<{
    username: string
    password: string
    confirmPass: string
  }>({
    username: "",
    password: "",
    confirmPass: "",
  })

  const onInputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    let newValue = value
    if (value.includes(" ")) {
      newValue = value.replace(/\s/g, "")
      toast.error("Can't enter spaces")
    }
    setRegisterForm((prevRegisterForm) => ({
      ...prevRegisterForm,
      [name]: newValue,
    }))
  }

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    even
  ) => {
    even.preventDefault()
    if (registerForm.password !== registerForm.confirmPass) {
      toast.error("Passwords do not match")
      return
    }
    try {
      const registerData = await registerUser(registerForm)
      if (registerData.success) {
        navigate("/login")
      }
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
          value={registerForm.username}
        />
      </div>
      <div className={styles.login_input}>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onInputChangeValue}
          value={registerForm.password}
        />
      </div>
      <div className={styles.login_input}>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPass"
          onChange={onInputChangeValue}
          value={registerForm.confirmPass}
        />
      </div>
      <div className={styles.login_input}>
        <button type="submit">Sign Up</button>
      </div>
      <p>
        Do have an account? <Link to={"/login"}>LogIn</Link>
      </p>
    </form>
  )
}

export default memo(RegisterForm)
