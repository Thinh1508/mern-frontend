import { postType } from "../../pages/Dashboard"
import { Badge, Card, Col, Row } from "react-bootstrap"
import styles from "../../styles/Card.module.scss"
import BtnAction from "../button/BtnAction"

type Props = {
  post: postType
}

const SinglePost = ({
  post: { _id, status, title, description, url },
}: Props) => {
  return (
    <Card
      className={`${styles.card} shadow`}
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <h3 className={styles.card_title}>{title}</h3>
              <Badge
                pill
                bg={
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <BtnAction url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className={styles.card_description}>{description}</Card.Text>
      </Card.Body>
    </Card>
  )
}
export default SinglePost
