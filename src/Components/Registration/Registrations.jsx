import { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import styles from './Registrations.module.css'
import { Navigate } from 'react-router-dom'

const Registrations = () => {
  const [showSignup, setshowSignup] = useState(true)

  const handleSignupForm = () => {
    setshowSignup(true)
  }

  const handleLoginForm = () => {
    setshowSignup(false)
  }

  return (
    <>
      {localStorage.getItem('authToken') ? (
        <Navigate to="/dashboard" replace={true} />
      ) : (
        <Navigate to="/" replace={true} />
      )}
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          <h1 id={styles.header}>QUIZZIE</h1>
          <div id={styles.registrationOptions}>
            <button
              onClick={handleSignupForm}
              style={{
                boxShadow: showSignup
                  ? '0px 0px 59px 1px rgba(169,188,255,1)'
                  : null,
              }}
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginForm}
              style={{
                boxShadow: !showSignup
                  ? '0px 0px 59px 1px rgba(169,188,255,1)'
                  : null,
              }}
            >
              Log In
            </button>
          </div>

          {showSignup ? <Signup /> : <Login />}
        </div>
      </div>
    </>
  )
}
export default Registrations
