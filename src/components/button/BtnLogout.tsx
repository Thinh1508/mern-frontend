import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

type Props = {}

const BtnLogout = (props: Props) => {
  const { logoutUser } = useContext(AuthContext)
  const logout = () => {
    logoutUser()
  }

  return (
    <button onClick={logout}>
      <h4>Logout</h4>
    </button>
  )
}

export default BtnLogout
