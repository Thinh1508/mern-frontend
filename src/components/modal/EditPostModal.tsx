import React, { useContext, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"

type Props = {
  showEditModal: boolean
  onclose: (message: string, success: boolean) => void
  postId: string
}

const EditPostModal = ({ showEditModal, onclose, postId }: Props) => {
  const {
    postState: { posts },
    updatePost,
  } = useContext(PostContext)

  const [editPost, setEditPost] = useState(
    posts.find((post: any) => post._id === postId)
  )

  const onInputChangeValue = (event: any) => {
    const { name, value } = event.target
    setEditPost({ ...editPost, [name]: value })
  }

  const onSubmitForm = async (event: any) => {
    event.preventDefault()
    const data = await updatePost(postId, editPost)
    onclose(data.message, data.success)
  }

  return (
    <Modal
      show={showEditModal}
      className="add_modal text-white"
      onHide={() => onclose("", false)}
    >
      <Modal.Header>
        <Modal.Title>Update to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Text id="title-help" className="text-white">
              Required
            </Form.Text>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              className="bg-secondary text-white"
              value={editPost.title}
              onChange={onInputChangeValue}
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              name="description"
              className="bg-secondary text-white"
              value={editPost.description}
              onChange={onInputChangeValue}
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="text"
              placeholder="Url to learn"
              name="url"
              className="bg-secondary text-white"
              value={editPost.url}
              onChange={onInputChangeValue}
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              as="select"
              value={editPost.status}
              name="status"
              onChange={onInputChangeValue}
              className="bg-secondary text-white"
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "#ff4b2b", border: "none" }}
            type="submit"
          >
            Update
          </Button>
          <Button variant="secondary" onClick={() => onclose("", false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditPostModal
