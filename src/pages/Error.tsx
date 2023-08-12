import styles from "../styles/Error.module.scss"
import ing404 from "../assets/images/404.jpg"
import ParticlesBg from "../components/background/ParticlesBg"
import { useNavigate } from "react-router-dom"

type Props = {}

const Error = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div className={styles.error}>
      <ParticlesBg />
      <div className="dark_overlay">
        <div className={styles.error_content}>
          <h1 onClick={() => navigate("/")}>
            4 <span style={{ color: "#ff4b2b" }}>&lt;&frasl;&gt;</span>4
          </h1>
          <div>
            <p>
              Error <span style={{ color: "white" }}>&#40; &#41; &#123;</span>
              <br />
              <span style={{ color: "white" }}>
                <span style={{ color: "#df6572", marginLeft: "20px" }}>
                  message{" "}
                </span>
                ="
                <span style={{ color: "#9aca76" }}>page not found</span>";
                <br />
                &#125;;
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
