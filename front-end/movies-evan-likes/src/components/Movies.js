
import React from 'react';

import Reviews from './Reviews';
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
      showItems: [],
    };
    // bind context
    this.filterSearch = this.filterSearch.bind(this);
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
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
  // handling reviews (child) component by item clicked
  onExpand(index) {
    const showItems = this.state.showItems.slice(0);
    showItems[index] = !showItems[index];
    this.setState({ showItems });
  }
  // dynamically create decade options for dropDown
  createDecadeDropDown() {
    const options = [<option key={1} value={'default'}>All Years</option>];
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
                onChange={this.filterSearch}
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
            onChange={this.onDropDownSelect}
          >
            {this.createDecadeDropDown()}
          </select>
        </div>
        {/* movie list display */}
        <div className="card">
          <ul className="list-group list-group-flush">
            {this.state.filteredMovies.sort((a, b) => {
              const A = a.title;
              const B = b.title;
              return (A < B) ? -1 : (A > B) ? 1 : 0;
            }).map((movie, index) =>
              <li
                className="list-group-item"
                key={movie.id}
              >
                {movie.score * 100}%
                <a className="card-link" href={movie.url}>{movie.title}</a>
                <span className="expand" onClick={this.onExpand.bind(this, index)}>({movie.year})</span>
                {
                  this.state.showItems[index]
                    ? <Reviews reviews={this.state.reviews} movieId={movie.id} movies={this.state.movies} />
                    : null
                }
              </li>)}
          </ul>
        </div>
      </div>
    );
  }
}
