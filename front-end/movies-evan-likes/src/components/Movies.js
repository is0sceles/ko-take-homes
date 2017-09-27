import React from 'react';

import Data from '../../api/data.json';

export default class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: Data.movies,
      reviews: Data.reviews,
      search: '',
    };
  }
  filterSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }
  render() {
    const filteredMovies = this.state.movies
          .filter(movie => movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
    return (
      <div>
        <div className="filter-list">
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                placeholder="Search by title"
                onChange={this.filterSearch.bind(this)}
                value={this.state.search}
              />
            </fieldset>
          </form>
        </div>
        <div className="movie-list">
          <ul>
            {filteredMovies.sort((a, b) => {
              const A = a.title;
              const B = b.title;
              return (A < B) ? -1 : (A > B) ? 1 : 0;
            }).map(movie =>
              <li key={movie.id}>
                {movie.score * 100}%
                <a href={movie.url}>{movie.title}</a> ({movie.year})
              </li>)}
          </ul>
        </div>
      </div>
    );
  }
}
