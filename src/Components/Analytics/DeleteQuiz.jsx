/* eslint-disable react/prop-types */
import styles from './DeleteQuiz.module.css'
import axios from 'axios'

const DeleteQuiz = ({ quizId, setshowDelete }) => {
  const handleDelete = async () => {
    try {
      if (quizId) {
        const isDeleted = await axios.delete(
          `https://quizzies-backend-production.up.railway.app/quiz/delete-quiz?quizId=${quizId}`
        )
  
        setshowDelete(false)
        console.log(isDeleted)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleshowDeleteMod = () => {
    setshowDelete(false)
  }

  return (
    <>
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          <h1>Are you sure you want to delete ?</h1>
          <div id={styles.btns}>
            <button onClick={handleDelete}>Confirm Delete</button>
            <button onClick={handleshowDeleteMod}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default DeleteQuiz
