/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './DashboardAnalytics.module.css'
import { IoEyeSharp } from 'react-icons/io5'
import BounceLoader from 'react-spinners/BounceLoader'

const DashboardAnalytics = () => {
  const [allQuiz, setallQuiz] = useState(null)
  const [totalQuiz, settotalQuiz] = useState(null)
  const [totalQuestion, settotalQuestion] = useState(null)

  const fetchallQuiz = async () => {
    const quizData = await axios.get(
      'https://quizzies-backend-production.up.railway.app/quiz/quizzes'
    )
    setallQuiz(quizData.data.data)
    settotalQuiz(quizData.data.data.length)
  }

  useEffect(() => {
    try {
      fetchallQuiz()
    } catch (error) {
      console.log(error)
    }
  }, [allQuiz])

  useEffect(() => {
    if (allQuiz) {
      let total = 0
      for (let i = 0; i < allQuiz.length; i++) {
        total += allQuiz[i].quizQuestions.length
      }
      settotalQuestion(total)
    }
  }, [allQuiz])

  return (
    <div id={styles.container}>
      <div id={styles.quizContainer}>
        <div id={styles.totalQuiz}>
          <p>
            <span>{!totalQuiz ? 0 : totalQuiz}</span> Quiz Created
          </p>
        </div>
        <div id={styles.totalQuestions}>
          <p>
            <span>{!totalQuestion ? 0 : totalQuestion}</span> Questions created
          </p>
        </div>
        <div id={styles.totalImpressions}>
          <p>
            <span>0</span>
            Total Impressions
          </p>
        </div>
      </div>

      <div id={styles.trendingQuizContainer}>
        <div id={styles.header}>
          <h1>Trending Quizs</h1>
          {allQuiz === null ? (
            <BounceLoader color="#8f9493" />
          ) : (
            <div id={styles.allQuizContainer}>
              {allQuiz.length === 0 ? (
                <p>No trending quiz available</p>
              ) : (
                allQuiz.map((quiz) => {
                  return (
                    <div key={quiz._id} id={styles.quizInfo}>
                      <div>
                        <p>{quiz.title}</p>
                        <p>
                          {localStorage.getItem(
                            `${window.location.origin}/quiz?quizId=${quiz._id}`
                          )
                            ? localStorage.getItem(
                                `${window.location.origin}/quiz?quizId=${quiz._id}`
                              )
                            : 0}
                          <IoEyeSharp style={{ marginLeft: '0.3rem' }} />
                        </p>
                      </div>
                      <p>
                        Created on:
                        <span>
                          {new Date(quiz.createdAt).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  )
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default DashboardAnalytics
