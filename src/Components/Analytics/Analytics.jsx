import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Analytics.module.css'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaShareNodes } from 'react-icons/fa6'
import { toast, ToastContainer, Bounce } from 'react-toastify'
import DeleteQuiz from './DeleteQuiz'
import BounceLoader from 'react-spinners/BounceLoader'

const Analytics = () => {
  const [quizData, setquizData] = useState(null)
  const [showDelete, setshowDelete] = useState(false)
  const [quizId, setquizId] = useState('')

  const override = {
    display: 'block',
    margin: '5rem auto',
    borderColor: 'red',
  }

  const fetchquizData = async () => {
    const quizData = await axios.get(
      `https://quizzies-backend-production.up.railway.app/quiz/quizzes`
    )
    setquizData(quizData.data.data)
  }

  const handleshowDeleteMod = (id) => {
    setshowDelete(true)
    setquizId(id)
  }

  useEffect(() => {
    try {
      fetchquizData()
    } catch (error) {
      console.log(error)
    }
  }, [quizData])

  const copyLink = async (quizId) => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/quiz?quizId=${quizId}`
    )
    toast.success('Link copied to clipboard', {
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
  }

  return (
    <>
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          <div id={styles.header}>
            <h1>Quiz Analysis</h1>
          </div>

          {quizData ? (
            <div id={styles.tableContainer}>
              <div id={styles.tableHeader}>
                <p>S.No</p>
                <p>Quiz Name</p>
                <p>Created on</p>
              </div>

              {quizData.map((quiz, idx) => (
                <div id={styles.tableBody} key={quiz._id}>
                  <p>{idx + 1}</p>
                  <p>{quiz.title}</p>
                  <p>
                    {new Date(quiz.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>

                  <div id={styles.icons}>
                    <FaRegEdit size="1.5rem" cursor="pointer" color="#854cff" />
                    <RiDeleteBin5Line
                      size="1.5rem"
                      onClick={() => handleshowDeleteMod(quiz?._id)}
                      cursor="pointer"
                      color="#d60000"
                    />
                    <FaShareNodes
                      size="1.5rem"
                      onClick={() => copyLink(quiz?._id)}
                      cursor="pointer"
                      color="#60b84b"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <BounceLoader color="#8f9493" cssOverride={override} />
          )}
        </div>
      </div>
      {showDelete ? (
        <DeleteQuiz quizId={quizId} setshowDelete={setshowDelete} />
      ) : null}
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
export default Analytics
