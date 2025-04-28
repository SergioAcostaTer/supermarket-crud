import { Routes } from '@angular/router';
import { PokemonListComponent } from '../components/pokemon/pokemon-list.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon', component: PokemonListComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
