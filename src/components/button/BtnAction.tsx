import styles from "../../styles/Card.module.scss"
import { FaRegPlayCircle } from "react-icons/fa"
import { LuEdit } from "react-icons/lu"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify"
import DeletePostModal from "../modal/DeletePostModal"
import EditPostModal from "../modal/EditPostModal"

type Props = {
  url: string
  _id: string
}

const BtnAction = ({ url, _id }: Props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const onClose = (message: string, success: boolean) => {
    if (message.length !== 0) {
      if (success) {
        toast.success(message, { theme: "dark" })
      } else {
        toast.error(message, { theme: "dark" })
      }
    }
    setShowDeleteModal(false)
    setShowEditModal(false)
  }

  return (
    <div className={styles.action_button}>
      <button className={styles.post_button}>
        <Link to={url} target="_blank">
          <FaRegPlayCircle size={24} color="white" />
        </Link>
      </button>
      <button
        className={styles.post_button}
        onClick={() => setShowEditModal(true)}
      >
        <LuEdit size={24} color="white" />
      </button>
      <button
        className={styles.post_button}
        onClick={() => setShowDeleteModal(true)}
      >
        <RiDeleteBin6Line size={24} color="#ff4b2b" />
      </button>
      <DeletePostModal
        showDeleteModal={showDeleteModal}
        onClose={onClose}
        postId={_id}
      />
      <EditPostModal
        showEditModal={showEditModal}
        onclose={onClose}
        postId={_id}
      />
    </div>
  )
}

export default BtnAction
