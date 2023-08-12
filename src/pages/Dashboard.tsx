import { useContext, useEffect } from "react"
import styles from "../styles/Dashboard.module.scss"
import ParticlesBg from "../components/background/ParticlesBg"
import NavBar from "../components/layout/NavBar"
import { PostContext } from "../contexts/PostContext"
import Loading from "../components/auth/Loading"
import { AuthContext } from "../contexts/AuthContext"
import AddPostModal from "../components/modal/AddPostModal"

import Welcome from "../components/layout/Welcome"
import ListPosts from "../components/layout/ListPosts"

export type postType = {
  _id: string
  title: string
  description: string
  url: string
  status: string
  user: {
    _id: string
    username: string
  }
}

const Dashboard = () => {
  const {
    authState: { user },
  } = useContext(AuthContext)

  const username = user && user.username

  const {
    postState: { posts, postLoading },
    getPosts,
    setShowAddModal,
  } = useContext(PostContext)

  useEffect(() => {
    getPosts()
  }, [])

  const setModal = (modal: boolean) => {
    setShowAddModal(modal)
  }

  return (
    <div className={styles.dashboard}>
      <ParticlesBg />
      <div className="dark_overlay">
        <NavBar />
        {postLoading ? (
          <Loading />
        ) : posts.length === 0 ? (
          <Welcome username={username} setModal={setModal} />
        ) : (
          <ListPosts posts={posts} setModal={setModal} />
        )}
        <AddPostModal />
      </div>
    </div>
  )
}

export default Dashboard
