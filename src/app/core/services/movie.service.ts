import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  concatMap,
  from,
  map,
  mergeMap,
  of,
  toArray,
} from 'rxjs';
import { Movie } from '../../shared/models/movies';
import { environment } from '../../../environments/environment';
import { mapMovie } from '../mappers/movie.mapper';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  http = inject(HttpClient);

  private readonly imdbApiUrl = environment.imdbApiUrl;
  private readonly noOfSearchItems = environment.noOfSearchItems;

  getMoviesByTitle(
    title: string,
    fullPlot: boolean = false
  ): Observable<Movie[]> {
    if (!title) {
      return of([]);
    }

    return this.http.get(`${this.imdbApiUrl}&s=${title}`).pipe(
      map((result) => {
        const ids: string[] = [];

        (result as any).Search?.forEach((movie: any) => ids.push(movie.imdbID));

        return ids.slice(0, this.noOfSearchItems);
      }),
      mergeMap((ids: string[]) => this.getDetails(ids, fullPlot)),
      catchError((err) => {
        console.error('ERROR', err);
        return of([]);
      })
    );
  }

  getFeaturedMovies(ids: string[]): Observable<Movie[] | void> {
    if (!ids) {
      return of();
    }

    return from(this.getDetails(ids));
  }

  private getMovieById(
    id: string,
    fullPlot: boolean = false
  ): Observable<Movie> {
    if (!id) {
      return of();
    }

    const plot = fullPlot ? 'full' : 'short';
    return this.http.get(`${this.imdbApiUrl}&i=${id}&plot=${plot}`).pipe(
      map((result) => mapMovie(result) as Movie),
      catchError((err) => {
        console.error('ERROR', err);
        return of();
      })
    );
  }

  private getDetails(
    ids: string[],
    fullPlot: boolean = false
  ): Observable<Movie[]> {
    return from(ids).pipe(
      mergeMap((id: string) => this.getMovieById(id, fullPlot)),
      toArray()
    );
  }
}
