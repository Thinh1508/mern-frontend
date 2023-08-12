import {
  POST_LOADED_SUCCESS,
  POST_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
} from "../contexts/constants"

export const postReducer = (state: any, action: any) => {
  const { type, payload } = action

  switch (type) {
    case POST_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      }

    case POST_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      }

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== payload),
      }

    case UPDATE_POST:
      const newPosts = state.posts.map((post: any) =>
        post._id === payload.postId ? payload.post : post
      )
      return {
        ...state,
        posts: newPosts,
      }

    default:
      return state
  }
}
