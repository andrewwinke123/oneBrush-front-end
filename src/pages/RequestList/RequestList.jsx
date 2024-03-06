// css 
import styles from './RequestList.module.css'

// components
import RequestCard from '../../components/RequestCard/RequestCard'

const RequestList = (props) => {
  return (
    <main className={styles.container}>
      {props.requests.map(request =>
        <RequestCard key={request._id} request={request} />
      )}
    </main>
  )
}

export default RequestList