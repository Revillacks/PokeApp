import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  searchTerm: string = '';
  filteredPokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService
  ){}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((response) => {
      this.pokemons = response;
      this.filteredPokemons = this.pokemons;  // Inicializar con la lista completa
      console.log(this.pokemons);
    });
  }

  filterPokemons(): void {
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }

}
