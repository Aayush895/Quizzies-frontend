import { useContext, useState } from 'react'
import axios from 'axios'
import styles from './Login.module.css'
import AuthContext from '../../utils/AuthContext'
import { Navigate } from 'react-router-dom'
import { toast, ToastContainer, Bounce } from 'react-toastify'

const Login = () => {
  const { isLoggedin, setisLoggedin } = useContext(AuthContext)
  const [loginInfo, setloginInfo] = useState({
    email: '',
    password: '',
  })

  const [loginInputError, setloginInputError] = useState({
    email: '',
    password: '',
  })

  const handleUserEmail = (e) => {
    setloginInfo({ ...loginInfo, email: e.target.value })
    if (e.target.value) {
      setloginInputError({ ...loginInputError, email: '' })
    }
  }

  const handlePassword = (e) => {
    setloginInfo({ ...loginInfo, password: e.target.value })
    if (e.target.value) {
      setloginInputError({ ...loginInputError, password: '' })
    }
  }

  const sendLoginInfo = async (e) => {
    e.preventDefault()

    let errors = {}
    if (!loginInfo.email) errors.email = 'Invalid email'
    if (!loginInfo.password) errors.password = 'Invalid password'

    if (Object.keys(errors).length > 0) {
      setloginInputError(errors)
    } else {
      try {
        const loginData = await axios.post(
          'https://quizzies-backend-production.up.railway.app/users/login',
          {
            email: loginInfo.email,
            password: loginInfo.password,
          }
        )
        localStorage.setItem('authToken', loginData.data.data.token)
        if (loginData.data.success) setisLoggedin(true)
      } catch (error) {
        toast.error('Invalid login credentials!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
          icon: true,
        })
        console.log(error)
      }
    }

    setloginInfo({
      email: '',
      password: '',
    })
  }

  console.log(document.cookie)
  return (
    <>
      <form
        action=""
        method="post"
        onSubmit={sendLoginInfo}
        id={styles.formContainer}
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder={loginInputError.email || 'Enter email'}
          onChange={handleUserEmail}
          value={loginInfo.email}
          style={{
            border: loginInputError.email ? '1px solid' : 'none',
            borderColor: loginInputError.email ? 'red' : null,
          }}
          className={loginInputError.email ? styles.error : null}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder={loginInputError.password || 'Enter password'}
          onChange={handlePassword}
          value={loginInfo.password}
          style={{
            border: loginInputError.password ? '1px solid' : 'none',
            borderColor: loginInputError.password ? 'red' : null,
          }}
          className={loginInputError.password ? styles.error : null}
        />

        <button type="submit">Log In</button>
      </form>
      {isLoggedin ? <Navigate to="/dashboard" replace={true} /> : null}
      <ToastContainer />
    </>
  )
}
export default Login
