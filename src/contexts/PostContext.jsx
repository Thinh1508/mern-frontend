import { useReducer, createContext, useState } from "react"
import { postReducer } from "../reducers/postReducer"
import axios from "axios"
import {
  ADD_POST,
  DELETE_POST,
  POST_LOADED_FAIL,
  POST_LOADED_SUCCESS,
  UPDATE_POST,
  apiUrl,
} from "./constants"

export const PostContext = createContext()

const PostContextProvide = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  })

  const [showAddModal, setShowAddModal] = useState(false)

  // get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if (response.data.success) {
        dispatch({
          type: POST_LOADED_SUCCESS,
          payload: response.data.posts,
        })
      }
    } catch (error) {
      return dispatch({
        type: POST_LOADED_FAIL,
      })
    }
  }

  // add post
  const addPost = async (post) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, post)

      if (response.data.success) {
        dispatch({
          type: ADD_POST,
          payload: response.data.post,
        })
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" }
    }
  }

  // delete post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      if (response.data.success) {
        dispatch({
          type: DELETE_POST,
          payload: response.data.postId,
        })
      }
      return response.data
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" }
    }
  }

  // edit post
  const updatePost = async (postId, post) => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${postId}`, post)
      if (response.data.success) {
        dispatch({
          type: UPDATE_POST,
          payload: {
            postId: postId,
            post: response.data.post,
          },
        })
      }
      return response.data
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" }
    }
  }

  //data
  const postContextData = {
    postState,
    getPosts,
    showAddModal,
    setShowAddModal,
    addPost,
    deletePost,
    updatePost,
  }

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvide
