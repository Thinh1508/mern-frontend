import { Button, Card } from "react-bootstrap"
import cardStyles from "../../styles/Card.module.scss"
import { Typewriter } from "react-simple-typewriter"

const Welcome = ({
  username,
  setModal,
}: {
  username: string
  setModal: (modal: boolean) => void
}) => {
  return (
    <>
      <Card className={`${cardStyles.card} text-center  my-5`}>
        <Card.Body>
          <Card.Header as="h1">
            <span>Welcome </span>
            <span style={{ color: "#ff4b2b" }}>
              {" "}
              <Typewriter
                words={["to LearnIT", `${username}`]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={100}
                delaySpeed={1000}
              />
            </span>
          </Card.Header>
          <Card.Title>
            Click the button below to track your first skill to learn
          </Card.Title>
          <Button
            style={{ background: "#ff4b2b", border: "none" }}
            className="mt-2"
            onClick={() => {
              setModal(true)
            }}
          >
            LearnIT
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default Welcome
