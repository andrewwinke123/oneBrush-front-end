import CommentCard from "../CommentCard/CommentCard"

const Comments = (props) => {
  if (!props.comments.length) return <h4>No Comments</h4>
  
  return (
    <>
      {props.comments.map(comment =>
        <CommentCard 
          comment={comment} 
          key={comment._id} 
          user={props.user}
        />  
      )}
    </>
  )
}

export default Comments