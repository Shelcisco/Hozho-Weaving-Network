import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";
// import FriendList from "../components/FriendList";
// import ListingCard from "../components/ListingCard";
// import CommunityEventsCard from "../components/CommunityEvents";

import '../style.css';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // eslint-disable-next-line
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();

  // HTML is returned
  return (
    <div className="flex-container">
      {/* Left column: Welcome */}

      <div className="column" >
        <h2>Welcome to the Hózhó Weaving Network</h2>
        <p>Weaving together creativity, passion, and the beauty of fiber arts, our network is a vibrant community of artists who are passionate about the art of weaving. Whether you are an experienced weaver or just beginning your journey, we are here to celebrate and support your artistic endeavors.
        </p>
        <p>Within our network, you will find a rich tapestry of inspiration, knowledge-sharing, and collaboration. Connect with fellow artists who share your love for fiber weaving, exchange ideas, and explore the endless possibilities of this ancient craft.</p>
      </div>

      {/* Middle column: Community Posts */}
      <div className="column" >
        <h1>Community Posts</h1>
        <h2><small>Share your artwork and thoughts</small></h2>

        {/* Display ThoughtForm if logged in */}
        <div className="mb-3">
          {loggedIn && (
            <ThoughtForm />
          )}
        </div>

        {/* Display ThoughtList */}
        <div className={`${loggedIn && "column"}`} >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Recent posts..." />
          )}
        </div>
      </div>

      {/* Right column: Resources & Listings */}
      <div>
        <h2>Resources & Listings</h2>
        <div>
          <div className="card">
            <h3 className="card-header">Sheep Shearing</h3>
            <p className="card-body resources">
              <a href="https://www.sheepusa.org/contacts-woolpelt-shearerdirectory" target="_blank" rel="noopener noreferrer">
                American Sheep Industry Association</a>
            </p>
          </div>

          <div className="card">
            <h3 className="card-header">Fiber Spinning</h3>
            <p className="card-body resources">
              <a href="https://spinoffmagazine.com/spinning-guilds-directory/" target="_blank" rel="noopener noreferrer">
                Spinoff Magazine</a>
            </p>
          </div>
          <div className="card">
            <h3 className="card-header">Fiber Dyeing</h3>
            <p className="card-body resources">
              <a href="https://www.sheepusa.org/contacts-woolpelt-shearerdirectory" target="_blank" rel="noopener noreferrer">
                BIPOC in Fiber</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
