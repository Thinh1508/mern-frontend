import { useContext } from "react"
import { Button, Modal } from "react-bootstrap"
import { PostContext } from "../../contexts/PostContext"

type Props = {
  showDeleteModal: boolean
  onClose: (message: string, success: boolean) => void
  postId: string
}

const DeletePostModal = ({ showDeleteModal, onClose, postId }: Props) => {
  const { deletePost } = useContext(PostContext)

  const onDeleteCLick = async () => {
    const data = await deletePost(postId)
    onClose(data.message, data.success)
  }
  return (
    <Modal
      show={showDeleteModal}
      className="add_modal text-white"
      onHide={() => onClose("", false)}
      centered
    >
      <Modal.Header>
        <Modal.Title>Do you want delete learnIt?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="danger" onClick={onDeleteCLick}>
          Delete
        </Button>
        <Button variant="secondary" onClick={() => onClose("", false)}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeletePostModal
