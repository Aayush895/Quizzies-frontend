/* eslint-disable react/prop-types */
import { useContext, useState } from 'react'
import QuizContext from '../../utils/QuizContext'
import styles from './QuizForm.module.css'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const QuizForm = ({ setshowlinkForm, setLink }) => {
  const { setshowQuizForm, quizForm, setquizForm } = useContext(QuizContext)
  const [quesCounter, setquesCounter] = useState(1)
  const [optionCounter, setoptionCounter] = useState(2)
  const [questionObj, setquestionObj] = useState({
    question: '',
    optionsType: 'Text',
    options: [],
    correctOption: '',
    timer: '',
  })

  const [selectedOption, setselectedOption] = useState(null)
  const [selectedTimer, setselectedTimer] = useState('')

  const handleQuizCreation = async () => {
    setquizForm((prevForm) => ({
      ...prevForm,
      questions: [...prevForm.questions, questionObj],
    }))

    try {
      const res = await axios.post(
        'https://quizzies-backend-production.up.railway.app/quiz/create-quiz',
        {
          title: quizForm.title,
          quizType: quizForm.quizType,
          quizQuestions: [...quizForm.questions, questionObj],
        }
      )

      setLink(
        `${window.location.href}/quiz?quizId=${res.data.data._id}`
      )
      setshowlinkForm(true)
      setshowQuizForm(false)
    } catch (error) {
      console.log(error)
    }
  }

  const cancelQuizCreation = () => {
    setquizForm({
      title: '',
      quizType: 'Q & A',
      questions: [],
    })
    setshowQuizForm(false)
  }

  const handleQuestionCounter = () => {
    if (
      quizForm.quizType == 'Q & A' &&
      (!questionObj.question ||
        !questionObj.correctOption ||
        !questionObj.timer ||
        questionObj.options.length !== 2)
    ) {
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
    } else if (
      quizForm.quizType == 'Poll Type' &&
      (!questionObj.question || questionObj.options.length !== 2)
    ) {
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
    } else {
      setquesCounter((prevCounter) => prevCounter + 1)

      setquizForm((prevForm) => ({
        ...prevForm,
        questions: [...prevForm.questions, questionObj],
      }))

      setquestionObj({
        question: '',
        optionsType: 'Text',
        options: [],
        correctOption: '',
        timer: '',
      })
    }
  }

  const handleQuestion = (e) => {
    setquestionObj({ ...questionObj, question: e.target.value })
  }

  const handleOptiontype = (e) => {
    setquestionObj({ ...questionObj, optionsType: e.target.value, options: [] })
    setoptionCounter(2)
  }

  const handleCorrectOption = (e) => {
    setquestionObj({ ...questionObj, correctOption: e.target.value })
    setselectedOption(Number(e.target.value))
  }

  const handleOptions = (e, index, field) => {
    const value = e.target.value
    const newOptions = [...questionObj.options]

    if (questionObj.optionsType === 'Text') {
      newOptions[index] = { text: value }
    } else if (questionObj.optionsType === 'Image URL') {
      newOptions[index] = { imageUrl: value }
    } else {
      newOptions[index] = {
        ...newOptions[index],
        [field]: value,
      }
    }

    setquestionObj({ ...questionObj, options: newOptions })
  }

  const handleTimer = (e) => {
    setselectedTimer(e.target.textContent)
    setquestionObj({ ...questionObj, timer: e.target.textContent })
  }

  const handleAddOption = () => {
    setoptionCounter((prevCounter) => prevCounter + 1)
  }

  const removeOption = () => {
    setoptionCounter((prevCounter) => prevCounter - 1)
  }

  return (
    <>
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          <div id={styles.questionCounter}>
            <div>
              <p>1</p>
              {[...Array(quesCounter - 1)].map((_, idx) => (
                <p key={idx}>{idx + 2}</p>
              ))}
              {quesCounter !== 5 ? (
                <p onClick={handleQuestionCounter}>+</p>
              ) : null}
            </div>
            <p>Max 5 Questions</p>
          </div>

          <input
            type="text"
            name="question"
            placeholder="Question"
            value={questionObj.question}
            onChange={handleQuestion}
          />

          <div id={styles.optionType}>
            <label htmlFor="optionType">Option Type</label>
            <label>
              <input
                type="radio"
                name="text"
                value="Text"
                checked={questionObj.optionsType === 'Text'}
                onChange={handleOptiontype}
              />
              Text
            </label>
            <label>
              <input
                type="radio"
                name="imageUrl"
                value="Image URL"
                checked={questionObj.optionsType === 'Image URL'}
                onChange={handleOptiontype}
              />
              Image URL
            </label>
            <label>
              <input
                type="radio"
                name="text&imageUrl"
                value="Text & Image URL"
                checked={questionObj.optionsType === 'Text & Image URL'}
                onChange={handleOptiontype}
              />
              Text & Image URL
            </label>
          </div>

          <div id={styles.quizCreation}>
            {questionObj.optionsType === 'Text' && (
              <div id={styles.options}>
                <label>
                  {quizForm.quizType === 'Q & A' ? (
                    <input
                      type="radio"
                      name="option1"
                      value="1"
                      checked={questionObj.correctOption === '1'}
                      onChange={handleCorrectOption}
                    />
                  ) : null}

                  <input
                    type="text"
                    placeholder="Option 1"
                    onBlur={(e) => handleOptions(e, 0, 'text')}
                    style={{
                      backgroundColor:
                        selectedOption === 1 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 1 ? styles.success : null}
                  />
                </label>
                <label>
                  {quizForm.quizType === 'Q & A' ? (
                    <input
                      type="radio"
                      name="option2"
                      value="2"
                      checked={questionObj.correctOption === '2'}
                      onChange={handleCorrectOption}
                    />
                  ) : null}

                  <input
                    type="text"
                    placeholder="Option 2"
                    onBlur={(e) => handleOptions(e, 1, 'text')}
                    style={{
                      backgroundColor:
                        selectedOption === 2 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 2 ? styles.success : null}
                  />
                </label>

                {optionCounter <= 4 &&
                  [...Array(optionCounter - 2)].map((_, idx) => (
                    <label key={idx}>
                      {quizForm.quizType === 'Q & A' ? (
                        <input
                          type="radio"
                          name={`option${idx + 3}`}
                          value={idx + 3}
                          checked={questionObj.correctOption === `${idx + 3}`}
                          onChange={handleCorrectOption}
                        />
                      ) : null}

                      <input
                        type="text"
                        placeholder={`Option ${idx + 3}`}
                        onBlur={(e) => handleOptions(e, idx + 2, 'text')}
                        style={{
                          backgroundColor:
                            selectedOption === idx + 3 ? '#60B84B' : '#fff',
                        }}
                        className={
                          selectedOption === idx + 3 ? styles.success : null
                        }
                      />

                      <RiDeleteBin6Line
                        color="#d60000"
                        style={{ marginLeft: '1rem', fontWeight: 'bold' }}
                        size="1.5rem"
                        onClick={removeOption}
                        cursor="pointer"
                      />
                    </label>
                  ))}

                {optionCounter < 4 && (
                  <button
                    onClick={handleAddOption}
                    style={{
                      marginLeft:
                        quizForm.quizType === 'Q & A' ? null : '1.5rem',
                    }}
                  >
                    Add Option
                  </button>
                )}
              </div>
            )}
            {questionObj.optionsType === 'Image URL' && (
              <div id={styles.options}>
                <label>
                  {quizForm.quizType === 'Q & A' ? (
                    <input
                      type="radio"
                      name="option1"
                      value="1"
                      checked={questionObj.correctOption === '1'}
                      onChange={handleCorrectOption}
                    />
                  ) : null}

                  <input
                    type="text"
                    placeholder="Image URL 1"
                    onBlur={(e) => handleOptions(e, 0, 'imageUrl')}
                    style={{
                      backgroundColor:
                        selectedOption === 1 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 1 ? styles.success : null}
                  />
                </label>
                <label>
                  {quizForm.quizType === 'Q & A' ? (
                    <input
                      type="radio"
                      name="option2"
                      value="2"
                      checked={questionObj.correctOption === '2'}
                      onChange={handleCorrectOption}
                    />
                  ) : null}

                  <input
                    type="text"
                    placeholder="Image URL 2"
                    onBlur={(e) => handleOptions(e, 1, 'imageUrl')}
                    style={{
                      backgroundColor:
                        selectedOption === 2 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 2 ? styles.success : null}
                  />
                </label>

                {optionCounter <= 4 &&
                  [...Array(optionCounter - 2)].map((_, idx) => (
                    <label key={idx}>
                      {quizForm.quizType ? (
                        <input
                          type="radio"
                          name={`option${idx + 3}`}
                          value={idx + 3}
                          checked={questionObj.correctOption === `${idx + 3}`}
                          onChange={handleCorrectOption}
                        />
                      ) : null}

                      <input
                        type="text"
                        placeholder={`Image URL ${idx + 3}`}
                        onBlur={(e) => handleOptions(e, idx + 2, 'imageUrl')}
                        style={{
                          backgroundColor:
                            selectedOption === idx + 3 ? '#60B84B' : '#fff',
                        }}
                        className={
                          selectedOption === idx + 3 ? styles.success : null
                        }
                      />

                      <RiDeleteBin6Line
                        color="#d60000"
                        style={{ marginLeft: '1rem', fontWeight: 'bold' }}
                        size="1.5rem"
                        onClick={removeOption}
                        cursor="pointer"
                      />
                    </label>
                  ))}

                {optionCounter < 4 && (
                  <button
                    onClick={handleAddOption}
                    style={{
                      marginLeft:
                        quizForm.quizType === 'Q & A' ? null : '1.5rem',
                    }}
                  >
                    Add Option
                  </button>
                )}
              </div>
            )}
            {questionObj.optionsType === 'Text & Image URL' && (
              <div id={styles.options}>
                <label>
                  {quizForm.quizType === 'Q & A' ? (
                    <input
                      type="radio"
                      name="option1"
                      value="1"
                      checked={questionObj.correctOption === '1'}
                      onChange={handleCorrectOption}
                    />
                  ) : null}

                  <input
                    type="text"
                    placeholder="Option 1"
                    onBlur={(e) => handleOptions(e, 0, 'text')}
                    style={{
                      backgroundColor:
                        selectedOption === 1 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 1 ? styles.success : null}
                  />
                  <input
                    type="text"
                    placeholder="Image URL 1"
                    onBlur={(e) => handleOptions(e, 0, 'imageUrl')}
                    style={{
                      backgroundColor:
                        selectedOption === 1 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 1 ? styles.success : null}
                  />
                </label>
                <label>
                  {quizForm.quizType === 'Q & A' ? (
                    <input
                      type="radio"
                      name="option2"
                      value="2"
                      checked={questionObj.correctOption === '2'}
                      onChange={handleCorrectOption}
                      className={selectedOption === 2 ? styles.success : null}
                    />
                  ) : null}

                  <input
                    type="text"
                    placeholder="Option 2"
                    onBlur={(e) => handleOptions(e, 1, 'text')}
                    style={{
                      backgroundColor:
                        selectedOption === 2 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 2 ? styles.success : null}
                  />
                  <input
                    type="text"
                    placeholder="Image URL 2"
                    onBlur={(e) => handleOptions(e, 1, 'imageUrl')}
                    style={{
                      backgroundColor:
                        selectedOption === 2 ? '#60B84B' : '#fff',
                    }}
                    className={selectedOption === 2 ? styles.success : null}
                  />
                </label>

                {optionCounter <= 4 &&
                  [...Array(optionCounter - 2)].map((_, idx) => (
                    <label key={idx} style={{ position: 'relative' }}>
                      {quizForm.quizType === 'Q & A' ? (
                        <input
                          type="radio"
                          name={`option${idx + 3}`}
                          value={idx + 3}
                          checked={questionObj.correctOption === `${idx + 3}`}
                          onChange={handleCorrectOption}
                        />
                      ) : null}

                      <input
                        type="text"
                        placeholder={`Option ${idx + 3}`}
                        onBlur={(e) => handleOptions(e, idx + 2, 'text')}
                        style={{
                          backgroundColor:
                            selectedOption === idx + 3 ? '#60B84B' : '#fff',
                        }}
                        className={
                          selectedOption === idx + 3 ? styles.success : null
                        }
                      />
                      <input
                        type="text"
                        placeholder={`Image URL ${idx + 3}`}
                        onBlur={(e) => handleOptions(e, idx + 2, 'imageUrl')}
                        style={{
                          backgroundColor:
                            selectedOption === idx + 3 ? '#60B84B' : '#fff',
                        }}
                        className={
                          selectedOption === idx + 3 ? styles.success : null
                        }
                      />
                      <RiDeleteBin6Line
                        color="#d60000"
                        style={{
                          fontWeight: 'bold',
                          position: 'absolute',
                          right: '-2.5rem',
                        }}
                        size="1.5rem"
                        onClick={removeOption}
                        cursor="pointer"
                      />
                    </label>
                  ))}

                {optionCounter < 4 && (
                  <button
                    onClick={handleAddOption}
                    style={{
                      marginLeft:
                        quizForm.quizType === 'Q & A' ? null : '1.5rem',
                      width: quizForm.quizType === 'Q & A' ? '75%' : '92%',
                    }}
                  >
                    Add Option
                  </button>
                )}
              </div>
            )}

            {quizForm.quizType === 'Q & A' ? (
              <div id={styles.timer} onClick={handleTimer}>
                <p>Timer</p>
                <button
                  style={{
                    backgroundColor: selectedTimer === 'Off' ? 'red' : '#fff',
                    color: selectedTimer === 'Off' ? 'white' : '#9f9f9f',
                  }}
                >
                  Off
                </button>
                <button
                  style={{
                    backgroundColor: selectedTimer === '5 Sec' ? 'red' : '#fff',
                    color: selectedTimer === '5 Sec' ? 'white' : '#9f9f9f',
                  }}
                >
                  5 Sec
                </button>
                <button
                  style={{
                    backgroundColor:
                      selectedTimer === '10 Sec' ? 'red' : '#fff',
                    color: selectedTimer === '10 Sec' ? 'white' : '#9f9f9f',
                  }}
                >
                  10 Sec
                </button>
              </div>
            ) : null}
          </div>

          <div id={styles.quizCreationBtns}>
            <button onClick={cancelQuizCreation}>Cancel</button>
            <button onClick={handleQuizCreation}>Create Quiz</button>
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

export default QuizForm
