import React, { Component } from 'react';

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    const movieId = this.props.movieId;

    this.state = {
      movieId,
      review: '',
    };
  }

  componentDidMount() {
    console.log('is this working?');
    for (const i of this.props.reviews) {
      if (i['movie-id'] === this.state.movieId) {
        this.setState({ review: i.review });
      }
    }
  }
  render() {
    return (
      <div className="movie_review">
        <p> {this.state.review} </p>
      </div>
    );
  }
}
