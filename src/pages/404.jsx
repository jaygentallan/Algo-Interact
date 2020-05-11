import React from "react";

// React function that returns what is displayed to the
// user when it is called using the Router in the App.js file.
const NotFoundPage = () => {
  return (
    <div>
      <h1> 404 Not Found! </h1>
    </div>
  );
};

// Used to be able to import HomePage
// outside of this file.
export default NotFoundPage;
