import React, { Component } from 'react';

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    const movieId = this.props.movieId;
    this.state = {
      movieId,
      review: '',
      imageUrl: '',
    };
  }
  componentDidMount() {
    for (const i of this.props.reviews) {
      if (i['movie-id'] === this.state.movieId) {
        this.setState({ review: i.review });
      }
    }
    for (const i of this.props.movies) {
      if (i.id === this.state.movieId) {
        this.setState({ imageUrl: i['cover-url'] });
      }
    }
  }
  render() {
    return (
      <div className="movie_review">
        <img className="card-img-top" src={this.state.imageUrl} />
        <p> {this.state.review} </p>
      </div>
    );
  }
}
