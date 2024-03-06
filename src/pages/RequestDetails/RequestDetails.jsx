// npm modules
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

// components
import Loading from "../Loading/Loading"
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo"
import Icon from "../../components/Icon/Icon"
import NewComment from "../../components/NewComment/NewComment"
import Comments from "../../components/Comments/Comments"

// services
import * as requestService from '../../services/requestService'

// css
import styles from './RequestDetails.module.css'

const RequestDetails = (props) => {
  const { requestId } = useParams()
  const [request, setRequest] = useState(null)

  useEffect(() => {
    const fetchRequest = async () => {
      const data = await requestService.show(requestId)
      setRequest(data)
    }
    fetchRequest()
  }, [requestId])

  const handleAddComment = async (commentFormData) => {
    const newComment = await requestService.createComment(requestId, commentFormData)
    setRequest({...request, comments: [...request.comments, newComment]})
  }

  if (!request) return <Loading />

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{request.category.toUpperCase()}</h3>
          <h1>{request.title}</h1>
          <span>
            <AuthorInfo content={request} />
            {request.author._id === props.user.profile &&
              <>
                <Link to={`/requests/${request._id}/edit`} state={request}>
                  <Icon category='Edit' />
                </Link>
                <button onClick={() => props.handleDeleteRequest(request._id)}><Icon category='Trash'/></button>
                
              </>
            }
          </span>
        </header>
        <p>{request.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
        <NewComment handleAddComment={handleAddComment}/>
        <Comments comments={request.comments} user={props.user} />
      </section>
    </main>
  )
}

export default RequestDetails