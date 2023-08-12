import { Navigate } from "react-router-dom"

type Props = {}

const Landing = (props: Props) => {
  return <Navigate to="/login" />
}

export default Landing
