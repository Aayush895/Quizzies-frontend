/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import styles from './Quiz.module.css'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import BounceLoader from 'react-spinners/BounceLoader'

const Quiz = () => {
  const [quizData, setquizData] = useState([])
  const [counter, setCounter] = useState(0)
  const [searchParams] = useSearchParams()
  const [selectedOptionIndex, setselectedOptionIndex] = useState(null)
  const [score, setScore] = useState(0)
  const [quizType, setquizType] = useState(null)
  const [timer, setTimer] = useState(null)
  const hasMounted = useRef(false)

  const override = {
    display: 'block',
    margin: '5rem auto',
    borderColor: 'red',
  }

  const handleNextquestion = () => {
    if (counter < quizData.length) {
      setCounter(counter + 1)
      setselectedOptionIndex(null)
    }
  }

  const handleselectedOption = (optionNumber) => {
    if (selectedOptionIndex === null) {
      const isCorrect = optionNumber == quizData[counter].correctOption
      if (isCorrect) {
        setScore(score + 1)
      }
      setselectedOptionIndex(optionNumber - 1)
    } else {
      toast.error(
        'Cannot select another option if one of the options is already selected!',
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
    }
  }

  const fetchQuizData = async () => {
    try {
      const fetchedData = await axios.get(
        `https://quizzies-backend-production.up.railway.app/quiz/quiz-id?quizId=${searchParams.get(
          'quizId'
        )}`
      )
      setquizData(fetchedData?.data?.data?.quizQuestions)
      setquizType(fetchedData?.data?.data?.quizType)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQuizData()

    if (hasMounted.current) return

    hasMounted.current = true
    localStorage.setItem(
      window.location.href,
      Number(localStorage.getItem(window.location.href)) + 1
    )
  }, [])

  useEffect(() => {
    if (quizData.length > 0 && quizType === 'Q & A') {
      if (quizData[counter]?.timer == 'Off') {
        setTimer(null)
      } else {
        setTimer(quizData[counter]?.timer.replace('Sec', ''))
      }
    }
  }, [counter, quizData])

  useEffect(() => {
    let intervalId
    if (timer !== null && timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      handleNextquestion()
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [timer])

  return (
    <>
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          {quizData.length !== 0 ? (
            <>
              {counter !== quizData.length ? (
                <>
                  <div id={styles.quizContainer}>
                    <div id={styles.questionHeader}>
                      <p>
                        0{counter + 1}/0{quizData.length}
                      </p>
                      <p style={{ color: '#D60000' }}>
                        {quizType === 'Q & A'
                          ? timer === null
                            ? ''
                            : `${timer}s`
                          : ''}
                      </p>
                    </div>
                    <div id={styles.questionContainer}>
                      <p>{quizData[counter]?.question}</p>
                    </div>
                  </div>

                  <div id={styles.optionsContainer}>
                    {quizData[counter].options.map((option, idx) => (
                      <div
                        key={idx}
                        id={styles.options}
                        onClick={() => handleselectedOption(idx + 1)}
                        style={{
                          border:
                            selectedOptionIndex === idx
                              ? '1px solid #5076ff'
                              : 'none',
                        }}
                      >
                        {quizData[counter].optionsType === 'Text' ? (
                          <p>{option.text}</p>
                        ) : null}
                        {quizData[counter].optionsType === 'Image URL' ? (
                          <img
                            src={option.imageUrl}
                            width="100%"
                            height="120px"
                            style={{ borderRadius: '0.5rem' }}
                          />
                        ) : null}
                        {quizData[counter].optionsType ===
                        'Text & Image URL' ? (
                          <div id={styles.textImg}>
                            <p>{option.text}</p>
                            <img src={option.imageUrl} />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <button onClick={handleNextquestion}>Next</button>
                </>
              ) : (
                <>
                  {quizType == 'Q & A' ? (
                    <div id={styles.congratsPage}>
                      <h1>Congrats Quiz is completed</h1>
                      <img
                        src="https://media.istockphoto.com/id/1176397624/vector/vector-flat-golden-trophy.jpg?s=612x612&w=0&k=20&c=kjnN3SB3l1cAMMt5xUvnyJDfPzQKzZ_pZHt3jaFnmF0="
                        alt="trophy"
                        height="350px"
                        width="100%"
                      />
                      <p>
                        Your score is{' '}
                        <span>{`0${score}/0${quizData.length}`}</span>
                      </p>
                    </div>
                  ) : (
                    <h1 style={{ textAlign: 'center' }}>
                      Thank you for participating in the Poll
                    </h1>
                  )}
                </>
              )}
            </>
          ) : (
            <BounceLoader color="#8f9493" cssOverride={override} />
          )}
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

export default Quiz
