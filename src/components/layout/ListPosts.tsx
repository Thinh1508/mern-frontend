import { Col, Row } from "react-bootstrap"
import { postType } from "../../pages/Dashboard"
import SinglePost from "./SinglePost"
import { IoIosAdd } from "react-icons/io"

const ListPosts = ({
  posts,
  setModal,
}: {
  posts: postType[]
  setModal: (modal: boolean) => void
}) => {
  return (
    <>
      <Row className="row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mx-auto mt-3">
        {posts.map((post: postType) => (
          <Col key={post._id} className="my-2">
            <SinglePost post={post} />
          </Col>
        ))}
      </Row>

      <button className="btn-floating" onClick={() => setModal(true)}>
        <IoIosAdd size={40} color="white" />
      </button>
    </>
  )
}

export default ListPosts
