export interface Pokemon {
  id?: string;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
}

export const emptyPokemon: Pokemon = {
  id: '',
  name: '',
  height: 0,
  weight: 0,
  base_experience: 0,
};
