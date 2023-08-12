import { Form, Modal, Button } from "react-bootstrap"
import { useContext, useState } from "react"
import { PostContext } from "../../contexts/PostContext"
import { toast } from "react-toastify"
type Props = {}

const AddPostModal = (props: Props) => {
  const { showAddModal, setShowAddModal, addPost } = useContext(PostContext)

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "TO LEARN",
  })

  const closeModal = () => {
    setNewPost({
      title: "",
      description: "",
      url: "",
      status: "TO LEARN",
    })
    setShowAddModal(false)
  }

  const onInputChangeValue = (event: any) => {
    const { name, value } = event.target
    setNewPost({ ...newPost, [name]: value })
  }

  const onSubmitForm = async (event: any) => {
    event.preventDefault()
    const { success, message } = (await addPost(newPost)) as any
    if (success) toast.success(message, { theme: "dark" })
    else toast.error(message, { theme: "dark" })
    closeModal()
  }

  return (
    <Modal
      show={showAddModal}
      className="add_modal text-white"
      onHide={closeModal}
    >
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
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
              value={newPost.title}
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
              value={newPost.description}
              onChange={onInputChangeValue}
            />
          </Form.Group>
          <Form.Group className="mt-4">
            <Form.Control
              type="text"
              placeholder="Url to learn"
              name="url"
              className="bg-secondary text-white"
              value={newPost.url}
              onChange={onInputChangeValue}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ background: "#ff4b2b", border: "none" }}
            type="submit"
          >
            LearnIT
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddPostModal
