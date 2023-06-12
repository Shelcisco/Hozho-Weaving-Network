import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';
import { REMOVE_THOUGHT } from '../utils/mutations';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from '../utils/auth';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const currentUser = Auth.getProfile().data.username;
  const thought = data?.thought || {};

  const [thoughtDelete] = useMutation(REMOVE_THOUGHT, {
    update(cache){
      cache.evict({ id: cache.identify(thought) })
      cache.gc()
    }
  })
  const handleThoughtDelete = async () => {
    try{
      await thoughtDelete({
        variables: {thoughtId}
      })
    } catch(e){
      console.error(e)
    }
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const deleteButton =
    currentUser === thought.username ? (
      <button onClick={handleThoughtDelete}>Delete</button>
    ) : null;
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          Posted on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
          <img src={thought.image} alt="" />
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {deleteButton}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
