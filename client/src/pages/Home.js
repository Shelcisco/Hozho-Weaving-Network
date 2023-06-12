<<<<<<< HEAD
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';
import ListingCard from '../components/ListingCard';
import CommunityEventsCard from '../components/CommunityEvents';
=======
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
// import FriendList from "../components/FriendList";
// import ListingCard from "../components/ListingCard";
// import CommunityEventsCard from "../components/CommunityEvents";
>>>>>>> 4ae3a835f27a19f5ac43aff37a173086b366f015

import '../Home.css';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
<<<<<<< HEAD
  const {loading: profileLoading, data: userData } = useQuery(QUERY_ME_BASIC);
=======
  // eslint-disable-next-line
  const { data: userData } = useQuery(QUERY_ME_BASIC);
>>>>>>> 4ae3a835f27a19f5ac43aff37a173086b366f015
  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();
  // HTML is returned, or generated.
  return (
    // HTML for the homepage goes here.
    <main className="home-container">
<<<<<<< HEAD
      {' '}
      {/*Apply display flex on this, justify-content: spaceevenly*/}
      <div className="flex-row info">
        <div className="history flex-column">
          <h1>History</h1>
          <div className="scrollBox">
            <p>blah blah blah blah blah blah</p>
            <img src="./logo512.png" alt="Sheep Mascot"></img>
          </div>
        </div>
        <div className="resources flex-column">
          <h2>Resources & Listings </h2>
          <br></br>
          <div className="scrollBox">
            <div className="card">
              <h4 className="card-header">Title</h4>
              <p className="card-body">cool stuff</p>
            </div>
            <div className="card">
              <h4 className="card-header">Title</h4>
              <p className="card-body">cool stuff</p>
            </div>
            <div className="card">
              <h4 className="card-header">Title</h4>
              <p className="card-body">cool stuff</p>
            </div>
            <div className="card">
              <h4 className="card-header">Title</h4>
              <p className="card-body">cool stuff</p>
            </div>
            <div className="card">
              <h4 className="card-header">Title</h4>
              <p className="card-body">cool stuff</p>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="page-title">
        <h1>Community Posts</h1>
      </div>
      <br></br>
      <div>
        <h4>Share your thoughts</h4>
      </div>
      <div className="flex-row justify-center">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div
          className={`col-12 mb-3 justify-space-around ${
            loggedIn && 'col-lg-8 '
          }`}
        >
          {loading && profileLoading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Recent posts..."
            />
          )}
=======
      {/* Three-column layout */}
      <div className="flex-row">
        {/* Left column: History */}
        <div className="history flex-column">
          <h2>Welcome to the Hózhó Weaving Network</h2>
          <div>
            <p>Ut sed consectetur justo. Vivamus eget diam venenatis odio fringilla facilisis a tincidunt nisi. Vivamus hendrerit massa metus, eu vehicula odio bibendum hendrerit. </p>
            <p>Suspendisse potenti. Donec convallis finibus sem finibus luctus. Nulla facilisi. Nulla iaculis in nibh ac mollis. Morbi faucibus et risus a eleifend. Suspendisse fermentum non odio nec efficitur. Proin mollis nulla in tincidunt ultrices. Nullam et pulvinar tortor. Integer a porttitor quam, eu efficitur magna.</p>
          </div>
>>>>>>> 4ae3a835f27a19f5ac43aff37a173086b366f015
        </div>

        {/* Middle column: Community Posts */}
        <div className="posts flex-column">
          <div className="page-title">
            <h1>Community Posts</h1>
          </div>
<<<<<<< HEAD
        ) : null} */}
=======
          <div>
            <h4>Share your artwork and thoughts</h4>
          </div>
          <div className="flex-row justify-center">
            {/* Display ThoughtForm if logged in */}
            {loggedIn && (
              <div className="col-12 mb-3">
                <ThoughtForm />
              </div>
            )}
            {/* Display ThoughtList */}
            <div className={`col-12 mb-3 justify-space-around ${loggedIn && "col-lg-8"}`}>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <ThoughtList thoughts={thoughts} title="Recent posts..." />
              )}
            </div>
          </div>
        </div>

        {/* Right column: Resources & Listings */}
        <div className="resources flex-column">
          <h2>Resources & Listings</h2>
          <br></br>
          <div>
            <div className="card">
              <h4 className="card-header">Shearer Directory</h4>
              <p className="card-body">
                <a href="https://www.sheepusa.org/contacts-woolpelt-shearerdirectory" target="_blank" rel="noopener noreferrer">
                  American Sheep Industry Association</a>
              </p>
            </div>

            <div className="card">
              <h4 className="card-header">Fiber Spinning Directory</h4>
              <p className="card-body">
                <a href="https://spinoffmagazine.com/spinning-guilds-directory/" target="_blank" rel="noopener noreferrer">
                  Spinoff Magazine</a>
              </p>
            </div>
            <div className="card">
              <h4 className="card-header">Fiber Dyeing Directory</h4>
              <p className="card-body">
                <a href="https://www.sheepusa.org/contacts-woolpelt-shearerdirectory" target="_blank" rel="noopener noreferrer">
                  BIPOC in Fiber</a>
              </p>
            </div>

          </div>
        </div>
>>>>>>> 4ae3a835f27a19f5ac43aff37a173086b366f015
      </div>
    </main>
  );
};

export default Home;
