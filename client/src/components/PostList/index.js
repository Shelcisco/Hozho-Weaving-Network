// This component will be a list of all posts, similar to commentList from 24-Stu_Decode-JWT
import React from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ posts, title }) => {
    if (!posts.length) {
        return <h3>No Posts Yet</h3>;
    }

    return (
        <div>
            <h3>{title}</h3>
            {posts &&
                posts.map((post) => (
                    <div key={post._id} className="card mb-3">
                        <h4 className="card-header bg-primary text-light p-2 m-0">
                            {post.postAuthor} <br />
                            <span style={{ fontSize: '1rem' }}>
                                posted this on {post.createdAt}
                            </span>
                        </h4>
                        <div className="card-body bg-light p-2">
                            <p>{post.postText}</p>
                        </div>
                        <Link
                            className="btn btn-primary btn-block btn-squared"
                            to={`/posts/${post._id}`}
                        >
                            Join the discussion on this post.
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default PostList;
