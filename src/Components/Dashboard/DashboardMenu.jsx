/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import AuthContext from '../../utils/AuthContext'
import styles from './DashboardMenu.module.css'
import { Navigate } from 'react-router-dom'
import QuizContext from '../../utils/QuizContext'

const DashboardMenu = ({ setshowAnalytics }) => {
  const { isLoggedin, setisLoggedin } = useContext(AuthContext)
  const { setshowQuiz } = useContext(QuizContext)
  const [menuStyling, setmenuStyling] = useState({
    dashboard: true,
    analytics: false,
    createQuiz: false,
  })

  const logoutUser = () => {
    localStorage.removeItem('authToken')
    setisLoggedin(false)
  }

  const handleDashBoard = () => {
    setshowAnalytics(false)
    setmenuStyling({
      dashboard: true,
      analytics: false,
      createQuiz: false,
    })
  }

  const handleAnalytics = () => {
    setshowAnalytics(true)
    setmenuStyling({
      dashboard: false,
      analytics: true,
      createQuiz: false,
    })
  }

  const handleCreateQuiz = () => {
    setshowQuiz(true)
    setmenuStyling({
      dashboard: false,
      analytics: false,
      createQuiz: true,
    })
  }

  return (
    <>
      {!isLoggedin ? (
        <Navigate to="/" replace={true} />
      ) : (
        <Navigate to="/dashboard" replace={true} />
      )}
      <div id={styles.container}>
        <div id={styles.header}>
          <h1>QUIZZIE</h1>
        </div>
        <div id={styles.menuItems}>
          <div
            onClick={handleDashBoard}
            style={{
              boxShadow: menuStyling.dashboard
                ? '0px 0px 10px 0px rgba(0,0,0,0.25)'
                : 'none',
            }}
          >
            <h2>Dashboard</h2>
          </div>
          <div
            onClick={handleAnalytics}
            style={{
              boxShadow: menuStyling.analytics
                ? '0px 0px 10px 0px rgba(0,0,0,0.25)'
                : 'none',
            }}
          >
            <h2>Analytics</h2>
          </div>
          <div
            onClick={handleCreateQuiz}
            style={{
              boxShadow: menuStyling.createQuiz
                ? '0px 0px 10px 0px rgba(0,0,0,0.25)'
                : 'none',
            }}
          >
            <h2>Create Quiz</h2>
          </div>
        </div>
        <div id={styles.logout} onClick={logoutUser}>
          <button type="submit">LOGOUT</button>
        </div>
      </div>
    </>
  )
}
export default DashboardMenu
