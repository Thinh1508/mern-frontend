import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import styles from "../../styles/NavBar.module.scss"
import BtnLogout from "../button/BtnLogout"
type Props = {}

const NavBar = (props: Props) => {
  const {
    authState: { user },
  } = useContext(AuthContext)

  const username = user && user.username

  return (
    <div className={styles.navbar}>
      <h1>&lt;&frasl;&gt;LearnIT</h1>
      <div className={styles.logout}>
        <h1>Hi {username}</h1>
        <BtnLogout />
      </div>
    </div>
  )
}

export default NavBar
