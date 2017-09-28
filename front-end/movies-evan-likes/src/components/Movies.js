import React from 'react';

import Data from '../../api/data.json';

export default class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: Data.movies,
      reviews: Data.reviews,
      search: '',
      yearsToDecades: {},
      filteredMovies: [],
      filteredYears: [],
    };
    // compute decades and populate dropdown
    this.state.movies.forEach((movie) => {
      const years = movie.year;
      const decades = Math.floor(years / 10) * 10;
      this.state.yearsToDecades[decades] = $.merge(this.state.yearsToDecades[decades] || [], [years]);
    });
    // populate dropDown when constructor is called
    this.createDecadeDropDown();
  }
  // select the years inside chosen decade
  onDropDownSelect(e) {
    this.setState({
      filteredYears: this.state.yearsToDecades[e.target.value],
    });
  }
  // dynamically create decade options for dropDown
  createDecadeDropDown() {
    const options = [<option key={1} value={'default'}>Year</option>];
    if (options.length === 1) {
      for (const decades in this.state.yearsToDecades) {
        options.push(<option key={Math.random(decades / 20)} value={decades}>{decades}</option>);
      }
    }
    return options;
  }
  // filter movie results based on search
  filterSearch(e) {
    this.setState({
      search: e.target.value,
    });
  }
  render() {
    // Filter for title and decade search
    this.state.filteredMovies = this.state.movies
          .filter((movie) => {
            let result = '';
            if (!this.state.filteredYears.length) {
              result = movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
            if (this.state.filteredYears.indexOf(movie.year) !== -1) {
              result = movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
            return result;
          });
    return (
      <div>
        <div className="filter-list">
          <form>
            <fieldset className="form-group">
              {/* title search input */}
              Title contains:
              <input
                type="text"
                placeholder="Search by title"
                onChange={this.filterSearch.bind(this)}
                value={this.state.search}
              />
            </fieldset>
          </form>
        </div>
        {/* drop down filter */}
        <div className="drop-down">
          Decade:
          <select
            id="select-decade"
            onChange={this.onDropDownSelect.bind(this)}
          >
            {this.createDecadeDropDown()}
          </select>
        </div>
        {/* movie list display */}
        <div className="movie-list">
          <ul>
            {this.state.filteredMovies.sort((a, b) => {
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
