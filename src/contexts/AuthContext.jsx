import { createContext, useReducer, useEffect } from "react"
import axios from "axios"
import { LOCAL_STORAGE_TOKEN_NAME, apiUrl } from "./constants"
import { authReducer } from "../reducers/authReducer"
import setAuthToken from "../utils/setAuthToken"
import { toast } from "react-toastify"

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  })

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`)
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        })
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  // login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm)
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        )
        await loadUser()
        return response.data
      }
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message)
        return error.response.data
      } else {
        toast.error(error.message)
        return { success: false, message: error.message }
      }
    }
  }

  // register
  const registerUser = async (userForm) => {
    let toastId = toast.loading("Loading...")
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm)
      if (response.data.success) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        })
        return response.data
      }
    } catch (error) {
      if (error.response.data) {
        toast.update(toastId, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
        return error.response.data
      } else {
        toast.update(toastId, {
          render: error.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        })
        return { success: false, message: error.message }
      }
    }
  }

  // logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    })
  }

  // conrext data
  const authContextData = {
    loginUser,
    registerUser,
    logoutUser,
    authState,
  }

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
