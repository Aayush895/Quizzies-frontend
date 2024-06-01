import DashboardAnalytics from './DashboardAnalytics'
import DashboardMenu from './DashboardMenu'
import styles from './Dashboard.module.css'
import QuizHeader from '../QuizForm/QuizHeader'
import QuizForm from '../QuizForm/QuizForm'
import { useContext, useState } from 'react'
import QuizContext from '../../utils/QuizContext'
import Link from '../QuizForm/Link'
import Analytics from '../Analytics/Analytics'

const Dashboard = () => {
  const { showQuiz, showQuizForm } = useContext(QuizContext)
  const [showlinkForm, setshowlinkForm] = useState(false)
  const [link, setLink] = useState('')
  const [showAnalytics, setshowAnalytics] = useState(false)

  return (
    <>
      <div id={styles.container}>
        <DashboardMenu setshowAnalytics={setshowAnalytics} />
        {!showAnalytics ? <DashboardAnalytics /> : <Analytics />}
      </div>
      {showQuiz ? <QuizHeader /> : null}
      {showQuizForm ? (
        <QuizForm setshowlinkForm={setshowlinkForm} setLink={setLink} />
      ) : null}
      {showlinkForm ? (
        <Link link={link} setshowlinkForm={setshowlinkForm} />
      ) : null}
    </>
  )
}
export default Dashboard
