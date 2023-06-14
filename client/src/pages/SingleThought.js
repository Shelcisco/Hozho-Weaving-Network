import { React, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { REMOVE_THOUGHT } from '../utils/mutations';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';
import EditThoughtForm from '../components/EditThoughtForm';
import { useNavigate } from "react-router-dom";

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const navigate = useNavigate()
  const currentUser = Auth.getProfile().data.username;
  const thought = data?.thought || {};

  const [thoughtDelete] = useMutation(REMOVE_THOUGHT, {
    update(cache) {
      cache.evict({ id: cache.identify(thought) })
      cache.gc()
    },
  })

  const handleThoughtDelete = async () => {
    try {
      await thoughtDelete({
        variables: { thoughtId }
      })
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  const [edit, setEdit] = useState({
    id: null,
    thoughtText: '',
    image: ''
  });

  if (edit.id) {
    return <EditThoughtForm edit={edit} />
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  const deleteButton =
    currentUser === thought.username ? (
      <button onClick={handleThoughtDelete}>Delete</button>
    ) : null;

  const editButton = 
    currentUser === thought.username ? (
      <button onClick={() => setEdit({ id: thought._id, thoughtText: thought.thoughtText, image: thought.image })}>✏️</button>
    ) : null;

  return (
    <div>
      <div className="card mb-3 m-4">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          Posted on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
          <img src={thought.image} alt="" width="300" />
        </div>
      </div>
      <div className='m-4' >
        {thought.reactionCount > 0 && (
          <ReactionList reactions={thought.reactions} />
        )}
        <div className='button-container'>
          {editButton}
          {deleteButton}
        </div>
        {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
      </div>
    </div>
  );
};

export default SingleThought;
