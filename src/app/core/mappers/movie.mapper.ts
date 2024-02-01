import { Movie } from '../../shared/models/movies';

export function mapMovie(movie: any): Movie {
  return {
    actors: movie.Actors,
    awards: movie.Awards,
    director: movie.Director,
    genre: movie.Genre,
    id: movie.imdbID,
    plot: movie.Plot,
    poster: movie.Poster,
    rated: movie.Rated,
    released: movie.Released,
    title: movie.Title,
    type: movie.Type,
    writer: movie.Writer,
    year: movie.Year,
  } as Movie;
}
