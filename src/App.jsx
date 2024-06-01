import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Registrations from './Components/Registration/Registrations'
import AuthContext from './utils/AuthContext'
import QuizContext from './utils/QuizContext'
import Dashboard from './Components/Dashboard/Dashboard'
import Quiz from './Components/QuizForm/Quiz'

// TODO: Major / Urgent Improvements:
// 1. Have to add the remaining styling to the frontend side of the project.

const App = () => {
  const [isLoggedin, setisLoggedin] = useState(!!localStorage.getItem('authToken'))
  const [showQuiz, setshowQuiz] = useState(false)
  const [showQuizForm, setshowQuizForm] = useState(false)
  const [quizForm, setquizForm] = useState({
    title: '',
    quizType: 'Q & A',
    questions: [],
  })

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Registrations />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/quiz',
      element: <Quiz />
    }
  ])

  return (
    <>
      <AuthContext.Provider value={{ isLoggedin, setisLoggedin }}>
        <QuizContext.Provider
          value={{ showQuiz, setshowQuiz, showQuizForm, setshowQuizForm, quizForm, setquizForm}}
        >
          <RouterProvider router={router} />
        </QuizContext.Provider>
      </AuthContext.Provider>
    </>
  )
}

export default App
