// npm modules
import { Link } from "react-router-dom"

// components
import Icon from "../Icon/Icon"
import AuthorInfo from "../AuthorInfo/AuthorInfo"

// css
import styles from './RequestCard.module.css'

const RequestCard = ({ request }) => {
  return (
    <Link to={`/requests/${request._id}`}>
      <article className={styles.container}>
        <header>
          <span>
            <h1>{request.title}</h1>
            <Icon category={request.category}/>
          </span>
          <AuthorInfo content={request}/>
        </header>
        <p>{request.text}</p>
      </article>
    </Link>
  )
}

export default RequestCard