import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $image: String!) {
    addThought(thoughtText: $thoughtText, image: $image) {
      _id
      thoughtText
      image
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const EDIT_THOUGHT = gql`
mutation editThought($thoughtId: ID!, $thoughtText: String!, $image: String) {
  editThought(thoughtId: $thoughtId, thoughtText: $thoughtText, image: $image) {
    _id
    thoughtText
    image
  }
}
`

export const REMOVE_THOUGHT = gql`
mutation removeThought($thoughtId: ID!) {
  removeThought(thoughtId: $thoughtId) {
    _id
  }
}
`
export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const REMOVE_REACTION = gql`
  mutation removeReaction($thoughtId: ID!, $reactionId: ID!) {
  removeReaction(thoughtId: $thoughtId, reactionId: $reactionId) {
    _id
  }
}
`