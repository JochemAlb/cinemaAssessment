import { Routes } from '@angular/router';
import { FeaturedPageComponent } from './pages/featured-page/featured-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: 'featured', component: FeaturedPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent },
];
