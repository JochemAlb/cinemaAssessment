import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MovieTileComponent } from '../../components/movie-tile/movie-tile.component';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movies';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-featured-page',
  standalone: true,
  imports: [CommonModule, MovieTileComponent],
  templateUrl: './featured-page.component.html',
  styleUrl: './featured-page.component.scss',
})
export class FeaturedPageComponent implements OnInit {
  movieService = inject(MovieService);
  environment = environment;

  featuredMovies$?: Observable<Movie[] | void>;

  private featuredIds: string[] = environment.featuredIds;

  ngOnInit(): void {
    this.featuredMovies$ = this.movieService.getFeaturedMovies(
      this.featuredIds
    );
  }
}
