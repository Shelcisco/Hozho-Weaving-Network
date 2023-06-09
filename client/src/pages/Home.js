import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import ThoughtList from "../components/ThoughtList";
import Auth from "../utils/auth";
import FriendList from "../components/FriendList";
import ThoughtForm from "../components/ThoughtForm";
import ListingCard from "../components/ListingCard";

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];
  const loggedIn = Auth.loggedIn();

  return (
    // HTML for the homepage goes here.
    <main> {/*Apply display flex on this, justify-content: spaceevenly*/}
      <section className="local-listings">
        <div>
          <h2>Local listings...</h2>
          <div>
            {/*Listings go in here, create a component for it! and map thru the array of listings*/}
          </div>
        </div>
      </section>
      <section className="community-events">

      </section>
      <aside className="side-nav">

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
    </main>
  );
};

export default Home;
