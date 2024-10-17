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
    const limit = 200;  // Limitar a 200 por página
    const requests = [];

    for (let offset = 0; offset < 1000; offset += limit) {  // 1000 para 5 páginas, ajusta según necesidad
      requests.push(this.http.get<any>(`${this.apiUrl}?limit=${limit}&offset=${offset}`));
    }

    return forkJoin(requests).pipe(
      switchMap((responses: any[]) => {
        const allResults = responses.flatMap(response => response.results);
        const pokemonDetailsRequests: Observable<any>[] = allResults.map((pokemon: any) => this.http.get<any>(pokemon.url));
        return forkJoin(pokemonDetailsRequests);
      })
    );
  }

  getPokemonDetail(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }
}
