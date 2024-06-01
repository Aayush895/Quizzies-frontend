import { useContext, useState } from 'react'
import styles from './QuizHeader.module.css'
import QuizContext from '../../utils/QuizContext'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const QuizHeader = () => {
  const { showQuiz, setshowQuiz, setshowQuizForm, quizForm, setquizForm } =
    useContext(QuizContext)

  const [typeStyling, settypeStyling] = useState(true)

  const handleQ_AStyling = () => {
    settypeStyling(true)
  }

  const handlePollStyling = () => {
    settypeStyling(false)
  }

  const cancelQuizCreation = () => {
    setshowQuiz(false)
    setquizForm({ ...quizForm, title: '', quizType: 'Q & A' })
  }

  const handlequizForm = () => {
    if (!quizForm.title) {
      toast.error('Please fill all the required fields in the form', {
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
      return
    }

    if (showQuiz) {
      setshowQuiz(false)
    }

    setshowQuizForm(true)
    console.log(quizForm)
  }

  const handleQuizTitle = (e) => {
    setquizForm({ ...quizForm, title: e.target.value })
  }

  const handleQuizType = (e) => {
    if (e.target.textContent === 'Q & A') {
      setquizForm({ ...quizForm, quizType: 'Q & A' })
    } else if (e.target.textContent === 'Poll Type') {
      setquizForm({ ...quizForm, quizType: 'Poll Type' })
    }
  }

  return (
    <>
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          <input
            type="text"
            name="title"
            placeholder="Quiz name"
            value={quizForm.title}
            onChange={handleQuizTitle}
          />
          <div id={styles.typeContainer} onClick={handleQuizType}>
            <p>Quiz Type</p>
            <button
              onClick={handleQ_AStyling}
              style={{
                backgroundColor: typeStyling ? '#60B84B' : null,
                color: typeStyling ? '#fff' : null,
                boxShadow: typeStyling
                  ? 'none'
                  : '0px 0px 10px 0px rgba(0,0,0,0.25)',
              }}
            >
              Q & A
            </button>
            <button
              onClick={handlePollStyling}
              style={{
                backgroundColor: !typeStyling ? '#60B84B' : null,
                color: !typeStyling ? '#fff' : null,
                boxShadow: !typeStyling
                  ? 'none'
                  : '0px 0px 10px 0px rgba(0,0,0,0.25)',
              }}
            >
              Poll Type
            </button>
          </div>

          <div id={styles.buttons}>
            <button onClick={cancelQuizCreation}>Cancel</button>
            <button onClick={handlequizForm}>Continue</button>
          </div>
        </div>
      </div>
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
export default QuizHeader
