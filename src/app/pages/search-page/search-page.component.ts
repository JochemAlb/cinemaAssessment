import { Component, OnInit, ViewChild, inject, input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, concatMap, from, toArray } from 'rxjs';
import { Movie } from '../../shared/models/movies';
import { MovieTileComponent } from '../../components/movie-tile/movie-tile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MovieService } from '../../core/services/movie.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MovieTileComponent,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements OnInit {
  @ViewChild('searchForm') searchform?: NgForm;

  movieTitle = input<string>();
  movieService = inject(MovieService);
  moviesByTitle$?: Observable<Movie[]>;

  form: FormGroup = new FormGroup({
    movieTitle: new FormControl('', [Validators.required]),
    fullPlot: new FormControl(false),
  });

  formSubmitted = false;

  get f() {
    return this.form.controls;
  }

  movies: any[] = [];
  title!: string;

  ngOnInit(): void {
    if (this.movieTitle()) {
      this.f['movieTitle'].setValue(this.movieTitle());
      this.onSubmit();
    }
  }

  onSubmit(e?: any) {
    e?.preventDefault();
    this.formSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    this.moviesByTitle$ = this.movieService.getMoviesByTitle(
      this.f['movieTitle'].value,
      this.f['fullPlot'].value
    );
  }
}
