import React from 'react';

import Data from '../../api/data.json';

export default class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: Data.movies,
      reviews: Data.reviews,
    };
  }
  render() {
    return (
      <div>
        <div className="filter-list">
          <form>
            <fieldset className="form-group">
              <input type="text" placeholder="Search" onChange={e => console.log(e.target.value)} />
            </fieldset>
          </form>
        </div>
        <ul>
          {this.state.movies.sort((a, b) => {
            const A = a.title;
            const B = b.title;
            return (A < B) ? -1 : (A > B) ? 1 : 0;
          }).map(movie => <li key={movie.id}>
            {movie.score * 100}%
          <a href={movie.url}>{movie.title}</a> {movie.year}
          </li>)}
        </ul>
      </div>
    );
  }
}
