// Logged in user profile page. See your saved posts, your own posts, edit posts, delete posts.

import React from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { removePostId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_POST } from '../utils/mutations';

const SavedPosts = () => {
  // grab user data
  const { loading, data } = useQuery(GET_ME);
  const [removePost] = useMutation(REMOVE_POST);

  const userData = data?.me || {};

  // create function that accepts the post's mongo _id value as param and deletes the post from the database
  const handleDeletePost = async (postId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removePost({ variables: { postId }, });

      removePostId(postId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }


  return (
    <>
      <div fluid='true' className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved posts!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedPosts.length
            ? `Viewing ${userData.savedPosts.length} saved ${userData.savedPosts.length === 1 ? 'post' : 'posts'}:`
            : 'You have no saved posts!'}
        </h2>
        <Row>
          {userData.savedPosts.map((post) => {
            return (
              <Col key={post.postId} md="4">
                <Card border='dark'>
                  {post.image ? <Card.Img src={post.image} alt={`The cover for ${post.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <p className='small'>Artists: {post.artists}</p>
                    <Card.Text>{post.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeletePost(post.postId)}>
                      Delete this Post!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedPosts;