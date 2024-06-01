/* eslint-disable react/prop-types */
import { useContext } from 'react'
import styles from './Link.module.css'
import QuizContext from '../../utils/QuizContext'
import { IoIosClose } from 'react-icons/io'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Link = ({ link, setshowlinkForm }) => {
  const { setquizForm } = useContext(QuizContext)
  const copyLink = async (link) => {
    await navigator.clipboard.writeText(link)
    localStorage.setItem(link, '0')
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

  const closeForm = () => {
    setshowlinkForm(false)

    setquizForm({
      title: '',
      quizType: '',
      questions: [],
    })
  }

  return (
    <>
      <div id={styles.outerContainer}>
        <div id={styles.container}>
          <h1>Congrats your Quiz is published!</h1>
          <input type="text" name="quizLink" value={link} />
          <button type="submit" onClick={() => copyLink(link)}>
            Share
          </button>
          <IoIosClose id={styles.clostBtn} onClick={closeForm} />
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
export default Link
