import axios from 'axios'
import { useState } from 'react'
import styles from './Signup.module.css'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [inputError, setInputError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleUserName = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value })
    if (e.target.value) {
      setInputError({ ...inputError, name: '' })
    }
  }

  const handleUserEmail = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value })
    if (e.target.value) {
      setInputError({ ...inputError, email: '' })
    }
  }

  const handlePassword = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value })
    if (e.target.value) {
      setInputError({ ...inputError, password: '' })
    }
  }

  const handleConfirmPassword = (e) => {
    setUserInfo({ ...userInfo, confirmPassword: e.target.value })
    if (e.target.value) {
      setInputError({ ...inputError, confirmPassword: '' })
    }
  }

  const sendRegistrationData = async (e) => {
    e.preventDefault()

    let errors = {}
    if (!userInfo.name) errors.name = 'Invalid name'
    if (!userInfo.email) errors.email = 'Invalid email'
    if (!userInfo.password) errors.password = 'Invalid password'
    if (!userInfo.confirmPassword) errors.confirmPassword = 'Field empty'
    if (userInfo.password !== userInfo.confirmPassword) {
      errors.confirmPassword = 'Password does not match'
    }

    if (Object.keys(errors).length > 0) {
      setInputError(errors)
    } else {
      try {
        const userData = await axios.post(
          'https://quizzies-backend-production.up.railway.app/users/register',
          {
            name: userInfo.name,
            email: userInfo.email,
            password: userInfo.password,
            confirmPassword: userInfo.confirmPassword,
          }
        )

        toast.success(
          'Registeration was successful. Please login with the registered account!',
          {
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
          }
        )

        console.log(userData)
      } catch (error) {
        console.error(error)
      }
    }

    setUserInfo({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
  }

  return (
    <>
      <form onSubmit={sendRegistrationData} id={styles.formContainer}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder={inputError.name || 'Enter name'}
          onChange={handleUserName}
          value={userInfo.name}
          style={{
            border: inputError.name ? '1px solid' : 'none',
            borderColor: inputError.name ? 'red' : null,
          }}
          className={inputError.name ? styles.error : null}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder={inputError.email || 'Enter email'}
          onChange={handleUserEmail}
          value={userInfo.email}
          style={{
            border: inputError.email ? '1px solid' : 'none',
            borderColor: inputError.email ? 'red' : null,
          }}
          className={inputError.email ? styles.error : null}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder={inputError.password || 'Enter password'}
          onChange={handlePassword}
          value={userInfo.password}
          style={{
            border: inputError.password ? '1px solid' : 'none',
            borderColor: inputError.password ? 'red' : null,
          }}
          className={inputError.password ? styles.error : null}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder={inputError.confirmPassword || 'Confirm password'}
          onChange={handleConfirmPassword}
          value={userInfo.confirmPassword}
          style={{
            border: inputError.confirmPassword ? '1px solid' : 'none',
            borderColor: inputError.confirmPassword ? 'red' : null,
          }}
          className={inputError.confirmPassword ? styles.error : null}
        />

        <button type="submit">Sign-Up</button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        icon={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  )
}

export default Signup
