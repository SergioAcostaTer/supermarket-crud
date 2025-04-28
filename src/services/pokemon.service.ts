import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.models';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private firestore: Firestore = inject(Firestore);

  getPokemons(): Observable<Pokemon[]> {
    return collectionData(collection(this.firestore, 'pokemon'), {
      idField: 'id',
    }) as Observable<Pokemon[]>;
  }

  addPokemon(product: Pokemon) {
    return addDoc(collection(this.firestore, 'pokemon'), {
      ...product,
    });
  }

  deletePokemon(id: string) {
    return deleteDoc(doc(this.firestore, `pokemon/${id}`));
  }

  updatePokemon(id: string, product: Pokemon) {
    const productRef = doc(this.firestore, `pokemon/${id}`);
    return updateDoc(productRef, {
      ...product,
    });
  }
}
