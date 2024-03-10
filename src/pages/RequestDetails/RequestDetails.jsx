// npm modules
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// components
import Loading from "../Loading/Loading";
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo";
import Icon from "../../components/Icon/Icon";
import NewComment from "../../components/NewComment/NewComment";
import Comments from "../../components/Comments/Comments";

// services
import * as requestService from '../../services/requestService';

// css
import styles from './RequestDetails.module.css';

const RequestDetails = (props) => {
  const { requestId } = useParams();
  const [request, setRequest] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await requestService.show(requestId);
        if (data.error) {
          setError(data.error);
        } else {
          setRequest(data);
        }
      } catch (err) {
        // Handle errors such as network issues, or if the request fails for other reasons
        setError('Failed to load request details. Please try again later.');
      }
    };
    fetchRequest();
  }, [requestId]);

  const handleAddComment = async (commentFormData) => {
    const newComment = await requestService.createComment(requestId, commentFormData);
    if (newComment.error) {
      setError(newComment.error);
    } else {
      setRequest({...request, comments: [...request.comments, newComment]});
    }
  };

  if (error) {
    // Optionally, navigate back or display an error message
    // navigate("/");
    return <div>{error}</div>;
  }

  if (!request) return <Loading />;

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
                <button onClick={() => props.handleDeleteRequest(request._id)}>
                  <Icon category='Trash'/>
                </button>
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
  );
};

export default RequestDetails;
