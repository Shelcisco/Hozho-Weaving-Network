import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";
import ListingCard from "../components/ListingCard";
import CommunityEventsCard from "../components/CommunityEvents";

import "../Home.css"

// Use a function to generate HTML page = REACT
const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  console.log(data);
  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();

  // HTML is returned, or generated.
  return (
    // HTML for the homepage goes here.
    <main className="home-container"> {/*Apply display flex on this, justify-content: spaceevenly*/}

      {/* Local Listings section */}
      <section className="local-listings">
        <div>
          <h2>Local Listings</h2>
          <div>
            {/*Create a component for it! and map thru the array of listings*/}
            <ListingCard />
          </div>
        </div>
      </section >

      {/* Community Events section */}
      <section className="community-events">
        <h2>Community Events</h2>
        {/*<img src={data.image} alt />*/}
        {/* component import */}
        <CommunityEventsCard />
      </section>
      <aside className="side-nav">
        {/* side navigation goes here */}
      </aside>

      {/* <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Recent posts..."
            />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div> */}
    </main >
  );
};

export default Home;
