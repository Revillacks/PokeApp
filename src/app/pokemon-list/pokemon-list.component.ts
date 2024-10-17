import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];

  constructor(
    private pokemonService: PokemonService
  ){}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((respone) => {
      this.pokemons = respone.results;
    });
  }

}
