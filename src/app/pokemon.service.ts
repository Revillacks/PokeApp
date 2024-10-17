import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}?limit=20`).pipe(
      switchMap((response) => {
        // Hacemos que `forkJoin` sepa que estamos esperando un array de respuestas con detalles de los Pokémon.
        const pokemonDetailsRequests: Observable<any>[] = response.results.map((pokemon: any) => this.http.get<any>(pokemon.url));
        return forkJoin(pokemonDetailsRequests);  // Indicamos que `forkJoin` devuelve un array de cualquier tipo (any[])
      })
    );
  }

  getPokemonDetail(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
