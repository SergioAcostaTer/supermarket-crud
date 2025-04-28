import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { emptyPokemon, Pokemon } from '../../models/pokemon.models';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  imports: [FormsModule, CommonModule],
})
export class PokemonListComponent {
  selectedPokemon: Pokemon = emptyPokemon;
  pokemonService: PokemonService = inject(PokemonService);
  pokemons$: Observable<Pokemon[]> = this.pokemonService.getPokemons();

  saveProduct() {
    if (!this.selectedPokemon.name) return;

    if (this.selectedPokemon.id) {
      this.pokemonService
        .updatePokemon(this.selectedPokemon.id, this.selectedPokemon)
        .then(() => this.resetForm());
    } else {
      this.pokemonService.addPokemon(this.selectedPokemon).then(() => {
        this.resetForm();
      });
    }
  }

  deleteProduct(id: string) {
    this.pokemonService.deletePokemon(id);
  }

  editProduct(pokemon: Pokemon) {
    this.selectedPokemon = { ...pokemon };
  }

  resetForm() {
    this.selectedPokemon = emptyPokemon;
  }
}
