import React from 'react';

import Movies from './components/Movies';

export default () =>
  <div className="page">
    <div className="app-description">
      <h1 className="app-description__title">Movies Evan Likes!</h1>
      <p className="app-description__content">
        Below is a (not) comprehensive list of movies that Evan really
        likes.
      </p>
    </div>
    <Movies />
  </div>;
