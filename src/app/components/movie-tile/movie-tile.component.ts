import { Component, inject, input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movies';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ListDirective } from '../../shared/directives/list.directive';
import { ReadMorePipe } from '../../shared/pipes/read-more.pipe';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-movie-tile',
  standalone: true,
  imports: [
    CommonModule,
    ListDirective,
    ReadMorePipe,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './movie-tile.component.html',
  styleUrl: './movie-tile.component.scss',
})
export class MovieTileComponent {
  private readonly movieService = inject(MovieService);

  fullPlot = input<boolean>(false);
  isFeatured = input<boolean>(false);
  movie = input.required<Movie>();

  get m() {
    return this.movie();
  }

  movieById$?: Observable<Movie | void>;
  readMoreDisabled = false;
}
